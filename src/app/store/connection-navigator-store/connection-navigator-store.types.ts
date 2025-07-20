import { Connection } from '@/app/prisma.types'

export interface NavigatorState {
  index: number
  connection: Connection | null
  setIndex: (i: number) => void
  setConnection: (c: Connection | null) => void
}
