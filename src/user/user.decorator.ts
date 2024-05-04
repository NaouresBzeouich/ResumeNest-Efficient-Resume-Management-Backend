import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {User} from "./entities/user.entity";

export const GetUser = createParamDecorator(
    async (data: unknown, context: ExecutionContext): Promise<User> => {
        const user = context.switchToHttp().getRequest().user;

        return user;
    },
);