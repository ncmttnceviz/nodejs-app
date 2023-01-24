import * as Sentry from '@sentry/node';
import {appHelper} from "@helper/app.helper";

export const sentry = async () => {
    return Sentry.init({
        environment: process.env.APP_ENV,
        release: '1.0.0',
        dsn: process.env.SENTRY_DSN,
        maxBreadcrumbs: 150,
        debug: true,
    })
}

export const sentryConnect = async () => {
    appHelper.checkEnvFields(['SENTRY_DSN', 'APP_ENV']);
    return await sentry().catch(() => {
        throw new Error('Sentry Connection Error')
    })
}