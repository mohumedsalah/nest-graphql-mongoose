import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OwnerDto } from './owner.dto';

@ObjectType()
export class CatDto {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
  @Field(() => OwnerDto)
  readonly owner: OwnerDto;
}
