import {  Injectable } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class AuthGuardGuard  extends AuthGuard('jwt')  {

}
