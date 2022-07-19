import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import {RoleGuard} from "../auth/guards/role.guard";
import {Roles} from "../decorators/role.decorator";
import {UpdateEventDto} from "./dto/update-event.dto";

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @UseGuards(AuthGuard)
    @Get('/user')
    getUserEvents(@Req() req) {
        return this.eventsService.getUserEvents(req.user)
    }

    @UseGuards(AuthGuard)
    @Put()
    updateEvent(@Body() dto: UpdateEventDto) {
        return this.eventsService.updateEvent(dto)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteEvent(@Param('id') id:number) {
        return this.eventsService.deleteEvent(id)
    }

    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @Get()
    getEvents() {
        return this.eventsService.getEvents()
    }

    @UseGuards(AuthGuard)
    @Post()
    createEvent(@Body() dto: CreateEventDto, @Req() req) {
        return this.eventsService.createEvent(dto, req.user)
    }
}
