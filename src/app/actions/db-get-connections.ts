// app/actions/db-get-connections.ts
'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function dbGetConnections() {
  const connections = await prisma.connections.findMany({
    orderBy: { created_on: 'desc' },
    take: 20
  })

  return connections
}
