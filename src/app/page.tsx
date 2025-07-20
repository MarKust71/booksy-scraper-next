// app/page.tsx
import HtmlForm from './components/HtmlForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Parser HTML z Cheerio</h1>
      <HtmlForm />
    </main>
  );
}
