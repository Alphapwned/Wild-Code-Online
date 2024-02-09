import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Field, ObjectType, registerEnumType } from "type-graphql"
import { FilesModels } from "./FilesModels"
import { UsersModels } from "./UsersModels"
import { IssuesType } from "../enums/IssuesType"

@ObjectType()
@Entity()
export class IssuesModels extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: true })
	issue?: string;

	@Field()
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => IssuesType)
	@Column()
	status!: IssuesType;

	@Field(() => FilesModels)
	@ManyToOne(() => FilesModels, (file) => file.issues, {
		eager: true,
	})
	file: FilesModels;

	@Field(() => UsersModels)
	@ManyToOne(() => UsersModels, (user) => user.issues, {
		eager: true,
	})
	user: UsersModels;
}
