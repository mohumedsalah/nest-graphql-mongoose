import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

import { CatsResolver } from './graphQl/resolver/cats.resolver';
import { Cat, CatSchema } from './schema/cats.schema';
import { CatsService } from './cats.service';
import { CreateCatMutation } from './graphQl/mutation/create-cat.mutation';
import { GetCatsQuery } from './graphQl/query/get-cats.query';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    UserModule,
  ],

  providers: [CatsResolver, CatsService, GetCatsQuery, CreateCatMutation],
})
export class CatsModule {}
