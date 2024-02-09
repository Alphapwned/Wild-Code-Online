import { Arg, Mutation, Query, Ctx } from "type-graphql"
import { SubscriptionModels } from "../models/SubscriptionModels"
import { UpdateSubscriptionInput } from "../inputs/subscription/UpdateSubscriptionInput"
import { calculateEndedAt } from "../services/SubcriptionEndedAt.service"

export class SubscriptionResolver {
  @Mutation(() => SubscriptionModels)
  async updateSubscription(
    @Arg("id") id: number,
    @Arg("update")
    { type }: UpdateSubscriptionInput,
    @Ctx() context: any
  ): Promise<SubscriptionModels> {
    // passe la 1ère lettre ne majuscule
    type = `${type.charAt(0).toUpperCase()}${type.substring(1).toLowerCase()}`
    let status = ""
    let duration = ""

    let subscription: SubscriptionModels

    // définit une nouvelle date de début
    const subscribedAt = new Date()

    // récupérer la soucription a update
    const subscriptionToUpdate = await SubscriptionModels.findOne({
      where: { id },
      relations: {
        user: true
      }
    })
    if (subscriptionToUpdate === null) {
      throw new Error("subscription not found")
    }
    if (subscriptionToUpdate.user.id !== context.user.id) {
      throw new Error("You don't have the rights to modify this subscription")
    }
    if (type === "Expert" && subscriptionToUpdate.status === "Inactive") {
      // calcule la date de fin en fonction de la date de début
      status = "Active"
      duration = "Monthly"
      const subscriptionEndedAt = calculateEndedAt(
        duration,
        status,
        subscribedAt
      )
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        subscriptionEndedAt,
        duration,
        status,
        subscribedAt,
        type
      }).save()
    } else if (type === "Free" && subscriptionToUpdate.status === "Active") {
      status = "Active"
      duration = "Monthly"
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        duration,
        status,
        subscribedAt,
        type
      }).save()
    } else {
      status = "Inactive"
      duration = ""
      subscription = await SubscriptionModels.merge(subscriptionToUpdate, {
        duration,
        status,
        subscribedAt,
        type
      }).save()
    }

    // update les la date de fin

    return subscription
  }

  // Query pour recuperer un fichier par son id
  @Query(() => SubscriptionModels)
  async getSubscription(
    @Arg("subscriptionId") subscriptionId: number
  ): Promise<SubscriptionModels> {
    const subscription = await SubscriptionModels.findOneBy({
      id: subscriptionId
    })
    if (subscription === null) {
      throw new Error("subscription not found")
    }

    return subscription
  }
}
