// app/api/parse-html/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as cheerio from 'cheerio'

interface ParseRequestBody {
  html: string
}

interface ParseResponseBody {
  name: string | null
  phone: string | null
  email: string | null
}

export async function POST(req: NextRequest) {
  try {
    const { html }: ParseRequestBody = await req.json()
    const $ = cheerio.load(html)

    const name = $('[data-testid="business-contact-info"] > div').first().text().trim() || null
    const phone = $('[data-testid="business-contact-info-phone"]').text().trim() || null
    const email = $('[data-testid="business-contact-info-email"]').text().trim() || null

    const result: ParseResponseBody = { name, phone, email }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error parsing HTML:', error)

    return NextResponse.json({ name: null, phone: null, email: null }, { status: 500 })
  }
}
