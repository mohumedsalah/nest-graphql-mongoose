import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from 'src/auth/authentication.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/cats.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CreateCatDto])
  @UseGuards(AuthenticationGuard)
  async cats(@CurrentUser() user: any) {
    console.log('user ===========> :', user);
    return this.catsService.findAll();
  }

  @Mutation(() => CreateCatDto)
  @UsePipes(ValidationPipe)
  async createCat(@Args() args: CatInput) {
    return this.catsService.create(args);
  }
}
