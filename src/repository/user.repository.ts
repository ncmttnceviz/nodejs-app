import {postgres} from "@config/postgres.config";
import UserEntity from "@entity/user.entity";
import {RegisterDto} from "@dto/auth.dto";
import {VerificationCodeEntity} from "@entity/verification-code.entity";
import {UpdateResult} from "typeorm";

export const userRepository = postgres.getRepository(UserEntity).extend({
    async createUser(registerDto: RegisterDto): Promise<UserEntity> {
        const entity = new UserEntity()
        entity.firstname = registerDto.firstname;
        entity.lastname = registerDto.lastname;
        entity.email = registerDto.email;
        entity.password = registerDto.password;

        return await this.save(entity);
    },
    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.createQueryBuilder('u')
            .where('email=:email',{email: email})
            .cache(true)
            .getOne()
    },
    async getUserWithVerificationCode(userId: string): Promise<{email: string, code: string} | null | undefined> {
        return await this.createQueryBuilder('u')
            .where('u.id=:userId', {userId: userId})
            .leftJoin(VerificationCodeEntity, 'v','v.userId=:userId',{userId: userId})
            .select(['u.email as email','v.code as code'])
            .getRawOne()
    },
    async verifyUser(userId: string) : Promise<UpdateResult> {
        return this.createQueryBuilder('u')
            .update(UserEntity)
            .set({isVerified: true})
            .where('id=:id',{id: userId})
            .execute();
    }
})