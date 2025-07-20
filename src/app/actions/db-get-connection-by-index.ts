'use server'

import { PrismaClient } from '@prisma/client'

import { Connection } from '@/app/prisma.types'

const prisma = new PrismaClient()

export async function dbGetConnectionByIndex(index: number) {
  const connections: Connection[] = await prisma.connections.findMany({
    orderBy: { created_at: 'desc' },
    take: 1,
    skip: index
  })

  return connections[0] || null
}
