import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttributes {
    value: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    value: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}