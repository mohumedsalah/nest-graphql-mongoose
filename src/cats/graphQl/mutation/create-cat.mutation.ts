import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from 'src/auth/guard/authentication.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CatsService } from '../../cats.service';
import { CatDto } from '../../Models/cats.dto';
import { CatInput } from '../../Models/cat.input';

@Resolver()
export class CreateCatMutation {
  constructor(private catsService: CatsService) {}

  @Mutation(() => CatDto)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticationGuard)
  async createCat(@CurrentUser() user: any, @Args() args: CatInput) {
    const doc = { ...args, owner: user._id };
    return this.catsService.create(doc);
  }
}
