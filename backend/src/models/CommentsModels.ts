import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm"
import { Field, ObjectType } from "type-graphql"
import { FilesModels } from "./FilesModels"
import { UsersModels } from "./UsersModels"

@ObjectType()
@Entity()
export class CommentsModels extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	comment!: string;

	@Field()
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => FilesModels)
	@ManyToOne(() => FilesModels, (file) => file.comments, {
		eager: true,
	})
	file: FilesModels;

	@Field(() => UsersModels)
	@ManyToOne(() => UsersModels, (user) => user.comments, {
		eager: true,
	})
	user: UsersModels;
}
