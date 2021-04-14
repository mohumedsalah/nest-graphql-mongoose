import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCatDto {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
}
