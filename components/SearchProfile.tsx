// components/SearchProfile.tsx
'use client';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert } from './ui/alert';

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  domain: string;
  position: number;
}

interface ApiResponse {
  status: string;
  request_id: string;
  data: SearchResult[];
}

const SearchProfile: React.FC = () => {
  const [query, setQuery] = useState<string>('joe biden'); // Default query
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await res.json();
      if (data.status === 'OK') {
        setResults(data.data); // Use 'data' array from the response
      } else {
        throw new Error('Error fetching data');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4  shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Open Source Intelligence Search</h1>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a name"
        className="mb-4 border rounded-md p-2 focus:outline-none focus:ring-2 "
      />
      <Button onClick={handleSearch} disabled={loading} className="mb-4">
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {error && <Alert variant="destructive">{error}</Alert>}
      {results.length > 0 && (
        <ul className="mt-4 space-y-4">
          {results.map((result) => (
            <li key={result.position} className="border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className=" hover:underline">
                  {result.title}
                </a>
              </h3>
              <p >{result.snippet}</p>
              <p className="italic">{result.domain}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProfile;
