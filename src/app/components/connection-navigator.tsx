/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import { dbGetConnectionByIndex } from '@/app/actions/db-get-connection-by-index'
import { useConnectionNavigatorStore } from '@/app/store/connection-navigator-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ConnectionNavigator() {
  const { index, connection, setIndex, setConnection } = useConnectionNavigatorStore()

  const loadConnection = async (idx: number) => {
    const data = await dbGetConnectionByIndex(idx)
    setConnection(data)
  }

  useEffect(() => {
    loadConnection(index)
  }, [index])

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  const handleNext = () => {
    setIndex(index + 1)
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6 space-y-4">
        {connection ? (
          <div className="text-gray-800 space-y-1">
            <p>
              <strong>{connection.booksy_business_name}</strong>
            </p>
            <p>{connection.location_raw}</p>
            <p>
              <a
                href={connection.booksy_url || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {connection.booksy_url}
              </a>
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Brak danych</p>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={index === 0}>
            Poprzedni
          </Button>
          <Button variant="outline" onClick={handleNext}>
            Następny
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
