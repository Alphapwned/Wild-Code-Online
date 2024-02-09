import { Arg, Mutation, Authorized, Query, Ctx } from "type-graphql"
import { LanguageModels } from "../models/LanguageModels"
import { LanguageInput } from "../inputs/LanguageInput"

export class LanguageResolver {
  @Authorized()
  @Mutation(() => LanguageModels)
  async addLanguage(
    @Arg("name") name: string,
    @Ctx() context: any
  ): Promise<LanguageModels> {
    if (context.user.role !== "admin") {
      throw new Error("You must be admin to add a new language")
    }
    const language = await LanguageModels.create({
      name
    }).save()
    return language
  }

  @Authorized()
  @Mutation(() => LanguageModels)
  async updateLanguage(
    @Arg("id") id: number,
    @Arg("name")
    { name }: LanguageInput,
    @Ctx() context: any
  ): Promise<LanguageModels> {
    if (context.user.role !== "admin") {
      throw new Error("You must be admin to edit the language")
    }
    const languageToUpdate = await LanguageModels.findOneBy({
      id
    })
    if (languageToUpdate === null) {
      throw new Error("Language not found")
    }
    const language = await LanguageModels.merge(languageToUpdate, {
      name
    }).save()

    return language
  }

  @Authorized()
  @Query(() => [LanguageModels])
  async getLanguages(): Promise<LanguageModels[]> {
    const languages = await LanguageModels.find()
    return languages
  }

  @Authorized()
  @Query(() => LanguageModels)
  async getLanguageById(
    @Arg("languageId") languageId: number
  ): Promise<LanguageModels> {
    const language = await LanguageModels.findOne({
      where: { id: languageId }
    })
    if (language === null) {
      throw new Error("Language not found")
    }
    return language
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteLanguage(
    @Arg("languageId") languageId: number
  ): Promise<boolean> {
    const languageToDelete = await LanguageModels.findOne({
      where: { id: languageId }
    })
    if (!languageToDelete) {
      throw new Error("Language not found")
    }

    await languageToDelete.remove()
    return true
  }
}
