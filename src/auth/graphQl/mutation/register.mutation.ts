import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { RegisterInput } from '../../models/registerInput';
import { AccessTokenDTO } from '../../models/accessToken.dto';

@Resolver()
export class LoginMutation {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessTokenDTO)
  @UsePipes(ValidationPipe)
  async register(@Args() user: RegisterInput) {
    return await this.authService.registerUser(user.username, user.password);
  }
}
