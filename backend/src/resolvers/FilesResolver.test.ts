import { testDataSource } from "../Utils/testDataSource"
import { callGraphQL } from "../Utils/callGraphQL"
import { config } from "dotenv"
import { faker } from "@faker-js/faker"
import { LanguageModels } from "../models/LanguageModels"
import { FilesModels } from "../models/FilesModels"
import { UsersModels } from "../models/UsersModels"
import { SubscriptionModels } from "../models/SubscriptionModels"
import * as argon2 from "argon2"

config()

describe("FilesResolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize()
  })

  describe("addFile", () => {
    it("should throw error, if langage is not found", async () => {
      const languageId = 5
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const filename = faker.internet.userName()

      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const token = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($inputFile: FileInput!, $languageId: Float!) {
              addFile(inputFile: $inputFile, languageId: $languageId) {
                filename
              }
            }
        `,

          variables: { inputFile: { filename, isPublic }, languageId }
        },
        token.data?.signUp
      )

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("language not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should create a new file and return it", async () => {
      const languageId = 1
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]

      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      await LanguageModels.create({
        name: "javascript",
        version: "18.0.15"
      }).save()

      const token = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($inputFile: FileInput!, $languageId: Float!) {
              addFile(inputFile: $inputFile, languageId: $languageId) {
                filename
              }
            }
        `,

          variables: { inputFile: { filename, isPublic }, languageId }
        },
        token.data?.signUp
      )

      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("addFile")
      expect(response.data?.addFile).toHaveProperty("filename")
      expect(response.data?.addFile.filename).toContain(filename)

      expect(response.errors).not.toBeTruthy()
    })
  })

  describe("updateFile", () => {
    it("should throw error, if file is not found", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const updateFileId = 10
      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const userCreated = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($update: UpdateFileInput!, $updateFileId: Float!) {
              updateFile(update: $update, id: $updateFileId) {
                filename
              }
            }
        `,

          variables: {
            update: { filename, isPublic, nbOfReport, nbOfDownload, content },
            updateFileId
          }
        },
        userCreated.data?.signUp
      )

      expect(response.errors).toBeTruthy()
      expect(response.errors?.length).toBeGreaterThanOrEqual(1)
      expect(response.errors?.[0]).toHaveProperty("message")
      expect(response.errors?.[0].message).toContain("File not found")

      expect(response.data).not.toBeTruthy()
    })

    it("should update an existing file", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const email = faker.internet.email()
      const pass = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const password = await argon2.hash(pass)
      const username = faker.internet.userName()

      const languageCreated = await LanguageModels.create({
        name: "javascript",
        version: "18.0.15"
      }).save()

      const subscription = await SubscriptionModels.create({
        type: "expert",
        duration: "Monthly",
        status: "Active",
        subscribedAt: new Date(),
        subscriptionEndedAt: new Date()
      }).save()

      const userCreated = await UsersModels.create({
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

      const user = await UsersModels.findOneBy({
        id: userCreated.id
      })
      if (user === null) {
        throw new Error("User not found")
      }
      // récupérer un langage en BDD pour liée le fichier a celui-ci
      const language = await LanguageModels.findOneBy({
        id: languageCreated.id
      })
      if (language === null) {
        throw new Error("language not found")
      }

      // Insérer un fichier en BDD
      const file = await FilesModels.create({
        filename,
        content,
        isPublic,
        nbOfReport,
        nbOfDownload,
        user,
        language
      }).save()

      const response = await callGraphQL(
        {
          query: `
            mutation Mutation($update: UpdateFileInput!, $updateFileId: Float!) {
              updateFile(update: $update, id: $updateFileId) {
                filename
                content
                nbOfDownload
                nbOfReport
                isPublic
              }
            }
        `,

          variables: {
            update: { filename, isPublic, nbOfReport, nbOfDownload, content },
            updateFileId: file.id
          }
        },
        token?.data?.signIn
      )
      expect(response.errors).not.toBeTruthy()
      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("updateFile")

      expect(response.data?.updateFile).toHaveProperty("filename")
      expect(response.data?.updateFile).toHaveProperty("content")
      expect(response.data?.updateFile).toHaveProperty("nbOfDownload")
      expect(response.data?.updateFile).toHaveProperty("nbOfReport")
      expect(response.data?.updateFile).toHaveProperty("isPublic")

      expect(response.data?.updateFile.filename).toContain(filename)
      expect(response.data?.updateFile.content).toContain(content)
      expect(response.data?.updateFile.nbOfDownload).toBeGreaterThanOrEqual(0)
      expect(response.data?.updateFile.nbOfReport).toBeGreaterThanOrEqual(0)
      expect(response.data?.updateFile.isPublic).toBe(isPublic)

      expect(response.errors).not.toBeTruthy()
    })
  })
  describe("getFiles", () => {
    it("should find all existing files and return them", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const languageCreated = await LanguageModels.create({
        name: "javascript",
        version: "18.0.15"
      }).save()

      const userCreated = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const user = await UsersModels.findOneBy({
        id: userCreated.data?.id
      })
      if (user === null) {
        throw new Error("User not found")
      }
      // récupérer un langage en BDD pour liée le fichier a celui-ci
      const language = await LanguageModels.findOneBy({
        id: languageCreated.id
      })
      if (language === null) {
        throw new Error("language not found")
      }

      // Insérer un fichier en BDD
      await FilesModels.create({
        filename,
        content,
        isPublic,
        nbOfReport,
        nbOfDownload,
        user,
        language
      }).save()

      const response = await callGraphQL(
        {
          query: `
            query Query($filter: GetFilesQuery!) {
              getFiles(filter: $filter) {
                filename
                isPublic
                nbOfDownload
                nbOfReport
              }
            }
        `,

          variables: {
            filter: {
              page: 1,
              programmingLanguage: null
            }
          }
        },
        userCreated.data?.signUp
      )

      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("getFiles")
      expect(response.data?.getFiles.length).toBeGreaterThanOrEqual(1)

      expect(response.data?.getFiles[2]).toHaveProperty("filename")
      expect(response.data?.getFiles[2]).toHaveProperty("nbOfDownload")
      expect(response.data?.getFiles[2]).toHaveProperty("nbOfReport")
      expect(response.data?.getFiles[2]).toHaveProperty("isPublic")

      expect(response.errors).not.toBeTruthy()
    })
  })

  describe("getFile", () => {
    it("should find one file and return it", async () => {
      const filename = faker.internet.userName()
      const value = [true, false]
      const random = Math.floor(Math.random() * value.length)
      const isPublic = value[random]
      const nbOfReport = 0
      const nbOfDownload = 0
      const content = ""
      const email = faker.internet.email()
      const password = faker.internet.password({
        length: 8,
        prefix: "@A"
      })
      const username = faker.internet.userName()
      const type = "free"

      const languageCreated = await LanguageModels.create({
        name: "javascript",
        version: "18.0.15"
      }).save()

      const userCreated = await callGraphQL({
        query: `
            mutation Mutation($input: SignUpInput!) {
                signUp(input: $input)
            }
        `,

        variables: { input: { email, password, username, type } }
      })

      const user = await UsersModels.findOneBy({
        id: userCreated.data?.id
      })
      if (user === null) {
        throw new Error("User not found")
      }
      // récupérer un langage en BDD pour liée le fichier a celui-ci
      const language = await LanguageModels.findOneBy({
        id: languageCreated.id
      })
      if (language === null) {
        throw new Error("language not found")
      }

      // Insérer un fichier en BDD
      const file = await FilesModels.create({
        filename,
        content,
        isPublic,
        nbOfReport,
        nbOfDownload,
        user,
        language
      }).save()

      const response = await callGraphQL(
        {
          query: `
            query Query($fileId: Float!) {
              getFile(fileId: $fileId) {
                filename
                isPublic
                nbOfDownload
                nbOfReport
              }
            }
        `,

          variables: {
            fileId: file.id
          }
        },
        userCreated.data?.signUp
      )

      expect(response.data).toBeTruthy()
      expect(response.data).toHaveProperty("getFile")

      expect(response.data?.getFile).toHaveProperty("filename")
      expect(response.data?.getFile).toHaveProperty("nbOfDownload")
      expect(response.data?.getFile).toHaveProperty("nbOfReport")
      expect(response.data?.getFile).toHaveProperty("isPublic")

      expect(response.data?.getFile.filename).toContain(filename)
      expect(response.data?.getFile.nbOfDownload).toBeGreaterThanOrEqual(0)
      expect(response.data?.getFile.nbOfReport).toBeGreaterThanOrEqual(0)
      expect(response.data?.getFile.isPublic).toBe(isPublic)

      expect(response.errors).not.toBeTruthy()
    })
  })
})
