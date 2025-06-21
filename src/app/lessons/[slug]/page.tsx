import { generateLesson } from "@/ai/flows/generate-lesson";
import AppHeader from "@/components/app-header";
import { getTopicBySlug } from "@/lib/topics";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import LessonInteractive from "@/components/lesson-interactive";
import { Card, CardContent } from "@/components/ui/card";

type LessonPageProps = {
  params: {
    slug: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const lessonData = await generateLesson({
    topic: topic.title,
    age: 16, // Mock age
    location: "New York, USA", // Mock location
    scenarioExamples: topic.scenarioExamples,
  }).catch((error) => {
    console.error("Failed to generate lesson:", error);
    return null;
  });

  if (!lessonData) {
    return (
      <div className="flex flex-col gap-8">
        <AppHeader title={topic.title} />
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Oops! We couldn't generate the lesson right now. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { title, content, quizQuestions, dailyChallenge } = lessonData;

  // Simple content parsing
  const contentSections = content.split('\n\n').filter(section => section.trim() !== '');

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <AppHeader title={title} description={`An AI-powered lesson on ${topic.title}`} />
      
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b pb-2">Lesson Content</h2>
          {contentSections.map((section, index) => {
            const isHeading = section.startsWith('###');
            return (
              <div key={index}>
                {isHeading ? (
                  <h3 className="font-headline text-xl font-semibold mt-4 mb-2">{section.replace('###', '').trim()}</h3>
                ) : (
                  <p className="text-base leading-relaxed text-foreground/80">{section}</p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
      
      <LessonInteractive quizQuestions={quizQuestions} dailyChallenge={dailyChallenge} />
    </div>
  );
}
