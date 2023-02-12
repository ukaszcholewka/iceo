import { ReactRouter, RootRoute, Route } from '@tanstack/react-router'

const rootRoute = new RootRoute()

const indexRoute = new Route({
    path: '/',
    getParentRoute: () => rootRoute,
    component: () => <div>Home</div>,
})

const usersRoute = new Route({
    path: '/users',
    getParentRoute: () => rootRoute,
    component: () => <div>Users</div>,
})

const currencyRoute = new Route({
    path: '/currency',
    getParentRoute: () => rootRoute,
    component: () => <div>Currency</div>,
})

const balanceRoute = new Route({
    path: '/balance',
    getParentRoute: () => rootRoute,
    component: () => <div>Balance</div>,
})

const routeConfig = rootRoute.addChildren([
    indexRoute,
    usersRoute,
    currencyRoute,
    balanceRoute,
])

export const router = new ReactRouter({ routeTree: routeConfig })
export type RouterPaths = typeof router.types.RoutesInfo.routeIds

declare module '@tanstack/react-router' {
    interface RegisterRouter {
        rotuer: typeof router
    }
}
