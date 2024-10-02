'use client';
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import html2canvas from "html2canvas"; // Import html2canvas

interface Post {
  post_id: string;
  description: string;
  date_posted: string;
  post_url: string;
  photos: string[] | null;
  videos: string[] | null;
  replies: number;
  reposts: number;
  likes: number;
  views: number | null;
  hashtags: string[];
}

interface SuggestedProfile {
  profile_id: string;
  profile_name: string;
  profile_url: string;
  profile_image: string;
}

interface ProfileData {
  x_id: string;
  url: string;
  id: string;
  profile_name: string;
  biography: string | null;
  is_verified: boolean;
  profile_image_link: string;
  external_link: string | null;
  date_joined: string;
  following: number;
  followers: number;
  subscriptions: number;
  location: string | null;
  birth_date: string | null;
  posts_count: number;
  posts: Post[];
  suggested_profiles: SuggestedProfile[];
  is_business_account: boolean;
  is_government_account: boolean;
  category_name: string | null;
  timestamp: string;
}

interface XProps {
  data: ProfileData[];
}

const X: React.FC<XProps> = ({ data }) => {
  const profile = data[0];
  const latestPosts = profile.posts.slice(0, 5);
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
        link.download = 'profile_data_and_latest_posts.png'; // Name the downloaded file
        link.click();

        // Revert the background color to original
        if (componentRef.current) {
          componentRef.current.style.backgroundColor = originalBackgroundColor;
        }
      });
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="text-2xl font-bold">X Netra</div>
      <Card className="mb-6" ref={componentRef}>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={profile.profile_image_link}
                alt={profile.profile_name}
              />
              <AvatarFallback>{profile.profile_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.profile_name}</CardTitle>
              <p className="text-sm text-gray-500">@{profile.id}</p>
              {profile.is_verified && <Badge>Verified</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <UserIcon className="mr-2" />
              <span>Followers: {profile.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <UserIcon className="mr-2" />
              <span>Following: {profile.following.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2" />
              <span>
                Joined: {new Date(profile.date_joined).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>Location: {profile.location || "Not specified"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="mb-4">
        <button onClick={downloadImage} className="p-2 bg-green-600 text-white rounded-md">
          Download Profile Data and Latest Posts
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {latestPosts.map((post) => (
          <Card key={post.post_id} className="mb-4">
            <CardContent className="pt-4">
              <p className="mb-2">{post.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(post.date_posted).toLocaleString()}</span>
                <span>Likes: {post.likes.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default X;
