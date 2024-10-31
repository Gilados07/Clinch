import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Search, Dumbbell, User } from "lucide-react";

interface SportCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  path: string;
}

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const sportCategories: SportCategory[] = [
    {
      id: 1,
      name: "Gym",
      icon: "💪",
      color: "bg-red-500",
      path: "/discover/gym",
    },
    {
      id: 2,
      name: "MMA",
      icon: "🥊",
      color: "bg-orange-500",
      path: "/discover/mma",
    },
    {
      id: 3,
      name: "Running",
      icon: "🏃‍♂️",
      color: "bg-yellow-500",
      path: "/discover/running",
    },
    {
      id: 4,
      name: "Yoga",
      icon: "🧘‍♀️",
      color: "bg-green-500",
      path: "/discover/yoga",
    },
    {
      id: 5,
      name: "Football",
      icon: "⚽",
      color: "bg-blue-500",
      path: "/discover/football",
    },
    {
      id: 6,
      name: "Basketball",
      icon: "🏀",
      color: "bg-indigo-500",
      path: "/discover/basketball",
    },
    {
      id: 7,
      name: "Tennis",
      icon: "🎾",
      color: "bg-purple-500",
      path: "/discover/tennis",
    },
    {
      id: 8,
      name: "Swimming",
      icon: "🏊‍♂️",
      color: "bg-pink-500",
      path: "/discover/swimming",
    },
    {
      id: 9,
      name: "Cycling",
      icon: "🚴‍♀️",
      color: "bg-teal-500",
      path: "/discover/cycling",
    },
    {
      id: 10,
      name: "Hiking",
      icon: "🥾",
      color: "bg-lime-500",
      path: "/discover/hiking",
    },
    { id: 11, name: "Dance", icon: "💃", color: "bg-cyan-500", path: "/dance" },
    {
      id: 12,
      name: "Rock Climbing",
      icon: "🧗‍♀️",
      color: "bg-emerald-500",
      path: "/discover/rock-climbing",
    },
  ];

  const filteredCategories = sportCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#7A3DB8] text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Discover Sports</h1>
        <Input
          type="search"
          placeholder="Search sports..."
          className="w-full bg-white text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={category.path}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent
                  className={`flex flex-col items-center justify-center p-6 ${category.color} text-white`}
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
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
    </div>
  );
}
