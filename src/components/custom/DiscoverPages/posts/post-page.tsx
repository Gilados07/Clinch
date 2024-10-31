import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

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

interface PostPageProps {
  post: Post;
  onUpdatePost: (updatedPost: Post) => void;
}

export function PostPage({ post, onUpdatePost }: PostPageProps) {
  const [newComment, setNewComment] = useState("");
  const [localPost, setLocalPost] = useState(post);

  const handleLike = () => {
    const updatedPost = {
      ...localPost,
      likes: localPost.userLiked ? localPost.likes - 1 : localPost.likes + 1,
      userLiked: !localPost.userLiked,
    };
    setLocalPost(updatedPost);
    onUpdatePost(updatedPost);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedPost = {
      ...localPost,
      comments: [
        ...localPost.comments,
        {
          id: localPost.comments.length + 1,
          user: "Gilad_Bre",
          text: newComment,
          userImage: "/images/giladPic.jpg", // Replace with current user's image
        },
      ],
    };
    setLocalPost(updatedPost);
    onUpdatePost(updatedPost);
    setNewComment("");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this basketball post on Clinch",
          text: localPost.content,
          url: window.location.href,
        });
        const updatedPost = { ...localPost, shares: localPost.shares + 1 };
        setLocalPost(updatedPost);
        onUpdatePost(updatedPost);
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <Card className="border-0 rounded-none">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage
                  src={localPost.authorAvatar}
                  alt={localPost.author}
                />
                <AvatarFallback>
                  {localPost.author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">{localPost.author}</span>
            </div>
            {/* <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button> */}
          </div>
          {localPost.type === "video" && localPost.thumbnail && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={localPost.thumbnail}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <p className="mb-4">{localPost.content}</p>
          <div className="flex justify-between text-gray-500 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={localPost.userLiked ? "text-[#7A3DB8]" : ""}
            >
              <Heart
                className={`h-5 w-5 mr-1 ${
                  localPost.userLiked ? "fill-current" : ""
                }`}
              />
              {localPost.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-5 w-5 mr-1" />
              {localPost.comments.length}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-5 w-5 mr-1" />
              {localPost.shares}
            </Button>
          </div>
          <div className="space-y-4 mb-4">
            {localPost.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.userImage} alt={comment.user} />
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
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleAddComment}
              className="bg-[#7A3DB8] hover:bg-[#7A3DB8]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
