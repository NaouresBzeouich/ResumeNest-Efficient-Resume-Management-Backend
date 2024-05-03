import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Timestamp} from "../../common/database/timestamp.entity";
import {Cv} from "../../cv/entities/cv.entity";

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity('user')
export class User extends Timestamp{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    username : string;
    @Column()
    password : string;

    @Column()
    email : string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER,
    })
    role : string;

    @OneToMany(
        type => Cv,
        (cv) => cv.user
    )
    cvs: Cv[];
}
