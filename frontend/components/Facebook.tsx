import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2, MessageCircle, Factory } from 'lucide-react';

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
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facebook Netra</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {posts.map((post, index) => (
          <Card key={post.post_id} className="mb-4">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.avatar_image_url} alt={post.page_name} />
                  <AvatarFallback>{post.page_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{post.page_name}</CardTitle>
                  <p className="text-sm text-gray-500">{new Date(post.date_posted).toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.post_image && (
                <img src={post.post_image} alt="Post image" className="w-full rounded-md mb-4" />
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
            {index < posts.length - 1 && <Separator className="my-4" />}
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Facebook;