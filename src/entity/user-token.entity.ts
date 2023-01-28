import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import UserEntity from "@entity/user.entity";

@Entity('user_tokens')
export class UserTokenEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column()
    token: string

    @Column({type: "timestamp"})
    expireDate: Date

    @ManyToOne(() => UserEntity, (user) => user.tokens)
    user: UserEntity
}