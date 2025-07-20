// app/actions/db-get-connections.ts
'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function dbGetConnections() {
  return prisma.connections.findMany({
    orderBy: { created_at: 'desc' },
    take: 20
  })
}
