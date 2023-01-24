import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
class UserEntity{

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
}

export default UserEntity;