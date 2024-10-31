"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, Share2, Home, Search, User } from "lucide-react";
import { PostPage } from "./posts/post-page";
import { Dumbbell } from "lucide-react";
interface Comment {
  id: number;
  user: string;
  text: string;
  userImage: string;
}

interface Post {
  id: number;
  type: "video" | "tweet";
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  shares: number;
  thumbnail?: string;
  userLiked?: boolean;
}

export default function BasketballFeedPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: "video",
      author: "NBA",
      authorAvatar: "/images/NikolaAndDoncic.jpg",
      content: "Top 10 Plays of the Night | May 15, 2023",
      likes: 15000,
      comments: [
        {
          id: 1,
          user: "JohnDoe",
          text: "Amazing plays!",
          userImage: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          user: "JaneSmith",
          text: "That dunk was insane!",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 5600,
      thumbnail: "/images/NikolaAndDoncic.jpg",
      userLiked: false,
    },
    {
      id: 2,
      type: "video",
      author: "ESPN",
      authorAvatar: "/images/img5.jpeg",
      content: "The Greatest Comebacks in NBA History",
      likes: 12000,
      comments: [
        {
          id: 1,
          user: "BasketballFan92",
          text: "Incredible games!",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 3000,
      thumbnail: "/images/img_5_1.jpg",
      userLiked: true,
    },
    {
      id: 3,
      type: "tweet",
      author: "NBAOfficial",
      authorAvatar: "/images/img11.jpg",
      content: "LeBron James breaks another record!",
      likes: 20000,
      comments: [],
      shares: 5000,
      thumbnail: "/images/lebron.jpg",
      userLiked: false,
    },
    {
      id: 4,
      type: "video",
      author: "Bleacher Report",
      authorAvatar: "/images/img6.jpeg",
      content: "Lost Legend ❤ ",
      likes: 18000,
      comments: [
        {
          id: 1,
          user: "SlamDunkLover",
          text: "He's dunks were out of this world",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 4000,
      thumbnail: "/images/img7.jpg",
      userLiked: false,
    },
    {
      id: 5,
      type: "video",
      author: "SportsCenter",
      authorAvatar: "/images/SportsCenterLogo.jpg",
      content: "NBA Playoff Highlights: Round 1",
      likes: 22000,
      comments: [],
      shares: 6000,
      thumbnail: "/images/img8.jpeg",
      userLiked: true,
    },
    {
      id: 6,
      type: "tweet",
      author: "KAT",
      authorAvatar: "/images/img12.jpeg",
      content: "Hard work pays off! #MambaMentality",
      likes: 15000,
      comments: [
        {
          id: 1,
          user: "FanOfKobe",
          text: "Miss you, Kobe! 🐍",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 3500,
      thumbnail: "/images/img12.jpeg",
      userLiked: false,
    },
    {
      id: 7,
      type: "video",
      author: "NBA Highlights",
      authorAvatar: "/images/img9.jpg",
      content: "Best Three-Pointers from the Last Season",
      likes: 17000,
      comments: [
        {
          id: 1,
          user: "ShootingStar",
          text: "Three-point king!",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 4200,
      thumbnail: "/images/img9.jpg",
      userLiked: true,
    },
    {
      id: 8,
      type: "tweet",
      author: "Shaquille O'Neal",
      authorAvatar: "/images/img13.jpg",
      content: "Never underestimate the heart of a champion!",
      likes: 13000,
      comments: [],
      shares: 2800,
      thumbnail: "/images/shaq_quote.jpg",
      userLiked: false,
    },
    {
      id: 9,
      type: "video",
      author: "Dunk Central",
      authorAvatar: "/images/img10.jpeg",
      content: "The Most Insane Dunks of All Time!",
      likes: 19000,
      comments: [],
      shares: 5500,
      thumbnail: "/images/img10.jpeg",
      userLiked: false,
    },
    {
      id: 10,
      type: "tweet",
      author: "Stephen Curry",
      authorAvatar: "/images/img14.jpg",
      content: "Just keep shooting! 🏀 #NBA",
      likes: 21000,
      comments: [
        {
          id: 1,
          user: "CurryFan23",
          text: "Best shooter ever!",
          userImage: "/placeholder.svg?height=40&width=40",
        },
      ],
      shares: 4900,
      thumbnail: "/images/curry_quote.jpg",
      userLiked: true,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.userLiked ? post.likes - 1 : post.likes + 1,
            userLiked: !post.userLiked,
          };
        }
        return post;
      })
    );
  };

  const handleComment = (postId: number) => {
    setSelectedPost(postId);
  };

  const handleShare = async (postId: number) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this basketball post on Clinch",
          text: posts.find((p) => p.id === postId)?.content,
          url: window.location.href,
        });
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return { ...post, shares: post.shares + 1 };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                user: "Gilad_Bre",
                text: newComment,
                userImage: "/placeholder.svg?height=40&width=40", // Replace with current user's image
              },
            ],
          };
        }
        return post;
      })
    );
    setNewComment("");
  };

  const handlePostClick = (postId: number) => {
    setSelectedPost(postId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="bg-[#7A3DB8] text-white p-4 text-center flex justify-center">
        <h1 className="text-xl font-bold">Basketball</h1>
      </header>

      <ScrollArea className="flex-grow">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos">Media</TabsTrigger>
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
          </TabsList>
          <TabsContent value="videos" className="mt-2">
            <div className="p-4 space-y-4">
              {posts
                .filter((post) => post.type === "video")
                .map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white rounded-lg shadow cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            style={{ objectFit: "cover" }} // Add this line
                            src={post.authorAvatar}
                            alt={post.author}
                          />
                          <AvatarFallback>
                            {post.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-semibold">
                          {post.author}
                        </span>
                      </div>
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt="Post content"
                          className="w-full h-[200px] object-cover"
                        />
                      </div>
                      <p className="mb-2">{post.content}</p>
                      <div className="flex justify-between text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          className={post.userLiked ? "text-[#7A3DB8]" : ""}
                        >
                          <Heart
                            className={`h-5 w-5 mr-1 ${
                              post.userLiked ? "fill-current" : ""
                            }`}
                          />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComment(post.id);
                          }}
                        >
                          <MessageCircle className="h-5 w-5 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post.id);
                          }}
                        >
                          <Share2 className="h-5 w-5 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                      {/* Comment input */}
                      {selectedPost === post.id && (
                        <div className="mt-4">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full border rounded p-2"
                          />
                          <Button
                            onClick={() => {
                              handleAddComment(post.id);
                            }}
                            className="mt-2"
                          >
                            Post Comment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="tweets" className="mt-2">
            <div className="p-4 space-y-4">
              {posts
                .filter((post) => post.type === "tweet")
                .map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white rounded-lg shadow cursor-pointer"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            style={{ objectFit: "cover" }} // Add this line
                            src={post.authorAvatar}
                            alt={post.author}
                          />
                          <AvatarFallback>
                            {post.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-semibold">
                          {post.author}
                        </span>
                      </div>
                      <p className="mb-2">{post.content}</p>
                      <div className="flex justify-between text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          className={post.userLiked ? "text-[#7A3DB8]" : ""}
                        >
                          <Heart
                            className={`h-5 w-5 mr-1 ${
                              post.userLiked ? "fill-current" : ""
                            }`}
                          />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComment(post.id);
                          }}
                        >
                          <MessageCircle className="h-5 w-5 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post.id);
                          }}
                        >
                          <Share2 className="h-5 w-5 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-300">
        <div className="flex justify-around py-2">
          <Link to="/main">
            <Button variant="ghost" size="icon">
              <Home className="h-6 w-6 text-[#7A3DB8]" />
            </Button>
          </Link>
          <Link to="/discover">
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6 text-[#7A3DB8]" />
            </Button>
          </Link>
          <Link to="/workout">
            <Button variant="ghost" size="icon">
              <Dumbbell className="h-6 w-6 text-[#7A3DB8]" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-[#7A3DB8]" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Post Dialog */}
      <Dialog
        open={selectedPost !== null}
        onOpenChange={() => setSelectedPost(null)}
      >
        <DialogContent className="sm:max-w-[90%] sm:h-[90%] p-0">
          {selectedPost !== null && (
            <PostPage
              post={posts.find((p) => p.id === selectedPost)!}
              onUpdatePost={(updatedPost) => {
                setPosts(
                  posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
                );
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
