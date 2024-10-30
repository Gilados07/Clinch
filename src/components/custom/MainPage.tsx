"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Dumbbell,
  Heart,
  MessageCircle,
  Share2,
  Home,
  Search,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface Comment {
  id: number;
  user: string;
  text: string;
  userImage: string;
}

interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  comments: Comment[];
  shares: number;
  image?: string;
  type: "image" | "tweet";
  userLiked?: boolean;
}

export default function MainPage() {
  const stories = [
    { id: 1, user: "Diga_B", image: "/images/firstPicDiga.jpg" },
    { id: 2, user: "BobbyGreyy", image: "/images/img1.jpeg" },
    { id: 3, user: "Daneilos", image: "/images/secPic.jpg" },
    { id: 4, user: "Natalie Fit", image: "/images/girlsIMG.jpg" },
    { id: 5, user: "EmilyBrown", image: "/images/girlsIMG2.jpg" },
    { id: 6, user: "GiladB", image: "/images/giladPic.jpg" },
    { id: 7, user: "BigAdam", image: "/images/img2.jpg" },
    { id: 8, user: "NaomiGG", image: "/images/img3.jpg" },
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "GiladB",
      content: "Just finished a great workout! 💪",
      likes: 15,
      comments: [
        {
          id: 1,
          user: "JaneSmith",
          text: "Looking strong! 💪",
          userImage: "/images/img1.jpeg",
        },
        {
          id: 2,
          user: "Diga_B",
          text: "Keep it up! 🔥",
          userImage: "/images/firstPicDiga.jpg",
        },
      ],
      shares: 2,
      image: "/images/giladPic.jpg",
      type: "image",
      userLiked: false,
    },
    {
      id: 2,
      user: "JaneSmith",
      content: "New personal best in deadlift! 🏋️‍♀️ #fitness #goals",
      likes: 20,
      comments: [],
      shares: 1,
      type: "tweet",
      userLiked: false,
    },
    {
      id: 3,
      user: "Diga_B",
      content: "WHO COMES NEXT?🔥",
      likes: 18,
      comments: [],
      shares: 3,
      image: "/images/firstPicDiga.jpg",
      type: "image",
      userLiked: false,
    },
    {
      id: 4,
      user: "EmilyBrown",
      content: "Yoga session complete. Feeling zen! 🧘‍♀️ #mindfulness",
      likes: 25,
      comments: [],
      shares: 5,
      type: "tweet",
      userLiked: false,
    },
    {
      id: 5,
      user: "ChrisLee",
      content: "Game day! Lets go TIGERS! 🏀🏆",
      likes: 30,
      comments: [],
      shares: 6,
      image: "/images/footballCol.jpg",
      type: "image",
      userLiked: false,
    },
    {
      id: 6,
      user: "NBA",
      content: "Who is YOUR 2024 Kia MVP? #MVP #KiaMVP",
      likes: 30,
      comments: [],
      shares: 6,
      image: "/images/NikolaAndDoncic.jpg",
      type: "image",
      userLiked: false,
    },
    {
      id: 7,
      user: "Faze_Rakon",
      content: "GG to me 🏆",
      likes: 120,
      comments: [],
      shares: 6,
      image: "/images/img4.jpg",
      type: "image",
      userLiked: false,
    },
  ]);

  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  //   const [progress, setProgress] = useState(0);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleStoryClick = (index: number) => {
    setSelectedStory(index);
    setCurrentStoryIndex(index);
    // setProgress(0);
  };

  const handleStoryClose = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    // setProgress(0);
  };

  const handleNextStory = () => {
    if (selectedStory !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      //   setProgress(0);
    } else {
      handleStoryClose();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      //   setProgress(0);
    }
  };

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
          title: "Check out this post on Clinch",
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
                user: "CurrentUser",
                text: newComment,
                userImage: "/images/giladPic.jpg", // Replace with current user's image
              },
            ],
          };
        }
        return post;
      })
    );
    setNewComment("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <header className="bg-[#7A3DB8] text-white p-4 text-center flex justify-center">
        <h1 className="text-xl font-bold">Clinch</h1>
      </header>

      <ScrollArea className="flex-grow">
        {/* Stories Section */}
        <div className="p-4">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                className="flex-shrink-0 cursor-pointer"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStoryClick(index)}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#7A3DB8]">
                  <img
                    src={story.image}
                    alt={story.user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-center mt-1">{story.user}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="p-4 space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white rounded-lg shadow">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.image} alt={post.user} />
                    <AvatarFallback>
                      {post.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 font-semibold">{post.user}</span>
                </div>
                {post.type === "image" && (
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                )}
                <p className="mb-2">{post.content}</p>
                <div className="flex justify-between text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
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
                    onClick={() => handleComment(post.id)}
                  >
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {post.comments.length}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 className="h-5 w-5 mr-1" />
                    {post.shares}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Story Viewer Dialog */}
      <Dialog
        open={selectedStory !== null}
        onOpenChange={() => handleStoryClose()}
      >
        <DialogContent className="max-w-full h-full p-0 m-0 bg-black">
          <div className="relative h-full">
            {/* Close Button */}
            <button
              onClick={handleStoryClose}
              className="absolute top-4 right-4 z-50 text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Story Content */}
            <AnimatePresence mode="wait">
              {selectedStory !== null && (
                <motion.div
                  key={currentStoryIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="h-full relative"
                >
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
                    {stories.map((_, index) => (
                      <div
                        key={index}
                        className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
                      >
                        {index === currentStoryIndex && (
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            onAnimationComplete={handleNextStory}
                          />
                        )}
                        {index < currentStoryIndex && (
                          <div className="h-full w-full bg-white" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="absolute top-8 left-4 z-50 flex items-center">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={stories[currentStoryIndex].image} />
                      <AvatarFallback>
                        {stories[currentStoryIndex].user
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-white font-semibold">
                      {stories[currentStoryIndex].user}
                    </span>
                  </div>

                  {/* Story Image */}
                  <img
                    src={stories[currentStoryIndex].image}
                    alt={stories[currentStoryIndex].user}
                    className="h-full w-full object-contain"
                  />

                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevStory}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2"
                    style={{
                      display: currentStoryIndex === 0 ? "none" : "block",
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={handleNextStory}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>

                  {/* Touch Areas */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full" onClick={handlePrevStory} />
                    <div className="w-1/2 h-full" onClick={handleNextStory} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comments Dialog  */}
      <Dialog
        open={selectedPost !== null}
        onOpenChange={() => setSelectedPost(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <div className="max-h-[60vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {selectedPost !== null &&
                posts
                  .find((p) => p.id === selectedPost)
                  ?.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.userImage}
                          alt={comment.user}
                        />
                        <AvatarFallback>
                          {comment.user.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{comment.user}</p>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={() => selectedPost && handleAddComment(selectedPost)}
              className="bg-[#7A3DB8] hover:bg-[#7A3DB8]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      {/* <nav className="mt-auto flex justify-around p-4 bg-white border-t">
        <Link to="/main" className="flex flex-col items-center">
          <Button variant="ghost" className="flex flex-col items-center">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
        </Link>
        <Link to="/discover" className="flex flex-col items-center">
          <Button variant="ghost" className="flex flex-col items-center">
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Discover</span>
          </Button>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <Button variant="ghost" className="flex flex-col items-center">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </Link>
      </nav> */}
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <div className="flex justify-around py-2">
          <Link to="/main">
            <Home className="h-6 w-6 text-[#7A3DB8]" />
          </Link>
          <Link to="/search">
            <Search className="h-6 w-6 text-[#7A3DB8]" />
          </Link>
          <Link to="/workout">
            <Dumbbell className="h-6 w-6 text-[#7A3DB8]" />
          </Link>
          <Link to="/profile">
            <User className="h-6 w-6 text-[#7A3DB8]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
