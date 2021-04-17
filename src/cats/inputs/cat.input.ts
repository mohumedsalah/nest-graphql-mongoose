import { Field, Int, InputType, ArgsType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
@ArgsType()
export class CatInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly name: string;
  @Field(() => Int)
  @IsNumber()
  readonly age: number;
  @Field()
  @IsString()
  @MinLength(3)
  readonly breed: string;
}
