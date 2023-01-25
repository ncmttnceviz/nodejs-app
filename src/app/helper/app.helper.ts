export class AppHelper {
    checkEnvFields(fields: Array<string>) {
        fields.map((field) => {
            if (!process.env.hasOwnProperty(field)) {
                throw Error(`Env key not defined : ${field}`)
            }
        })
    }

    reformatDate(date: Date): string {
        return date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes()
    }
}

export const appHelper = new AppHelper();