import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// postgresql://docker:docker@localhost:5432/gyakuten?schema=public
// TODO: preparing the database for the test e2e
function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}
// This is the environment configuration for the Prisma test environment.
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    // console.log(generateDataBaseURL(schema))
    const databaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync(`npx prisma migrate deploy --preview-feature`)

    return {
      async teardown() {
        // console.log('teardown')
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
