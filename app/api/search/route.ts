// app/api/fetchData/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const name = searchParams.get('name') || '';
  const username = searchParams.get('username') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  const query = `("${name}" OR "${username}" OR "${email}" OR "${phone}") (site:twitter.com | site:facebook.com | site:instagram.com | site:tiktok.com | site:linkedin.com | site:github.com | site:pinterest.com | site:reddit.com | site:youtube.com | site:medium.com | site:tumblr.com | site:quora.com | site:flickr.com)`;
  
  const url = `https://real-time-web-search.p.rapidapi.com/search-advanced?q=${encodeURIComponent(query)}&num=50&start=0&gl=us&hl=en&location=India`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'real-time-web-search.p.rapidapi.com',
      'x-rapidapi-key': 'a52b4cd293msh80a0e0372f86559p161ebcjsn505876d96808',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
