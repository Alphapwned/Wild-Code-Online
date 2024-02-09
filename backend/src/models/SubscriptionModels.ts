import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToOne
} from "typeorm"
import { Field, ObjectType } from "type-graphql";
import { UsersModels } from "./UsersModels"

@ObjectType()
@Entity()
export class SubscriptionModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  status!: string

  @Field()
  @Column()
  type!: string

  @Field()
  @CreateDateColumn()
  subscribedAt!: Date

  @Field()
  @Column({ nullable: true })
  subscriptionEndedAt!: Date

  @Field()
  @Column({ nullable: true })
  duration: string

  @Field(() => UsersModels)
  @OneToOne(() => UsersModels, (user) => user.subscription)
  user: UsersModels
}
