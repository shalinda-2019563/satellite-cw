import syncRoutes from './app/sync/sync.routes'


export default app => {
    // app.use('/elastic', searchRoutes)
    app.use('/sync', syncRoutes)
}
