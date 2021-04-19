import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthenticationGuard } from 'src/auth/guard/authentication.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { CatsService } from '../../cats.service';
import { CatDto } from '../../Models/cats.dto';
import { AuthorizationGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/auth/decorator/addRoles.decorator';

@Resolver()
export class GetCatsQuery {
  constructor(private catsService: CatsService) {}

  @Query(() => [CatDto])
  @UseGuards(AuthorizationGuard)
  @UseGuards(AuthenticationGuard)
  @Roles('admin')
  async cats(@CurrentUser() user: any) {
    return this.catsService.findAll();
  }
}
