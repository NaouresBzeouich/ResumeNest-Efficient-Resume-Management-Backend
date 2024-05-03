import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Timestamp} from "../../common/database/timestamp.entity";
import {Cv} from "../../cv/entities/cv.entity";

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
    @Column()
    role : string;

    @OneToMany(
        type => Cv,
        (cv) => cv.user
    )
    cvs: Cv[];
}
