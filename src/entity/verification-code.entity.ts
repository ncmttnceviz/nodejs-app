import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum types {
    phone = 'phone',
    email = 'email'
}

@Entity('verification_codes')
export class VerificationCodeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column({type: "enum", enum: types})
    verificationType: types

    @Column()
    code: string
}