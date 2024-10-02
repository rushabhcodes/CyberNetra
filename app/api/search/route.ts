import { NextResponse } from 'next/server';

const url = 'https://real-time-web-search.p.rapidapi.com/search';

export async function GET(request: Request) {
  // Log the incoming request URL
  console.log('Request URL:', request.url);

  // Extract query parameter and log it
  const query = new URL(request.url).searchParams.get('query') || 'joe biden'; // Default query
  console.log('Query:', query);

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY as string, // Use environment variable for security
      'x-rapidapi-host': 'real-time-web-search.p.rapidapi.com'
    }
  };

  try {
    // Log the fetch request details
    console.log('Fetching data from:', `${url}?q=${encodeURIComponent(query)}&limit=10`);
    
    const response = await fetch(`${url}?q=${encodeURIComponent(query)}&limit=10`, options);
    
    // Log the response status
    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Log the response text in case of an error
      console.error('Error response:', errorText);
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    
    // Log the result from the API
    console.log('API Result:', result);

    return NextResponse.json(result);
  } catch (error) {
    // Log any errors that occur
    console.error('Fetch Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
                            