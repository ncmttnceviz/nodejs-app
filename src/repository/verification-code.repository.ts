import {postgres} from "@config/postgres.config";
import {VerificationCodeEntity} from "@entity/verification-code.entity";
import UserEntity from "@entity/user.entity";

export const verificationCodeRepository = postgres.getRepository(VerificationCodeEntity).extend({
    async createCode(user: UserEntity, type: 'phone' | 'email', code: string, expireDate: Date): Promise<VerificationCodeEntity> {
        const entity = new VerificationCodeEntity()
        entity.userId = user.id
        entity.code = code
        entity.expireDate = expireDate

        return await this.save(entity)
    },

    async getCode(code:string) : Promise<VerificationCodeEntity|null> {
        return this.findOneBy({code: code})
    }
})