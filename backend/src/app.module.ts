import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersModule } from './users/users.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_DB_CONNECTION_TYPE'),
        host: config.get<string>('TYPEORM_DB_HOST'),
        username: config.get<string>('TYPEORM_DB_USERNAME'),
        password: config.get<string>('TYPEORM_DB_PASSWORD'),
        database: config.get<string>('TYPEORM_DB_DATABASE'),
        port: config.get<number>('TYPEORM_DB_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
