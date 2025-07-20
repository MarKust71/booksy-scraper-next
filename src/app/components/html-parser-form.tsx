'use client'

import { toast } from 'sonner'

import { dbUpdateConnection } from '@/app/actions/db-update-connection'
import { ConnectionNavigator } from '@/app/components/connection-navigator'
import { useConnectionNavigatorStore } from '@/app/store/connection-navigator-store'
import { useHtmlParserStore } from '@/app/store/html-parser-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const DEFAULT_EMAIL: string = 'info@booksy.com'

export default function HtmlParserForm() {
  const { html, result, setHtml, setResult } = useHtmlParserStore()
  const { connection } = useConnectionNavigatorStore()

  const handleSubmit = async () => {
    const res = await fetch('/api/parse-html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html })
    })
    const data = await res.json()
    setResult(data)
  }

  const handleUpdate = async () => {
    if (!connection || !result) return

    try {
      await dbUpdateConnection(connection.id, {
        registered_business_name: result.name ?? undefined,
        phone: result.phone ?? undefined,
        email: result.email?.replace(DEFAULT_EMAIL, '') ?? undefined
      })

      setHtml('')
      setResult(null)

      toast.success('Rekord został zaktualizowany.')
    } catch (error) {
      toast.error('Wystąpił błąd podczas aktualizacji.')
      console.error(error)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setHtml(text)
        toast.success('Wklejono zawartość ze schowka.')
      } else {
        toast.warning('Schowek jest pusty.')
      }
    } catch (err) {
      toast.error('Nie udało się odczytać ze schowka.')
      console.error(err)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ConnectionNavigator />

      <div className="mt-6" />

      <Card>
        <CardContent className="p-6 space-y-4">
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={15}
            placeholder="Wklej HTML tutaj..."
            className="text-xs max-h-1/4"
          />

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePasteFromClipboard} className="cursor-pointer">
              Wklej
            </Button>

            <Button onClick={handleSubmit} disabled={!html} className="cursor-pointer">
              Parsuj HTML
            </Button>
          </div>

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

          {result && connection && (
            <Button onClick={handleUpdate} className="cursor-pointer" disabled={!result}>
              Aktualizuj
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
