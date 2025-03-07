import { clearCuttingStatusSchema } from "@/features/clear-cutting/store/status";
import { type Tag } from "@/shared/store/referential/referential";
import { string, z } from "zod";
import { pointSchema } from "./types";
import { userSchema } from "@/features/user/store/user";

export const DISPLAY_PREVIEW_ZOOM_LEVEL = 10;

const clearCuttingPointsSchema = z.array(z.number());
export type ClearCuttingPoint = z.infer<typeof clearCuttingPointsSchema>;

export type AbusiveTags = { abusiveTags: Tag[]};

const ecologicalZoningSchema = z.object({
	id: z.string(),
	name: z.string(),
	link: z.string().url(),
	logo: z.string().url(),
});

const clearCuttingBaseResponseSchema = z.object({
	id: z.string(),
	geoCoordinates: z.array(pointSchema),
	name: z.string().optional(),
	center: pointSchema,
	reportDate: z.string(),
	creationDate: z.string(),
	cutYear: z.number(),
	ecologicalZones: z.array(z.string()),
	abusiveTags: z.array(z.string().uuid()),
	naturaZone: z.string().optional(),
	comment: z.string().optional(),
	cadastralParcel: z
		.object({
			id: string(),
			slope: z.number(),
			surfaceKm: z.number(),
		})
		.optional(),

	status: clearCuttingStatusSchema,
});

const clearCuttingBaseSchema = clearCuttingBaseResponseSchema.omit({abusiveTags: true});
type ClearCuttingBase = z.infer<typeof clearCuttingBaseSchema> & AbusiveTags

const clearCuttingPreviewResponseSchema = clearCuttingBaseResponseSchema.and(
	z.object({
		address: z.object({
			postalCode: z.string(),
			city: z.string(),
			country: z.string(),
		}),
		imagesCnt: z.number().optional(),
	}),
);

export type ClearCuttingPreviewResponse = z.infer<
	typeof clearCuttingPreviewResponseSchema
>;
export type ClearCuttingPreview = Omit<
	ClearCuttingPreviewResponse,
	"abusiveTags"
> &
	ClearCuttingBase;

const clearCuttingAddressSchema = z.object({
	streetName: z.string(),
	streetNumber: z.string(),
	postalCode: z.string(),
	city: z.string(),
	state: z.string().optional(),
	country: z.string(),
});
export type ClearCuttingAddress = z.infer<typeof clearCuttingAddressSchema>;
export const clearCuttingResponseSchema = z.object({
		...clearCuttingBaseResponseSchema.shape,
		id: z.string(),
		geoCoordinates: z.array(pointSchema),
		waterCourses: z.array(z.string()).optional(),
		address: clearCuttingAddressSchema,
		customTags: z.array(z.string()).optional(),
		imageUrls: z.array(z.string().url()),
	});

export type ClearCuttingResponse = z.infer<typeof clearCuttingResponseSchema>;
export const clearCuttingSchema = clearCuttingResponseSchema.omit({abusiveTags: true}).merge(clearCuttingBaseSchema)
export type ClearCutting = z.infer<typeof clearCuttingSchema> & AbusiveTags

const waterCourseSchema = z.object({
	id: z.string(),
	geoCoordinates: z.array(pointSchema),
});

export const clearCuttingsResponseSchema = z.object({
	clearCuttingsPoints: z.array(clearCuttingPointsSchema),
	clearCuttingPreviews: z.array(clearCuttingPreviewResponseSchema),
	waterCourses: z.array(waterCourseSchema),
	ecologicalZones: z.array(ecologicalZoningSchema),
});

export type ClearCuttingsResponse = z.infer<typeof clearCuttingsResponseSchema>;
export type ClearCuttings = Omit<
	ClearCuttingsResponse,
	"clearCuttingPreviews"
> & {
	clearCuttingPreviews: ClearCuttingPreview[];
};

const clearCuttingOnSiteFormSchema = z.object({
	imgSatelliteCC: z.string().url().optional(),
	assignedUser: userSchema.nullable().default(null),
	onSiteDate: z.date().optional(),
	wheater: z.string().optional(),
	// BCC : before clear-cutting
	standTypeAndSilviculturalSystemBCC: z.string().optional(),
	//ACC : after clear-cutting
	isPlantationPresentACC: z.boolean().default(false),
	newTreeSpicies: z.string().optional(),
	imgsPlantation: z.array(z.string().url()).default([]),
	isWorksiteSignPresent: z.boolean().default(false),
	imgWorksiteSign: z.string().url().optional(),
	waterCourseOrWetlandPresence: z.string().optional(),
	protectedSpeciesDestructionIndex: z.string().optional(),
	soilState: z.string().optional(),
	imgsClearCutting: z.array(z.string().url()).optional(),
	imgsTreeTrunks: z.array(z.string().url()).default([]),
	imgsSoilState: z.array(z.string().url()).default([]),
	imgsAccessRoad: z.array(z.string().url()).default([]),
})

const clearCuttingEcologicalZoningFormSchema = z.object({
	isNatura2000: z.boolean().default(false),
	natura2000Zone: ecologicalZoningSchema.optional(),
	isOtherEcoZone: z.boolean().default(false),
	ecoZoneType: z.string().optional(),
	isNearEcoZone: z.boolean().default(false),
	nearEcoZoneType: z.string().optional(),
	protectedSpeciesOnZone: z.string().optional(),
	protectedSpeciesHabitatOnZone: z.string().optional(),
	isDDT: z.boolean().default(false),
	byWho: z.string().optional(),
});

const clearCuttingActorsFormSchema = z.object({
	companyName: z.string().optional(),
	subcontractor: z.string().optional(),
	ownerName: z.string().optional()
});

const clearCuttingRegulationsFormSchema = z.object({
	isCCOrCompanyCertified: z.boolean().nullable().default(null),
	isMoreThan20ha: z.boolean().nullable().default(null),
	isSubjectToPSG: z.boolean().nullable().default(null),
});

const clearCuttingLegaStrategyFormSchema = z.object({
	isRelevantComplaintPEFC: z.boolean().default(false),
	isRelevantComplaintREDIII: z.boolean().default(false),
	isRelevantComplaintOFB: z.boolean().default(false),
	isRelevantAlertSRGS: z.boolean().default(false),
	isRelevantAlertPSG: z.boolean().default(false),
	isRelevantRequestPSG: z.boolean().default(false),
	isActionsUndertaken: z.string().optional()
});

export const clearCuttingFormSchema = clearCuttingResponseSchema
	.extend(clearCuttingOnSiteFormSchema.shape)
	.extend(clearCuttingEcologicalZoningFormSchema.shape)
	.extend(clearCuttingActorsFormSchema.shape)
	.extend(clearCuttingRegulationsFormSchema.shape)
	.extend(clearCuttingLegaStrategyFormSchema.shape)
	.extend({ 
		otherInfos: z.string().optional(),
		clearCuttingSize: z.number().optional(),
		clearCuttingSlope: z.number().optional(),
	})

export type ClearCuttingForm = z.infer<typeof clearCuttingFormSchema>