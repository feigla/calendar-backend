import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Event} from "../events/events.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface CreateUserAttributes {
    username: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, CreateUserAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    username: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Event)
    events: Event[]
}