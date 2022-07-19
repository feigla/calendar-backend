import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { EventsModule } from './events/events.module';
import {Event} from "./events/events.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {Token} from "./auth/token/token.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Event, Role, UserRoles, Token],
      autoLoadModels: true
    }),
      UsersModule,
      AuthModule,
      EventsModule,
      RolesModule
  ],
})
export class AppModule {}
