import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript"
import {User} from "./user.model"

@Table({
  modelName: "notifications"
})
export class Notification extends Model<Notification> {
  @Column
  notificationType!: string

  @Column
  email!: string

  @Column
  status!: string

  @Column({type: "json"})
  content?

  @Column
  noOfRetry!: number

  @ForeignKey(() => User)
  userFk!: number

  @Column
  newNotification!: number

  @BelongsTo(() => User)
  users!: User  
}
