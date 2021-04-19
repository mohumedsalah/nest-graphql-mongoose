import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenDTO {
  @Field()
  readonly access_token: string;
}
