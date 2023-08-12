import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map } from "rxjs";

interface anyClass{
    new (...args: any[]):{}
}

export class serializeInterceptor implements NestInterceptor{
    constructor(private dto:anyClass){}
    
    intercept(context: ExecutionContext, next: CallHandler<any>){
        return next.handle().pipe(
            map((res:any)=>{
                return plainToClass(this.dto,res,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}