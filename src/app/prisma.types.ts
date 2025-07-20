// app/types.ts
import type { connections as Connections } from '@prisma/client'

/**
 * Typ jednego rekordu z tabeli `connections`
 */
export type Connection = Connections

/**
 * Typ pomocniczy do wyciągania typu Promise z funkcji (np. dla API)
 */
export type AwaitedReturn<T extends (...args: unknown[]) => unknown> = Awaited<ReturnType<T>>
