import { create } from 'zustand'
import { HtmlParserState } from '@/app/store/html-parser-store/html-parser-store.types'

export const useHtmlParserStore = create<HtmlParserState>()((set) => ({
  html: '',
  result: null,
  setHtml: (value) => set({ html: value }),
  setResult: (value) => set({ result: value })
}))
