import * as Sentry from '@sentry/node';
import {appHelper} from "@helper/app.helper";
export const sentry = () =>{
   return Sentry.init({
        environment: process.env.APP_ENV,
        dsn: process.env.SENTRY_DSN,
        maxBreadcrumbs: 150,
        debug: true,
    });
}

export const sentryConnect = async () => {
    appHelper.checkEnvFields(['SENTRY_DSN','APP_ENV']);
    await sentry()
}