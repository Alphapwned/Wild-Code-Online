import { testDataSource } from "../Utils/testDataSource"
import { callGraphQL } from "../Utils/callGraphQL"
import { config } from "dotenv"
import { SubscriptionModels } from "../models/SubscriptionModels"
import { faker } from "@faker-js/faker"
import { UsersModels } from "../models/UsersModels"
import * as argon2 from "argon2"

config()

describe("SubscriptionResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize()
  })

  describe("updateSubscription", () => {
    it("should throw error, if subscription is not found", async () => {
      const id = 50
      const type = "free"

      const response = await callGraphQL({
        query: `
            mutation Mutation($update: UpdateSubscriptionInput!, $updateSubscriptionId: Float!) {
              updateSubscription(update: $update, id: $updateSubscriptionId) {
                id
              }
            }
        `,

        variables: { update: { type }, updateSubscriptionId: id }
      })

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("subscription not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should update subscription and return it", async () => {
      const type = "free"

      const email = faker.internet.email()
      const pass = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const password = await argon2.hash(pass)
      const username = faker.internet.userName()

      const subscription = await SubscriptionModels.create({
        type: "expert",
        duration: "Monthly",
        status: "Active",
        subscribedAt: new Date(),
        subscriptionEndedAt: new Date()
      }).save()

      await UsersModels.create({
        email,
        password,
        username,
        subscription
      }).save()

      const token = await callGraphQL({
        query: `
          query Query($password: String!, $email: String!) {
            signIn(password: $password, email: $email)
          }
          `,
        variables: { email, password: pass }
      })
      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($update: UpdateSubscriptionInput!, $updateSubscriptionId: Float!) {
              updateSubscription(update: $update, id: $updateSubscriptionId) {
                id
              }
            }
        `,

          variables: { update: { type }, updateSubscriptionId: subscription.id }
        },
        token?.data?.signIn
      )

      expect(response.errors).not.toBeTruthy()
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("updateSubscription")
    })

    it("Should return subscription", async () => {
      const type = "Expert"
      const duration = "Monthly"
      const status = "Active"
      const subscribedAt = new Date()
      const subscriptionEndedAt = new Date()

      const subscription = await SubscriptionModels.create({
        type,
        duration,
        status,
        subscribedAt,
        subscriptionEndedAt
      }).save()
      const response = await callGraphQL({
        query: `
            query Query($subscriptionId: Float!) {
              getSubscription(subscriptionId: $subscriptionId) {
                duration
                status
                type
              }
            }
        `,

        variables: { subscriptionId: subscription.id }
      })

      expect(response.errors).not.toBeTruthy()
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("getSubscription")
      expect(response.data?.getSubscription).toHaveProperty("duration")
      expect(response.data?.getSubscription).toHaveProperty("status")
      expect(response.data?.getSubscription).toHaveProperty("type")

      expect(response.data?.getSubscription.type).toBe("Expert")
      expect(response.data?.getSubscription.duration).toBe("Monthly")
      expect(response.data?.getSubscription.status).toBe("Active")
    })

    it("should throw error, if subscription is not found", async () => {
      const id = 36789875

      const response = await callGraphQL({
        query: `
            query Query($subscriptionId: Float!) {
              getSubscription(subscriptionId: $subscriptionId) {
                duration
                status
                type
              }
            }
        `,

        variables: { subscriptionId: id }
      })

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("subscription not found")

      expect(response.data).not.toBeTruthy()
    })
  })
})
