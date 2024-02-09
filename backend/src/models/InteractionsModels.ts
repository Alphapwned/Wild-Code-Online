import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { FilesModels } from "./FilesModels";
import { UsersModels } from "./UsersModels";
import { InteractionType } from "../enums/InteractionType";

@ObjectType()
@Entity()
export class InteractionsModels extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => InteractionType)
	@Column()
	type!: InteractionType;

	@Field(() => FilesModels)
	@ManyToOne(() => FilesModels, (file) => file.interactions)
	file: FilesModels;

	@Field(() => UsersModels)
	@ManyToOne(() => UsersModels, (user) => user.interactions, { eager: true })
	user: UsersModels;
}
