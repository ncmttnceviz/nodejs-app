import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import {UserTokenEntity} from "@entity/user-token.entity";
import {VerificationCodeEntity} from "@entity/verification-code.entity";

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

    @Column({type: "boolean", default: false})
    isVerified: boolean

    @Column({type: "timestamp"})
    createdAt: string

    @Column({type: "timestamp"})
    updatedAt: string

    @OneToMany(() => UserTokenEntity, (userToken) => userToken.user)
    @JoinColumn()
    tokens: UserTokenEntity[]

    @OneToOne(() => VerificationCodeEntity)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'userId',
    })
    verificationCode: VerificationCodeEntity
}

export default UserEntity;