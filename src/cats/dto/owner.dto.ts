import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OwnerDto {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly username: string;
}
