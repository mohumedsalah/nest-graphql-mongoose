import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from 'src/auth/guard/authentication.guard';
import { Roles } from 'src/auth/decorator/addRoles.decorator';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/cats.dto';
import { CatInput } from './inputs/cat.input';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';

@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CreateCatDto])
  @UseGuards(AuthorizationGuard)
  @UseGuards(AuthenticationGuard)
  @Roles('admin')
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
