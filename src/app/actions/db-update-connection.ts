'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function dbUpdateConnection(
  id: number,
  updates: {
    registered_business_name?: string
    phone?: string
    email?: string
  }
) {
  return prisma.connections.update({
    where: { id },
    data: updates
  })
}
