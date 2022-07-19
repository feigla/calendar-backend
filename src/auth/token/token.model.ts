import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../../users/users.model";

interface CreateTokenAttributes {
    refreshToken: string
    userId: number
}

@Table({tableName: 'token'})
export class Token extends Model<Token, CreateTokenAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING(400), allowNull: false})
    refreshToken: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}