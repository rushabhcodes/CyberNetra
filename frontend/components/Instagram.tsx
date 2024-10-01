import React from 'react';
import { User, Image as LucidImage, MessageCircle, ThumbsUp, Calendar } from 'lucide-react';
import Image from 'next/image';

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
    const latestPosts = account.posts.slice(0, 5);
    
    const engagementData = latestPosts.map(post => ({
        id: post.id.slice(-4),
        likes: post.likes,
        comments: post.comments,
        date: new Date(post.datetime).toLocaleDateString()
    }));

    return (
        <div className='w-full max-w-3xl mx-auto p-4'>
          <div className='text-2xl font-bold'>Instagram Post Investigation</div>
          <div className=" m-6 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          
              <header className="flex items-center mb-6 mt-6">
                  <Image width={50} height={50} src={account.profile_image_link} alt={account.full_name} className="w-20 h-20 rounded-full mr-4" />
                  <div>
                      <h1 className="text-2xl font-bold">{account.full_name}</h1>
                      <p className="text-gray-600">@{account.account}</p>
                  </div>
              </header>
              <section className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-100 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">Account Info</h2>
                      <ul className="space-y-2">
                          <li><User className="inline mr-2" size={18} /> Followers: {account.followers}</li>
                          <li><User className="inline mr-2" size={18} /> Following: {account.following}</li>
                          <li><LucidImage className="inline mr-2" size={18} /> Total Posts: {account.posts_count}</li>
                          <li><MessageCircle className="inline mr-2" size={18} /> Avg Engagement: {account.avg_engagement}</li>
                      </ul>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">Biography</h2>
                      <p>{account.biography}</p>
                  </div>
              </section>
              <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Latest 5 Posts Engagement</h2>
                    {/* <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                            <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                        </BarChart>
                    </ResponsiveContainer> */}
              </section>
              <section>
                  <h2 className="text-xl font-semibold mb-4">Latest 5 Posts</h2>
                  <div className="space-y-4">
                      {latestPosts.map(post => (
                          <div key={post.id} className="border p-4 rounded-lg">
                              <p className="font-semibold mb-2">{post.caption.slice(0, 100)}...</p>
                              <div className="flex justify-between text-sm text-gray-600">
                                  <span><ThumbsUp className="inline mr-1" size={16} /> {post.likes}</span>
                                  <span><MessageCircle className="inline mr-1" size={16} /> {post.comments}</span>
                                  <span><Calendar className="inline mr-1" size={16} /> {new Date(post.datetime).toLocaleDateString()}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </section>
          </div>
        </div>
    );
};

export default Instagram;
