export class AppHelper {
    checkEnvFields(fields: Array<string>) {
        fields.map((field) => {
            if (!process.env.hasOwnProperty(field)) {
                throw Error(`Env key not defined : ${field}`)
            }
        })
    }

    reformatDate(date: Date): string {
        return date.toISOString().split('T')[0] + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes();
    }
}

export const appHelper = new AppHelper();