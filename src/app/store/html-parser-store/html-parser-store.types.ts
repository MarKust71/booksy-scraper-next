export interface HtmlParseResult {
  name: string | null
  phone: string | null
  email: string | null
}

export interface HtmlParserState {
  html: string
  result: HtmlParseResult | null
  setHtml: (value: string) => void
  setResult: (value: HtmlParseResult | null) => void
}
