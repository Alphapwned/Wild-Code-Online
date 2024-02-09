import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { FilesModels } from "./FilesModels";

@ObjectType()
@Entity()
export class LanguageModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  version: string;

  @Field(() => [FilesModels])
  @OneToMany(() => FilesModels, (file) => file.language)
  files: FilesModels[];
}
