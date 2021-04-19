import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../auth.service';
import { AccessTokenDTO } from '../../models/accessToken.dto';
import { LoginInput } from '../../models/loginInput';

@Resolver()
export class LoginMutation {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessTokenDTO)
  @UsePipes(ValidationPipe)
  async login(@Args() user: LoginInput) {
    return await this.authService.validateUser(user.username, user.password);
  }
}
