import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
@ArgsType()
export class RegisterInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly username: string;
  @Field()
  @IsString()
  @MinLength(3)
  readonly password: string;
}
