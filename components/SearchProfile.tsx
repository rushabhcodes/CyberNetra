'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { ScrollArea } from './ui/scroll-area';

const Search = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  interface SearchResult {
    url: string;
    title: string;
    snippet: string;
    source: string;
  }
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    console.log('Search initiated');
    console.log('Current input values:', { name, username, email, phone });
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/search?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
      
      console.log('API Response Status:', response.status);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setResults(data.data); // Use data.data to get the relevant results
    } catch (err) {
      console.error('Error during fetch:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center">OSINT Social Media Search</h1>
      <div className="space-y-4">
        <Input
          className="p-3 border rounded-md"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="p-3 border rounded-md"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="p-3 border rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="p-3 border rounded-md"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button className="w-full p-3" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}
      
      {/* Conditionally render ScrollArea only if results exist */}
      {results.length > 0 && (
        <ScrollArea className="h-[600px] rounded-md border p-4 bg-black ">
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="border p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                <h2 className="font-semibold text-lg">
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {result.title}
                  </a>
                </h2>
                <p className="text-gray-600">{result.snippet}</p>
                <p className="text-sm text-gray-500">Source: {result.source}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
};

export default Search;
