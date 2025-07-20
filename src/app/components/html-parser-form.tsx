'use client'

import { useEffect } from 'react'

import { dbGetConnections } from '@/app/actions/db-get-connections'
import { useHtmlParserStore } from '@/app/store/html-parser-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function HtmlParserForm() {
  const { html, result, setHtml, setResult } = useHtmlParserStore()

  const handleSubmit = async () => {
    const res = await fetch('/api/parse-html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html })
    })
    const data = await res.json()
    setResult(data)
  }

  const getConnections = async () => {
    const connections = await dbGetConnections()
    console.log({ connections })
  }

  useEffect(() => {
    getConnections()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-4">
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={15}
            placeholder="Wklej HTML tutaj..."
          />
          <Button onClick={handleSubmit}>Parsuj HTML</Button>

          {result && (
            <div className="space-y-2 text-gray-800 bg-gray-100 p-4 rounded">
              <p>
                <strong>Nazwa:</strong> {result.name || '—'}
              </p>
              <p>
                <strong>Telefon:</strong> {result.phone || '—'}
              </p>
              <p>
                <strong>Email:</strong> {result.email || '—'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
