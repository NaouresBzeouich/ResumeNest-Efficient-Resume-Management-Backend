import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Timestamp} from "../../common/database/timestamp.entity";

@Entity('cv')
export class Cv extends Timestamp{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    name : string;
    @Column()
    firstname : string;
    @Column()
    age : number;
    @Column()
    Cin : string;
    @Column()
    Job : string;


}
