import AppHeader from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topics } from "@/lib/topics";
import { CheckCircle2 } from "lucide-react";

// Mock data for earned badges
const earnedBadges = ["cooking-basics", "budgeting", "digital-safety"];

export default function AchievementsPage() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        title="Achievements"
        description="Check out all the cool badges you can earn!"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((topic) => {
          const isEarned = earnedBadges.includes(topic.slug);
          return (
            <Card
              key={topic.slug}
              className={`transition-all ${
                isEarned ? "border-primary/80 shadow-lg" : "opacity-60"
              }`}
            >
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-headline text-lg">
                  {topic.title}
                </CardTitle>
                {isEarned && (
                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Earned
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 text-center">
                <div
                  className={`rounded-full p-4 transition-all ${
                    isEarned ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  <topic.icon
                    className={`h-16 w-16 transition-colors ${
                      isEarned ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {isEarned
                    ? "You've mastered this skill!"
                    : "Complete the lesson to earn this badge."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
