import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserInput } from './requests/user.loginRequest';
import { UserLoginResponse } from './response/user.loginResponse';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => UserLoginResponse)
  async login(@Args() user: UserInput) {
    return await this.authService.validateUser(user.username, user.password);
  }

  @Mutation(() => UserLoginResponse)
  async register(@Args() user: UserInput) {
    return await this.authService.registerUser(user.username, user.password);
  }
}
