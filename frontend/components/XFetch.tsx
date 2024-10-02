"use client";

import { useState, FormEvent } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import X from './X';

const XFetchComponent: React.FC = () => {
  const [url, setUrl] = useState<string>('https://x.com/elonmusk/'); // Default Instagram URL
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    setLoading(true); // Start loading
    console.log('Instagram form submitted with URL:', url);

    try {
      const res = await fetch('/api/fetchXData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      const data = await res.json();
      console.log('X response received:', data);
      setResponse(data);
    } catch (err) {
      console.error('Error occurred while fetching X data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false); // Stop loading when done
      console.log('Loading state finished');
    }
  };

  return (
    <Card className="p-4">
      <h1 className="text-lg font-bold">Fetch X Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="url">X URL:</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {loading && <p className="mt-4">Loading snapshot data, please wait...</p>}

      {response && (
        <div className="mt-4">
          <X data={response}/>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <h2 className="font-semibold">Error:</h2>
          <p>{error}</p>
        </Alert>
      )}
    </Card>
  );
};

export default XFetchComponent;
