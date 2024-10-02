"use client";

import { useState, FormEvent } from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import Facebook from "@/components/Facebook";

const FacebookFetchComponent: React.FC = () => {
  const [url, setUrl] = useState<string>('https://www.facebook.com/gagadaily/');
  const [numOfPosts, setNumOfPosts] = useState<number>(5);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    setLoading(true); // Start loading
    console.log('Form submitted with:', { url, numOfPosts });

    try {
      const res = await fetch('/api/fetchFacebookData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, numOfPosts }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }

      const data = await res.json();
      console.log('Response received:', data);
      setResponse(data);
    } catch (err) {
      console.error('Error occurred while fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false); // Stop loading when done
      console.log('Loading state finished');
    }
  };

  return (
    <Card className="p-4">
      <h1 className="text-lg font-bold">Fetch Facebook Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="url">URL:</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="numOfPosts">Number of Posts:</Label>
          <Input
            id="numOfPosts"
            type="number"
            value={numOfPosts}
            onChange={(e) => setNumOfPosts(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {loading && <p className="mt-4">Loading snapshot data, please wait...</p>}

      {response && (
        <div className="mt-4">
         <Facebook posts={response}/>
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

export default FacebookFetchComponent;
