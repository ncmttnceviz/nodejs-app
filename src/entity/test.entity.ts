import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    email: string
}

export default Test;