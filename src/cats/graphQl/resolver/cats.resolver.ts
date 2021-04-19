import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CatDto } from '../../Models/cats.dto';
import { UserService } from 'src/user/user.service';
@Resolver(() => CatDto)
export class CatsResolver {
  constructor(private userService: UserService) {}

  @ResolveField()
  async owner(@Parent() cat: { owner: string }) {
    const { owner } = cat;
    const ret = await this.userService.getOne(owner);
    return ret;
  }
}
