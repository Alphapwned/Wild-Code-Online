import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UsersModels } from "./UsersModels";

@ObjectType()
@Entity()
export class ContactModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  title!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  content!: string;

  @Field(() => UsersModels)
  @ManyToOne(() => UsersModels, (user) => user.contacts, { nullable: true })
  user: UsersModels | null;
}
