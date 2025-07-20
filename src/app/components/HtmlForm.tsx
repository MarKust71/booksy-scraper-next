// app/components/HtmlForm.tsx
'use client';

import { useState } from 'react';

interface ParseResult {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export default function HtmlForm() {
  const [html, setHtml] = useState<string>('');
  const [result, setResult] = useState<ParseResult | null>(null);

  const handleSubmit = async () => {
    const res = await fetch('/api/parse-html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    });
    const data: ParseResult = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        rows={15}
        className="w-full border rounded p-2 mb-4 font-mono"
        placeholder="Wklej HTML tutaj..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Parsuj HTML
      </button>

      {result && (
        <div className="mt-6 space-y-2 bg-gray-100 p-4 rounded">
          <p><strong>Nazwa:</strong> {result.name || '—'}</p>
          <p><strong>Telefon:</strong> {result.phone || '—'}</p>
          <p><strong>Email:</strong> {result.email || '—'}</p>
        </div>
      )}
    </div>
  );
}
