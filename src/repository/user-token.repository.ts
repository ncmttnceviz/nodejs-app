import {postgres} from "@config/postgres.config";
import {UserTokenEntity} from "@entity/user-token.entity";
import {DeleteResult} from "typeorm";

export const userTokenRepository = postgres.getRepository(UserTokenEntity).extend({
    async createToken(data: { userId: string, token: string, expireDate: Date, }): Promise<UserTokenEntity> {
        const entity = new UserTokenEntity()
        entity.userId = data.userId
        entity.token = data.token
        entity.expireDate = data.expireDate

        return this.save(entity)
    },
    async getExpireDateFromToken(token: string): Promise<UserTokenEntity | null> {
        return this.createQueryBuilder('t')
            .select('t.expireDate')
            .where('t.token =:token', {token: token})
            .cache(true)
            .getOne()
    },
    async deleteTokensByEmail(userId: string): Promise<DeleteResult> {
        return this.createQueryBuilder('t')
            .delete()
            .where('userId=:userId', {userId: userId})
            .execute();
    }
})