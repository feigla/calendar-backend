import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Event} from "./events.model";
import {CreateEventDto} from "./dto/create-event.dto";
import {PayloadTokenDto} from "../auth/dto/payload-token.dto";
import {UsersService} from "../users/users.service";
import {UpdateEventDto} from "./dto/update-event.dto";

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event) private eventsRepo: typeof Event,
                private usersService: UsersService) {}


    async createEvent(dto: CreateEventDto, payload: PayloadTokenDto) {
        const post = await this.eventsRepo.create(
            {...dto, userId: payload.id})
        return post
    }

    async updateEvent(dto: UpdateEventDto) {
        const id = dto.id
        const post = await this.eventsRepo.update(dto, {where: {id}})
        return post
    }

    async deleteEvent(id: number) {
        const post = await this.eventsRepo.destroy({where: {id}})
        return post
    }

    async getEvents() {
        const posts = await this.eventsRepo.findAll({include: {all: true}})
        return posts
    }

    async getUserEvents(payload: PayloadTokenDto) {
        const userId = payload.id
        const posts = await this.eventsRepo.findAll({where: {userId}})
        return posts
    }
}
