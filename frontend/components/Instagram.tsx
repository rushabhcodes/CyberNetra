"use client";
import React, { useRef } from "react";
import {
  User,
  Image as LucidImage,
  MessageCircle,
  ThumbsUp,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import html2canvas from "html2canvas";

// Interfaces for the data structure
interface Post {
  caption: string;
  comments: number;
  datetime: string; // ISO 8601 format
  id: string;
  image_url: string;
  likes: number;
  post_hashtags: string[];
  content_type: string;
  url: string;
  video_url: string | null;
}

interface InstagramAccount {
  input: {
    url: string;
  };
  account: string;
  fbid: string;
  id: string;
  followers: number;
  posts_count: number;
  is_business_account: boolean;
  is_professional_account: boolean;
  is_verified: boolean;
  avg_engagement: number;
  biography: string;
  category_name: string;
  following: number;
  posts: Post[];
  profile_image_link: string;
  profile_url: string;
  profile_name: string;
  highlights_count: number;
  full_name: string;
  is_private: boolean;
  url: string;
  is_joined_recently: boolean;
  has_channel: boolean;
  partner_id: string;
  timestamp: string; // ISO 8601 format
}

// Component Props
interface InstagramProps {
  data: InstagramAccount[];
}

const Instagram: React.FC<InstagramProps> = ({ data }) => {
  const account = data[0];
  const latestPosts =
    account.posts && account.posts.length > 0 ? account.posts.slice(0, 5) : [];
  const componentRef = useRef<HTMLDivElement | null>(null); // Ref to capture the component

  // Function to download the component as an image
  const downloadImage = () => {
    if (componentRef.current) {
      // Change background color to black
      const originalBackgroundColor =
        componentRef.current.style.backgroundColor;
      componentRef.current.style.backgroundColor = "black";

      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "instagram_account_info.png";
        link.click();

        // Revert background color to original
        componentRef.current.style.backgroundColor = originalBackgroundColor;
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="text-2xl font-bold">Instagram Netra</div>

      <div
        className="m-6 p-6 max-w-4xl mx-auto shadow-lg rounded-lg"
        ref={componentRef} // Attach ref to the component
      >
        <header className="flex items-center mb-6 mt-6">
          {account.profile_image_link ? (
            <Image
              width={50}
              height={50}
              src={account.profile_image_link}
              alt={account.full_name}
              className="w-20 h-20 rounded-full mr-4"
            />
          ) : (
            <Image
              width={50}
              height={50}
              src={account.profile_image_link}
              alt={account.full_name}
              className="w-20 h-20 rounded-full mr-4"
              onError={(e) => {
                e.currentTarget.src = "/path/to/fallback/image.png"; // Fallback image
              }}
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{account.full_name}</h1>
            <p className="text-gray-600">@{account.account}</p>
          </div>
        </header>

        <section className="flex gap-4 flex-col mb-6">
          <div className="bg-blue-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Account Info</h2>
            <ul className="space-y-2">
              <li>
                <User className="inline mr-2" size={18} /> Followers:{" "}
                {account.followers}
              </li>
              <li>
                <User className="inline mr-2" size={18} /> Following:{" "}
                {account.following}
              </li>
              <li>
                <LucidImage className="inline mr-2" size={18} /> Total Posts:{" "}
                {account.posts_count}
              </li>
              <li>
                <MessageCircle className="inline mr-2" size={18} /> Avg
                Engagement: {account.avg_engagement}
              </li>
            </ul>
          </div>

          <div className="bg-green-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Biography</h2>
            <p>{account.biography}</p>
          </div>
        </section>

        {latestPosts.length > 0 && (
          <div className="mb-4">
            <button
              onClick={downloadImage}
              className="p-2 bg-green-600 text-white rounded-md"
            >
              Download Image
            </button>
          </div>
        )}

        <section>
          <h2 className="text-xl font-semibold mb-4">Latest 5 Posts</h2>
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-4">
              {latestPosts.map((post, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt="Post image"
                      width={600}
                      height={400}
                      className="w-full rounded-md mb-4"
                    />
                  ) : (
                    <img
                      src={post.image_url}
                      alt="Post image"
                      className="w-full rounded-md mb-4"
                    />
                  )}
                  <p className="font-semibold mb-2">{post.caption}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      <ThumbsUp className="inline mr-1" size={16} />{" "}
                      {post.likes}
                    </span>
                    <span>
                      <MessageCircle className="inline mr-1" size={16} />{" "}
                      {post.comments}
                    </span>
                    <span>
                      <Calendar className="inline mr-1" size={16} />{" "}
                      {new Date(post.datetime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
};

export default Instagram;
