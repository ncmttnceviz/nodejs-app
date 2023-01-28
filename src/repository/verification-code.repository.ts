import {postgres} from "@config/postgres.config";
import {types, VerificationCodeEntity} from "@entity/verification-code.entity";
import UserEntity from "@entity/user.entity";

export const verificationCodeRepository = postgres.getRepository(VerificationCodeEntity).extend({
    async createCode(user: UserEntity, type: 'phone' | 'email', code: string): Promise<VerificationCodeEntity> {
        const entity = new VerificationCodeEntity()
        entity.userId = user.id
        entity.verificationType = type === 'phone' ? types.phone : types.email
        entity.code = code

        return await this.save(entity)
    }
})