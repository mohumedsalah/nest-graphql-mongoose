import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthenticationGuard } from 'src/auth/guard/authentication.guard';
import { Roles } from 'src/auth/decorator/addRoles.decorator';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cats.dto';
import { CatInput } from './inputs/cat.input';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { UserService } from 'src/user/user.service';
import { Cat, CatDocument } from './cats.schema';

@Resolver(() => CatDto)
export class CatsResolver {
  constructor(
    private catsService: CatsService,
    private userService: UserService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CatDto])
  @UseGuards(AuthorizationGuard)
  @UseGuards(AuthenticationGuard)
  @Roles('admin')
  async cats(@CurrentUser() user: any) {
    return this.catsService.findAll();
  }

  @ResolveField()
  async owner(@Parent() cat: { owner: string }) {
    const { owner } = cat;
    const ret = await this.userService.getOne(owner);
    return ret;
  }

  // @Mutation(() => CatDto)
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthenticationGuard)
  // async createCat(@CurrentUser() user: any, @Args() args: CatInput) {
  //   const doc = { ...args, owner: user._id };
  //   return this.catsService.create(doc);
  // }
}
