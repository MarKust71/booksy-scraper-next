// app/components/HtmlForm.tsx
'use client';

import {useEffect, useState} from 'react';
import {dbGetConnections} from "@/app/actions/db-get-connections";

interface ParseResult {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export default function HtmlParserForm() {
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

  const getConnections = async () => {
    const connections = await dbGetConnections()
    console.log({connections})
  }

  useEffect(()=> {
    console.log('useEffect')
    getConnections()
  }, [])

  console.log("result")

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
    <textarea
      value={html}
      onChange={(e) => setHtml(e.target.value)}
      rows={15}
      className="w-full border border-gray-300 rounded p-3 text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Wklej HTML tutaj..."
    />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Parsuj HTML
      </button>

      {result && (
        <div className="mt-6 space-y-2 bg-gray-100 p-4 rounded text-gray-800">
          <p><strong>Nazwa:</strong> {result.name || '—'}</p>
          <p><strong>Telefon:</strong> {result.phone || '—'}</p>
          <p><strong>Email:</strong> {result.email || '—'}</p>
        </div>
      )}
    </div>
  );
}
