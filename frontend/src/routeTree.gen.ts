/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MapImport } from './routes/map'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AdministrationImport } from './routes/_administration'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const MapClearCuttingsLazyImport = createFileRoute('/map/clear-cuttings')()
const MapClearCuttingIdLazyImport = createFileRoute('/map/$clearCuttingId')()
const AdministrationUsersLazyImport = createFileRoute(
  '/_administration/users',
)()

// Create/Update Routes

const MapRoute = MapImport.update({
  id: '/map',
  path: '/map',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AdministrationRoute = AdministrationImport.update({
  id: '/_administration',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const MapClearCuttingsLazyRoute = MapClearCuttingsLazyImport.update({
  id: '/clear-cuttings',
  path: '/clear-cuttings',
  getParentRoute: () => MapRoute,
} as any).lazy(() =>
  import('./routes/map/clear-cuttings.lazy').then((d) => d.Route),
)

const MapClearCuttingIdLazyRoute = MapClearCuttingIdLazyImport.update({
  id: '/$clearCuttingId',
  path: '/$clearCuttingId',
  getParentRoute: () => MapRoute,
} as any).lazy(() =>
  import('./routes/map/$clearCuttingId.lazy').then((d) => d.Route),
)

const AdministrationUsersLazyRoute = AdministrationUsersLazyImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => AdministrationRoute,
} as any).lazy(() =>
  import('./routes/_administration/users.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_administration': {
      id: '/_administration'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdministrationImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/map': {
      id: '/map'
      path: '/map'
      fullPath: '/map'
      preLoaderRoute: typeof MapImport
      parentRoute: typeof rootRoute
    }
    '/_administration/users': {
      id: '/_administration/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AdministrationUsersLazyImport
      parentRoute: typeof AdministrationImport
    }
    '/map/$clearCuttingId': {
      id: '/map/$clearCuttingId'
      path: '/$clearCuttingId'
      fullPath: '/map/$clearCuttingId'
      preLoaderRoute: typeof MapClearCuttingIdLazyImport
      parentRoute: typeof MapImport
    }
    '/map/clear-cuttings': {
      id: '/map/clear-cuttings'
      path: '/clear-cuttings'
      fullPath: '/map/clear-cuttings'
      preLoaderRoute: typeof MapClearCuttingsLazyImport
      parentRoute: typeof MapImport
    }
  }
}

// Create and export the route tree

interface AdministrationRouteChildren {
  AdministrationUsersLazyRoute: typeof AdministrationUsersLazyRoute
}

const AdministrationRouteChildren: AdministrationRouteChildren = {
  AdministrationUsersLazyRoute: AdministrationUsersLazyRoute,
}

const AdministrationRouteWithChildren = AdministrationRoute._addFileChildren(
  AdministrationRouteChildren,
)

interface MapRouteChildren {
  MapClearCuttingIdLazyRoute: typeof MapClearCuttingIdLazyRoute
  MapClearCuttingsLazyRoute: typeof MapClearCuttingsLazyRoute
}

const MapRouteChildren: MapRouteChildren = {
  MapClearCuttingIdLazyRoute: MapClearCuttingIdLazyRoute,
  MapClearCuttingsLazyRoute: MapClearCuttingsLazyRoute,
}

const MapRouteWithChildren = MapRoute._addFileChildren(MapRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof AuthRoute
  '/login': typeof LoginRoute
  '/map': typeof MapRouteWithChildren
  '/users': typeof AdministrationUsersLazyRoute
  '/map/$clearCuttingId': typeof MapClearCuttingIdLazyRoute
  '/map/clear-cuttings': typeof MapClearCuttingsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof AuthRoute
  '/login': typeof LoginRoute
  '/map': typeof MapRouteWithChildren
  '/users': typeof AdministrationUsersLazyRoute
  '/map/$clearCuttingId': typeof MapClearCuttingIdLazyRoute
  '/map/clear-cuttings': typeof MapClearCuttingsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_administration': typeof AdministrationRouteWithChildren
  '/_auth': typeof AuthRoute
  '/login': typeof LoginRoute
  '/map': typeof MapRouteWithChildren
  '/_administration/users': typeof AdministrationUsersLazyRoute
  '/map/$clearCuttingId': typeof MapClearCuttingIdLazyRoute
  '/map/clear-cuttings': typeof MapClearCuttingsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/map'
    | '/users'
    | '/map/$clearCuttingId'
    | '/map/clear-cuttings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/map'
    | '/users'
    | '/map/$clearCuttingId'
    | '/map/clear-cuttings'
  id:
    | '__root__'
    | '/'
    | '/_administration'
    | '/_auth'
    | '/login'
    | '/map'
    | '/_administration/users'
    | '/map/$clearCuttingId'
    | '/map/clear-cuttings'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AdministrationRoute: typeof AdministrationRouteWithChildren
  AuthRoute: typeof AuthRoute
  LoginRoute: typeof LoginRoute
  MapRoute: typeof MapRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AdministrationRoute: AdministrationRouteWithChildren,
  AuthRoute: AuthRoute,
  LoginRoute: LoginRoute,
  MapRoute: MapRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_administration",
        "/_auth",
        "/login",
        "/map"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_administration": {
      "filePath": "_administration.tsx",
      "children": [
        "/_administration/users"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/map": {
      "filePath": "map.tsx",
      "children": [
        "/map/$clearCuttingId",
        "/map/clear-cuttings"
      ]
    },
    "/_administration/users": {
      "filePath": "_administration/users.lazy.tsx",
      "parent": "/_administration"
    },
    "/map/$clearCuttingId": {
      "filePath": "map/$clearCuttingId.lazy.tsx",
      "parent": "/map"
    },
    "/map/clear-cuttings": {
      "filePath": "map/clear-cuttings.lazy.tsx",
      "parent": "/map"
    }
  }
}
ROUTE_MANIFEST_END */
