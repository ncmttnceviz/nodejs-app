import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('verification_codes')
export class VerificationCodeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'uuid', unique: true})
    userId: string

    @Column()
    code: string

    @Column({type: "timestamp"})
    expireDate: Date
}