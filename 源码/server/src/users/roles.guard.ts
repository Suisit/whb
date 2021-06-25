import { User } from '@libs/db/models/user.model';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectModel(User) private readonly userModel: ModelType<User>,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // 从控制器注解中得到的角色组信息。
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return this.validate(request, roles);
  }
  async validate(request: any, roles: any): Promise<boolean> {
    let token: string = request.headers.authorization || '';
    token = token.replace(/bearer /i, '');
    const user = await this.jwtService.verifyAsync(token);
    if (!user) throw new UnauthorizedException();
    const role = await this.userModel.findById(user);
    if (roles.includes(role.role)) return true;
    else return false;
  }
}
