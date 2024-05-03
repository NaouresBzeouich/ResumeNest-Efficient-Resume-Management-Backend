import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Timestamp} from "../../common/database/timestamp.entity";

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


}
