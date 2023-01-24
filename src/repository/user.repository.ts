import {postgres} from "@config/postgres.config";
import UserEntity from "@entity/user.entity";
import {RegisterDto} from "@dto/auth.dto";

export const userRepository = postgres.getRepository(UserEntity).extend({
    async createUser(registerDto: RegisterDto): Promise<UserEntity> {
        const entity = new UserEntity()
        entity.firstname = registerDto.firstname;
        entity.lastname = registerDto.lastname;
        entity.email = registerDto.email;
        entity.password = registerDto.password;

        return await this.save(entity);
    },
    async findByEmail(email: string) : Promise<UserEntity | null> {
        return await this.findOneBy({email: email})
    }
})