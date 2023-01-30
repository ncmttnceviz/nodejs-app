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

    generateString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

}

export const appHelper = new AppHelper();