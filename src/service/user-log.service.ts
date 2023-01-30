import {LoginLogDoc, loginLogDocument} from "@entity/doc/login-log.doc";

class UserLogService {
    async createLoginLog(data: LoginLogDoc) {
        return await new loginLogDocument({...data}).save();
    }

    async getLastFailLoginByUser(userId: string): Promise<string | null> {
        const doc = await loginLogDocument.findOne({userId: userId, status: false}, {
            loginDate: 1
        })

        if (doc) return doc.loginDate.toString();

        return null
    }
}

export const userLogService = new UserLogService();