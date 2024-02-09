import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne,
	JoinColumn,
	BeforeInsert,
} from "typeorm";
import { IsInt } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { IssuesModels } from "./IssuesModels";
import { ContactModels } from "./ContactModels";
import { CommentsModels } from "./CommentsModels";
import { ReportsModels } from "./ReportsModels";
import { InteractionsModels } from "./InteractionsModels";
import { FilesModels } from "./FilesModels";
import { IsUnique } from "../inputs/IsUniqueValidator";
import { SubscriptionModels } from "./SubscriptionModels";

@ObjectType()
@Entity()
export class UsersModels extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ nullable: true })
	firstname!: string;

	@Field()
	@Column({ nullable: true })
	lastname!: string;

	@Field()
	@Column()
	@IsUnique("username", {
		message:
			"Le noms d'utilisateur choisi éxiste déjà. Merci d'en choisir un autre",
	})
	username!: string;

	@Field()
	@Column()
	@IsUnique("email", {
		message: "L'email choisi éxiste déjà. Merci d'en choisir un autre",
	})
	email!: string;

	@Field()
	@Column()
	password!: string;

	@Field()
	@Column()
	role!: string;

	@BeforeInsert()
	setDefaultRole(): void {
		this.role = "invited";
	}

	@Column()
	@IsInt()
	executedcode!: number;

	@BeforeInsert()
	setDefaultExecutedCode(): void {
		this.executedcode = 0;
	}

	@CreateDateColumn()
	createdAt!: Date;

	@Column({ nullable: true })
	firstExecutedCodeAt!: Date;

	@Field(() => [IssuesModels])
	@OneToMany(() => IssuesModels, (issue) => issue.user)
	issues: IssuesModels[];

	@Field(() => [ContactModels])
	@OneToMany(() => ContactModels, (contact) => contact.user)
	contacts: ContactModels[];

	@Field(() => [CommentsModels])
	@OneToMany(() => CommentsModels, (comment) => comment.user)
	comments: CommentsModels[];

	@Field(() => [ReportsModels])
	@OneToMany(() => ReportsModels, (report) => report.user)
	reports: ReportsModels[];

	@Field(() => [InteractionsModels])
	@OneToMany(() => InteractionsModels, (interaction) => interaction.user)
	interactions: InteractionsModels[];

	@Field(() => [FilesModels])
	@OneToMany(() => FilesModels, (file) => file.user)
	files: FilesModels[];

	@OneToOne(() => SubscriptionModels, {
		eager: true,
	})
	@JoinColumn()
	subscription: SubscriptionModels;
}
