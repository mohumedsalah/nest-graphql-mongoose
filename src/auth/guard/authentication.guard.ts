import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // this fill req.user with payload
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
