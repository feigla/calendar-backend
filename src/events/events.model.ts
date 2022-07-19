import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import * as dayjs from "dayjs";

interface CreateEventAttributes {
    title: string
    color: string
    description: string
    userId: number
    date: string
}

@Table({tableName: 'events', createdAt: false, updatedAt: false})
export class Event extends Model<Event, CreateEventAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'green'})
    color: string;

    @Column({type: DataType.DATE, allowNull: false})
    date: string

    @Column({type: DataType.STRING})
    description: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    user: User
}