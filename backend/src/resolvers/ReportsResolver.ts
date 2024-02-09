import { Arg, Mutation, Authorized, Query, Ctx } from "type-graphql"
import { ReportsModels } from "../models/ReportsModels"
import { ReportsInput } from "../inputs/reports/ReportsInput"
import { UpdateReportsInput } from "../inputs/reports/UpdateReportsInput"
import { UsersModels } from "../models/UsersModels"
import { FilesModels } from "../models/FilesModels"

export class ReportsResolver {
  // Mutation pour ajouter un report
  @Authorized()
  @Mutation(() => ReportsModels)
  async addReports(
    @Arg("input") { comment, title, fileId }: ReportsInput, // On déstructure les propriétés de l'objet ReportsInput
    @Ctx() context: any
  ): Promise<ReportsModels> {
    // Recherche de l'utilisateur correspondant à l'ID fourni
    const user = await UsersModels.findOneBy({ id: context.user.id })
    if (user === null) {
      throw new Error("User not found")
    }

    // Recherche du fichier correspondant à l'ID fourni
    const file = await FilesModels.findOneBy({ id: fileId })
    if (file === null) {
      throw new Error("File not found")
    }

    // Création d'une instance de ReportsModels avec les données fournies
    const report = await ReportsModels.create({
      comment,
      title,
      user,
      file
    }).save()

    return report
  }

  // Mutation pour mettre à jour un report
  @Authorized()
  @Mutation(() => ReportsModels)
  async updateReport(
    @Arg("id") id: number,
    @Arg("update") { comment }: UpdateReportsInput // On déstructure la propriété "comment" de l'objet UpdatereportsInput
  ): Promise<ReportsModels> {
    // Recherche du commentaire à mettre à jour en utilisant l'ID fourni
    const reportToUpdate = await ReportsModels.findOneBy({
      id
    })

    if (reportToUpdate === null) {
      throw new Error("Comment not found")
    }

    // Fusion des modifications dans l'objet reportToUpdate
    reportToUpdate.comment = comment

    // Sauvegarde du commentaire mis à jour
    const updatedReport = await reportToUpdate.save()

    return updatedReport
  }

  // Query pour obtenir tous les reports
  @Authorized()
  @Query(() => [ReportsModels])
  async getReports(): Promise<ReportsModels[]> {
    const comments = await ReportsModels.find()
    return comments
  }

  // Query pour obtenir un commentaire par ID
  @Authorized()
  @Query(() => ReportsModels)
  async getReportbyId(
    @Arg("commentId") commentId: number
  ): Promise<ReportsModels> {
    // Recherche du commentaire en utilisant l'ID fourni
    const comment = await ReportsModels.findOne({
      where: { id: commentId }
    })
    if (comment === null) {
      throw new Error("Comments not found")
    }
    return comment
  }

  // Mutation pour supprimer un commentaire
  @Authorized()
  @Mutation(() => Boolean)
  async deleteReports(@Arg("CommentsId") CommentId: number): Promise<boolean> {
    // Recherche du commentaire à supprimer en utilisant l'ID fourni
    const commentToDelete = await ReportsModels.findOne({
      where: { id: CommentId }
    })
    if (!commentToDelete) {
      throw new Error("Comments not found")
    }

    // Suppression du commentaire
    await commentToDelete.remove()
    return true
  }
}
