import { Authorized, Mutation, Arg, Ctx } from "type-graphql";
import axios from "axios";
import { FilesModels } from "../models/FilesModels";
import { UsersModels } from "../models/UsersModels";

export class PistonResolver {
	// @Authorized()
	@Mutation(() => String)
	async runCode(
		@Arg("id") id: number,
		@Arg("content") content: string,
		@Ctx() context: any
	): Promise<string> {
		const file = await FilesModels.findOne({
			where: { id },
		});
		if (file === null) {
			throw new Error("File not found");
		}
		const user = await UsersModels.findOneBy({
			id: context.user.id,
		});

		const resetDate: Date = new Date();
		if (
			user?.subscription.type === "Free" &&
			user?.firstExecutedCodeAt !== null &&
			(user?.firstExecutedCodeAt.getUTCDate() < resetDate.getUTCDate() ||
				user?.firstExecutedCodeAt.getUTCMonth() < resetDate.getUTCMonth() ||
				user?.firstExecutedCodeAt.getUTCFullYear() < resetDate.getUTCFullYear())
		) {
			await UsersModels.merge(user, {
				executedcode: 0,
			}).save();
		}
		if (user?.subscription.type === "Free" && user.executedcode > 50) {
			throw new Error("code execution limit reached");
		}

		if (user?.subscription.type === "Free" && user.executedcode === 0) {
			const firstExecutedCodeAt = new Date();
			const executedcode = 1;
			await UsersModels.merge(user, {
				executedcode,
				firstExecutedCodeAt,
			}).save();
		} else if (
			user?.subscription.type === "Free" &&
			user.executedcode > 0 &&
			user.executedcode <= 50
		) {
			const executedcode = user.executedcode + 1;
			await UsersModels.merge(user, {
				executedcode,
			}).save();
		}

		try {
			const response = await axios.post(
				"http://piston_api:2000/api/v2/execute",
				{
					language: file.language.name,
					version: file.language.version, // enculé (by Alex1s)
					files: [
						{
							name: file.filename,
							content,
						},
					],
				}
			);
			return JSON.stringify(response.data);
		} catch (error: any) {
			console.log("error", error);
			throw new Error("Une erreur s'est produite");
		}
	}
}
