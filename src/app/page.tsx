// app/page.tsx
import HtmlParserForm from './components/html-parser-form'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center">Booksy Contacts Updater</h1>

      <HtmlParserForm />
    </main>
  )
}
