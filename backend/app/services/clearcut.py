from fastapi import HTTPException
from geojson_pydantic import Point
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.models import ClearCut
from app.schemas.clearcut import (
    ClearCutCreateSchema,
    ClearCutPatch,
    ClearCutResponseSchema,
    clearcut_to_response_schema,
)
from logging import getLogger
from geoalchemy2.elements import WKTElement
from geoalchemy2.shape import to_shape
from geoalchemy2.functions import ST_Contains, ST_MakeEnvelope, ST_SetSRID, ST_AsGeoJSON

from app.schemas.clearcut_map import (
    ClearCutMapResponseSchema,
    clearcut_to_preview_schema,
)
from app.schemas.hateoas import PaginationMetadata, PaginationResponseSchema
from app.services.ecological_zoning import find_or_add_ecological_zonings
from app.services.registries import find_or_add_registries

logger = getLogger(__name__)
_sridDatabase = 4326


def create_clearcut(db: Session, clearcut: ClearCutCreateSchema) -> ClearCut:

    intersecting_clearcut = (
        db.query(ClearCut)
        .filter(
            ClearCut.boundary.ST_Intersects(
                WKTElement(clearcut.boundary.wkt, srid=4326)
            )
        )
        .first()
    )

    if intersecting_clearcut:
        raise ValueError(
            f"New clearcut boundary intersects with existing clearcut ID {intersecting_clearcut.id}"
        )

    db_item = ClearCut(
        cut_date=clearcut.cut_date,
        slope_percentage=clearcut.slope_percentage,
        area_hectare=clearcut.area_hectare,
        location=WKTElement(clearcut.location.wkt),
        boundary=WKTElement(clearcut.boundary.wkt),
        status="to_validate",
        ecological_zonings=find_or_add_ecological_zonings(
            db, clearcut.ecological_zonings
        ),
        registries=find_or_add_registries(db, clearcut.registries),
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_clearcut(id: int, db: Session, clearcut_in: ClearCutPatch):
    clearcut = db.get(ClearCut, id)
    if not clearcut:
        raise HTTPException(status_code=404, detail="ClearCut not found")
    update_data = clearcut_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(clearcut, key, value)
    db.commit()
    db.refresh(clearcut)
    clearcut.location = to_shape(clearcut.location, srid=_sridDatabase).wkt
    clearcut.boundary = to_shape(clearcut.boundary, srid=_sridDatabase).wkt
    return clearcut


def map_geo_clearcut(clearcut: ClearCut, boundary: str, location: str) -> ClearCut:
    clearcut.boundary = boundary
    clearcut.location = location
    return clearcut


def find_clearcuts(
    db: Session, url: str, page: int = 0, size: int = 10
) -> PaginationResponseSchema[ClearCutResponseSchema]:
    clearcuts = (
        db.query(
            ClearCut, ST_AsGeoJSON(ClearCut.boundary), ST_AsGeoJSON(ClearCut.location)
        )
        .offset(page * size)
        .limit(size)
        .all()
    )
    clearcuts_count = db.query(ClearCut.id).count()
    clearcuts = map(
        lambda row: clearcut_to_response_schema(
            map_geo_clearcut(clearcut=row[0], boundary=row[1], location=row[2])
        ),
        clearcuts,
    )
    return PaginationResponseSchema(
        content=list(clearcuts),
        metadata=PaginationMetadata(
            page=page, size=size, total_count=clearcuts_count, url=url
        ),
    )


def get_clearcut_by_id(id: int, db: Session) -> ClearCutResponseSchema:
    [clearcut, boundary, location] = (
        db.query(
            ClearCut, ST_AsGeoJSON(ClearCut.boundary), ST_AsGeoJSON(ClearCut.location)
        )
        .filter(ClearCut.id == id)
        .first()
    )
    return clearcut_to_response_schema(map_geo_clearcut(clearcut, boundary, location))


class GeoBounds(BaseModel):
    south_west_latitude: float
    south_west_longitude: float
    north_east_latitude: float
    north_east_longitude: float


def build_clearcuts_map(
    db: Session, geo_bounds: GeoBounds
) -> ClearCutMapResponseSchema:
    envelope = ST_MakeEnvelope(
        geo_bounds.south_west_longitude,
        geo_bounds.south_west_latitude,
        geo_bounds.north_east_longitude,
        geo_bounds.north_east_latitude,
        _sridDatabase,
    )
    square = ST_SetSRID(envelope, _sridDatabase)
    points = (
        db.query(ST_AsGeoJSON(ClearCut.location))
        .filter(ST_Contains(square, ClearCut.location))
        .all()
    )

    # Get preview for the x most relevant clearcut
    clearcuts = (
        db.query(
            ClearCut, ST_AsGeoJSON(ClearCut.location), ST_AsGeoJSON(ClearCut.boundary)
        )
        .filter(ST_Contains(square, ClearCut.location))
        .order_by(ClearCut.created_at)
        .all()
    )
    for [clearcut, location, boundary] in clearcuts:
        clearcut.location = location
        clearcut.boundary = boundary

    previews = [clearcut_to_preview_schema(row[0]) for row in clearcuts]

    map_response = ClearCutMapResponseSchema(
        points=[Point.model_validate_json(point[0]) for point in points],
        previews=previews,
    )
    return map_response
