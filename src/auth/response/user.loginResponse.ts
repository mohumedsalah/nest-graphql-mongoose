import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserLoginResponse {
  @Field()
  readonly access_token: string;
}
