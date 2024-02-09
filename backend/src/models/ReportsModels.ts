import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn
} from "typeorm"
import { Field, ObjectType } from "type-graphql"
import { FilesModels } from "./FilesModels"
import { UsersModels } from "./UsersModels"

@ObjectType()
@Entity()
export class ReportsModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field(() => FilesModels)
  @ManyToOne(() => FilesModels, (file) => file.reports)
  file: FilesModels

  @Field(() => UsersModels)
  @ManyToOne(() => UsersModels, (user) => user.reports, {
    eager: true
  })
  user: UsersModels
}
