'use client';
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import html2canvas from 'html2canvas'; // Import html2canvas
import Image from 'next/image'; // Import Image from Next.js

// Interfaces
interface LikesType {
  type: string;
  num: number;
}

interface Attachment {
  id: string;
  type: string;
  url: string;
  video_url: string | null;
}

interface Post {
  post_id: string;
  user_url: string;
  user_username_raw: string;
  content: string;
  date_posted: string;
  num_comments: number;
  num_shares: number;
  num_likes_type: LikesType;
  page_name: string;
  avatar_image_url: string;
  post_image: string;
  likes: number;
  attachments?: Attachment[];
}

interface Facebook {
  posts: Post[];
}

const Facebook: React.FC<Facebook> = ({ posts }) => {
  const firstPost = posts[0];
  const latestPosts = posts && posts.length > 0 ? posts.slice(0, 5) : [];
  const componentRef = useRef<HTMLDivElement | null>(null); // Create a ref for the component

  // Function to download the component as an image
  const downloadImage = () => {
    if (componentRef.current) {
      // Store the original background color
      const originalBackgroundColor = componentRef.current.style.backgroundColor;
      
      // Change the background color to black
      componentRef.current.style.backgroundColor = 'black';
  
      // Capture the component and download it as an image
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'facebook_posts.png';
        link.click();
  
        // Revert the background color to original
        if (componentRef.current) {
          componentRef.current.style.backgroundColor = originalBackgroundColor;
        }
      });
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="text-2xl font-bold">Facebook Netra</div>

      <div className="m-6 p-6 max-w-4xl mx-auto shadow-lg rounded-lg" ref={componentRef}>
        {/* Account Info Section */}
        <section className="flex gap-4 flex-col mb-6">
          <div className="bg-blue-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Account Info</h2>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={firstPost.avatar_image_url} alt={firstPost.page_name} />
                <AvatarFallback>{firstPost.page_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{firstPost.page_name}</h1>
                <p className="text-gray-600">@{firstPost.user_username_raw}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Button */}
        <div className="mb-4">
          <button onClick={downloadImage} className="p-2 bg-green-600 text-white rounded-md">
            Download Image
          </button>
        </div>

        {/* Latest Posts Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Latest 5 Posts</h2>
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-4">
              {latestPosts.map((post, index) => (
                <Card key={post.post_id} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.avatar_image_url} alt={post.page_name} />
                        <AvatarFallback>{post.page_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{post.page_name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {new Date(post.date_posted).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.content}</p>
                    {post.post_image && (
                      <Image 
                        src={post.post_image} 
                        alt="Post image" 
                        className="w-full rounded-md mb-4" 
                        width={500} // Provide a width for Next.js Image component
                        height={300} // Provide a height for Next.js Image component
                        layout="responsive" // Optional: Makes the image responsive
                      />
                    )}

                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle size={16} />
                        <span>{post.num_comments}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Share2 size={16} />
                        <span>{post.num_shares}</span>
                      </div>
                    </div>
                  </CardContent>
                  {index < latestPosts.length - 1 && <Separator className="my-4" />}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
};

export default Facebook;
