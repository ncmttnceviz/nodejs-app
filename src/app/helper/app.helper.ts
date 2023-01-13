export class AppHelper {
    checkEnvFields(fields: Array<string>){
        fields.map((field) => {
            if (!process.env.hasOwnProperty(field)) {
                throw Error(`Env key not defined : ${field}`)
            }
        })
    }
}

export const appHelper = new AppHelper();