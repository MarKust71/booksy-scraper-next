import { Connection } from '@/app/prisma.types'

// export interface ConnectionData {
//   booksy_business_name: string
//   location_raw: string
//   booksy_url: string
// }

export interface NavigatorState {
  index: number
  connection: Connection | null
  setIndex: (i: number) => void
  setConnection: (c: Connection | null) => void
}
