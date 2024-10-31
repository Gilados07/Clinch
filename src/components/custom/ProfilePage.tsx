"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dumbbell,
  Home,
  Search,
  Settings,
  User,
  ChevronLeft,
} from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  image: string;
  sets: number;
  reps: number;
  description?: string;
}

interface WorkoutRoutine {
  id: number;
  name: string;
  exercises: Exercise[];
  icon: string;
}

export default function ProfilePage() {
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine | null>(
    null
  );

  const workoutRoutines: WorkoutRoutine[] = [
    {
      id: 1,
      name: "Push Day",
      icon: "💪",
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          image: "/images/bench-press.jpg",
          sets: 4,
          reps: 12,
          description: "Flat bench barbell press",
        },
        {
          id: 2,
          name: "Shoulder Press",
          image: "/images/shoulder-press.jpg",
          sets: 3,
          reps: 12,
          description: "Seated dumbbell press",
        },
        {
          id: 3,
          name: "Tricep Extensions",
          image: "/images/tricep-extension.jpg",
          sets: 3,
          reps: 15,
          description: "Rope tricep extensions",
        },
      ],
    },
    {
      id: 2,
      name: "Pull Day",
      icon: "🏋️‍♂️",
      exercises: [
        {
          id: 1,
          name: "Lat Pulldown",
          image: "/images/lat-pulldown.jpg",
          sets: 4,
          reps: 12,
          description: "Wide grip lat pulldown",
        },
        {
          id: 2,
          name: "Barbell Row",
          image: "/images/barbell-row.jpg",
          sets: 3,
          reps: 12,
          description: "Bent over barbell row",
        },
        {
          id: 3,
          name: "Bicep Curls",
          image: "/images/bicep-curl.jpg",
          sets: 3,
          reps: 15,
          description: "Standing dumbbell curls",
        },
      ],
    },
    {
      id: 3,
      name: "Leg Day",
      icon: "🦵",
      exercises: [
        {
          id: 1,
          name: "Squats",
          image: "/images/squat.jpg",
          sets: 4,
          reps: 10,
          description: "Barbell back squats",
        },
        {
          id: 2,
          name: "Romanian Deadlift",
          image: "/images/rdl.jpg",
          sets: 3,
          reps: 12,
          description: "Romanian deadlift with barbell",
        },
        {
          id: 3,
          name: "Leg Press",
          image: "/images/leg-press.jpg",
          sets: 3,
          reps: 15,
          description: "45-degree leg press",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-[#7A3DB8] text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Clinch</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-white">
            <AvatarImage
              src="/images/giladPic.jpg"
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">Gilad B</h2>
            <p className="text-sm opacity-90">Fitness Enthusiast 💪</p>
          </div>
        </div>
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-xl font-bold">152</p>
            <p className="text-sm">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">1.2k</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">890</p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <Button className="bg-[#7A3DB8] hover:bg-[#7A3DB8]/90">
          Edit Profile
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Workout Routines
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80%]">
            {!selectedRoutine ? (
              <>
                <SheetHeader>
                  <SheetTitle>Choose Workout Routine</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {workoutRoutines.map((routine) => (
                    <Card
                      key={routine.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedRoutine(routine)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-4xl mb-2">{routine.icon}</span>
                        <h3 className="font-semibold">{routine.name}</h3>
                        <p className="text-sm text-gray-500">
                          {routine.exercises.length} exercises
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <>
                <SheetHeader className="flex flex-row items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedRoutine(null)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <SheetTitle className="ml-2">
                    {selectedRoutine.name}
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[75vh] mt-6">
                  <div className="space-y-4">
                    {selectedRoutine.exercises.map((exercise) => (
                      <Card key={exercise.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={exercise.image}
                              alt={exercise.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{exercise.name}</h3>
                              <p className="text-sm text-gray-500 mb-2">
                                {exercise.description}
                              </p>
                              <div className="flex gap-4">
                                <div>
                                  <p className="text-sm font-semibold">Sets</p>
                                  <p className="text-2xl font-bold text-[#7A3DB8]">
                                    {exercise.sets}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">Reps</p>
                                  <p className="text-2xl font-bold text-[#7A3DB8]">
                                    {exercise.reps}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Posts Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <img
                src={`/images/posts/post${i + 1}.jpg`}
                alt={`Post ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

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
