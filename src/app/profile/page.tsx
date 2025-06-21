import AppHeader from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { topics } from "@/lib/topics";
import { Award, BarChart, CheckCircle } from "lucide-react";
import Link from "next/link";

// Mock data
const user = {
  name: "Alex",
  avatar: "https://placehold.co/100x100.png",
  xp: 175,
  level: 2,
  xpForNextLevel: 250,
  earnedBadges: ["cooking-basics", "budgeting", "digital-safety"],
};

const earnedBadgesDetails = topics.filter(t => user.earnedBadges.includes(t.slug));

export default function ProfilePage() {
  const progressPercentage = (user.xp / user.xpForNextLevel) * 100;

  return (
    <div className="flex flex-col gap-8">
      <AppHeader title="Your Profile" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4" data-ai-hint="profile picture">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
              <CardDescription>Level {user.level} Learner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-sm font-medium">{user.xp} / {user.xpForNextLevel} XP</p>
                <p className="text-xs text-muted-foreground">To next level</p>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <BarChart className="h-5 w-5" />
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lessons Completed</span>
                    <span className="font-bold">{user.earnedBadges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total XP Earned</span>
                    <span className="font-bold">{user.xp}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Challenges Done</span>
                    <span className="font-bold">12</span>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Award className="h-5 w-5" />
                Your Badges
              </CardTitle>
              <CardDescription>
                You've earned {earnedBadgesDetails.length} out of {topics.length} badges. Keep it up!{" "}
                <Link href="/achievements" className="text-primary hover:underline">View all</Link>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {earnedBadgesDetails.length > 0 ? (
                 <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                 {earnedBadgesDetails.map((badge) => (
                   <div key={badge.slug} className="flex flex-col items-center gap-2 text-center p-4 rounded-lg bg-background hover:bg-muted/50 transition-colors">
                     <div className="rounded-full p-3 bg-primary/20">
                        <badge.icon className="h-10 w-10 text-primary" />
                     </div>
                     <p className="text-sm font-medium">{badge.title}</p>
                   </div>
                 ))}
               </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No badges earned yet.</p>
                    <Link href="/" className="text-primary font-semibold hover:underline">Start a lesson to earn your first badge!</Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
