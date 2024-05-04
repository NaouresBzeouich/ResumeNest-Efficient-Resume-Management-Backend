import {IsNotEmpty} from "class-validator";

export class  LoginCreadentialsDto {

    @IsNotEmpty()
    emailOrUsername : string ;

    @IsNotEmpty()
    password : string ;
}