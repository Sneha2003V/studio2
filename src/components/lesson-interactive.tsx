"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronsRight, Award, Flame, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type LessonInteractiveProps = {
  quizQuestions: string[];
  dailyChallenge: string;
};

type Stage = "quiz" | "challenge" | "complete";

export default function LessonInteractive({ quizQuestions, dailyChallenge }: LessonInteractiveProps) {
  const [stage, setStage] = useState<Stage>("quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const { toast } = useToast();

  const totalQuizQuestions = quizQuestions.length;
  const progress = totalQuizQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuizQuestions) * 100 : 0;

  const handleNextQuestion = () => {
    toast({
        title: "Great job!",
        description: "You've reviewed this concept. +10 XP",
    });
    if (currentQuestionIndex < totalQuizQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage("challenge");
    }
  };

  const handleCompleteChallenge = () => {
    setChallengeCompleted(true);
    setStage("complete");
    toast({
        title: "Challenge Complete!",
        description: "Way to apply your skills! +50 XP",
    });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setChallengeCompleted(false);
    setStage("quiz");
  }

  if (stage === "quiz") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Check className="h-6 w-6 text-primary"/>
            Check Your Understanding
          </CardTitle>
          <CardDescription>
            Review these key concepts from the lesson to solidify your knowledge.
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{quizQuestions[currentQuestionIndex]}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNextQuestion} className="ml-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {currentQuestionIndex < totalQuizQuestions - 1 ? "I understand, Next" : "Finish Quiz"}
            <ChevronsRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (stage === "challenge") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Flame className="h-6 w-6 text-accent" />
            Daily Challenge
          </CardTitle>
          <CardDescription>
            Apply what you've learned with this real-world task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{dailyChallenge}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCompleteChallenge} size="lg" className="ml-auto">
            <Check className="mr-2 h-4 w-4" />
            Mark as Complete
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (stage === "complete") {
    return (
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader className="items-center text-center">
                <div className="p-4 bg-background rounded-full mb-4">
                    <Award className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Lesson Complete!</CardTitle>
                <CardDescription>
                    You've mastered the basics. Great work!
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="font-semibold text-lg text-primary">+150 XP</p>
                <p className="text-muted-foreground">You earned a new badge!</p>
            </CardContent>
            <CardFooter className="justify-center">
                <Button onClick={handleRestart} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Review Lesson
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return null;
}
