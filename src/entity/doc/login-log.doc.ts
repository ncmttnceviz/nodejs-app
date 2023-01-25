import {model, Schema} from "mongoose";

export class LoginLogDoc {
    userId: string
    ip: string
    loginDate: Date
    status: boolean
}

const schema = new Schema<LoginLogDoc>({
    userId: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    loginDate: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

export const loginLogDocument = model<LoginLogDoc>('LoginLog', schema)
