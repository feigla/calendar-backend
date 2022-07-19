import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Event} from "./events.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [EventsService],
    controllers: [EventsController],
    imports: [
        SequelizeModule.forFeature([User, Event]),
        UsersModule,
        AuthModule
    ]
})
export class EventsModule {}
