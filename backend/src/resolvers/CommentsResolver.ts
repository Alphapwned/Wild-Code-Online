import { Arg, Mutation, Authorized, Query, Ctx } from "type-graphql";
import { CommentsModels } from "../models/CommentsModels";
import { CommentsInput } from "../inputs/comments/CommentsInput";
import { UpdateCommentsInput } from "../inputs/comments/UpdateCommentsInput";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";
import { GetCommentsQuery } from "../queries/GetCommentsQuery";

export class CommentsResolver {
	@Authorized()
	// Mutation pour ajouter un commentaire
	@Mutation(() => CommentsModels)
	async addComments(
		@Arg("input") { comment, fileId }: CommentsInput,
		@Ctx() context: any // On déstructure les propriétés de l'objet CommentsInput
	): Promise<CommentsModels> {
		// Recherche de l'utilisateur correspondant à l'ID fourni
		const user = await UsersModels.findOneBy({
			id: context.user.id,
		});
		if (user === null) {
			throw new Error("User not found");
		}

		// Recherche du fichier correspondant à l'ID fourni
		const file = await FilesModels.findOneBy({
			id: fileId,
		});
		if (file === null) {
			throw new Error("File not found");
		}

		// Création d'une instance de CommentsModels avec les données fournies
		const comments = await CommentsModels.create({
			comment,
			user,
			file,
		}).save();

		return comments;
	}

	@Authorized()
	// Mutation pour mettre à jour un commentaire
	@Mutation(() => CommentsModels)
	async updateComments(
		@Arg("id") id: number,
		@Arg("update") { comment }: UpdateCommentsInput, // On déstructure la propriété "comment" de l'objet UpdateCommentsInput
		@Ctx() context: any
	): Promise<CommentsModels> {
		// Recherche du commentaire à mettre à jour en utilisant l'ID fourni
		const commentToUpdate = await CommentsModels.findOneBy({
			id,
		});

		if (commentToUpdate === null) {
			throw new Error("Comment not found");
		}

		if (commentToUpdate.user.id !== context.user.id) {
			throw new Error("You don't have the rights to modify this comment");
		}
		// Fusion des modifications dans l'objet commentToUpdate
		commentToUpdate.comment = comment;

		// Sauvegarde du commentaire mis à jour
		const updatedComments = await commentToUpdate.save();

		return updatedComments;
	}

	// Query pour obtenir tous les commentaires
	@Query(() => [CommentsModels])
	async getComments(
		@Arg("filter") { file }: GetCommentsQuery
	): Promise<CommentsModels[]> {
		const where: Record<string, any> = {};
		const order: Record<string, any> = { createdAt: "DESC" };

		if (file !== undefined) {
			where.file = { id: file };
		}
		const comments = await CommentsModels.find({ where, order });

		return comments;
	}

	// Query pour obtenir un commentaire par ID
	@Query(() => CommentsModels)
	async getCommentsById(
		@Arg("commentsId") commentsId: number
	): Promise<CommentsModels> {
		// Recherche du commentaire en utilisant l'ID fourni
		const comments = await CommentsModels.findOne({
			where: { id: commentsId },
		});

		if (comments === null) {
			throw new Error("Comments not found");
		}
		return comments;
	}

	@Authorized()
	// Mutation pour supprimer un commentaire
	@Mutation(() => Boolean)
	async deleteComments(
		@Arg("CommentsId") CommentsId: number
	): Promise<boolean> {
		// Recherche du commentaire à supprimer en utilisant l'ID fourni
		const commentsToDelete = await CommentsModels.findOne({
			where: { id: CommentsId },
		});
		if (!commentsToDelete) {
			throw new Error("Comments not found");
		}

		// Suppression du commentaire
		await commentsToDelete.remove();
		return true;
	}
}
