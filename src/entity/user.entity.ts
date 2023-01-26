import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {UserTokenEntity} from "@entity/user-token.entity";

@Entity({name: 'users'})
class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({type: "timestamp"})
    createdAt: string

    @Column({type: "timestamp"})
    updatedAt: string

    @OneToMany(() => UserTokenEntity, (userToken) => userToken.user)
    @JoinColumn()
    tokens: UserTokenEntity[]
}

export default UserEntity;