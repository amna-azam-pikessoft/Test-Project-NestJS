// current-user decorator needs userID from jwtToken and user service Instance from user Service.
// userservice is a part of dependency injection but decorators exist outside of dependency injection.
// so decorator cannot get instance of user service. for this we need this Interceptor.

// interceptors are part of dependency injection. make an intercptor to get current user and use that value in  decorator.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService:UserService, private jwtService:JwtService){}
    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if(token){
            const payload = await this.jwtService.verifyAsync(token)
            const userID = payload.sub;
            const user = await this.userService.retrieveByID(userID)
            request.currentUser = user;
        }
        return next.handle();
    }
}