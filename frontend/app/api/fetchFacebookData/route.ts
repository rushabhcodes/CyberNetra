import { NextResponse } from 'next/server';

async function fetchSnapshotStatus(snapshotId: string, apiToken: string) {
  const response = await fetch(`https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}?format=json`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });
  return response.json();
}

export async function POST(req: Request) {
  const { url, numOfPosts } = await req.json();
  const API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN;

  if (!url || !numOfPosts) {
    console.error('Missing required fields:', { url, numOfPosts });
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  if (!API_TOKEN) {
    console.error('Missing API token');
    return NextResponse.json({ message: 'Missing API token' }, { status: 500 });
  }

  try {
    console.log('Triggering data collection for URL:', url, 'with numOfPosts:', numOfPosts);
    
    // First request to trigger data collection
    const triggerResponse = await fetch('https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lkaxegm826bjpoo9m5', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ url, num_of_posts: numOfPosts }]),
    });

    const triggerData = await triggerResponse.json();
    console.log('Trigger response received:', triggerData);

    // Check if snapshot_id is returned
    if (triggerData.snapshot_id) {
      let snapshotData;
      
      // Poll for the snapshot status every 10 seconds
      while (true) {
        console.log('Checking snapshot status for ID:', triggerData.snapshot_id);
        snapshotData = await fetchSnapshotStatus(triggerData.snapshot_id, API_TOKEN);
        
        console.log('Snapshot status response:', snapshotData);

        if (snapshotData.status !== 'running' && snapshotData.status !== 'building') {
          return NextResponse.json(snapshotData, { status: 200 });
        }                                       
        // Wait for 10 seconds before the next check
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    } else {
      return NextResponse.json(triggerData, { status: triggerResponse.status });
    }
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    console.error('Error occurred:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}
