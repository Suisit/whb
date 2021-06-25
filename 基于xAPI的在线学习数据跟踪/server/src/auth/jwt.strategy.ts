import { User } from '@libs/db/models/user.model';
import { PassportStrategy } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 's123hasjhe123hkaosehdo12hjiejaskd4',
    } as StrategyOptions);
  }
  async validate(id) {
    return await this.userModel.findById(id);
  }
}
