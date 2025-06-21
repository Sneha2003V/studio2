import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { topics } from "@/lib/topics";
import AppHeader from "@/components/app-header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader title="Dashboard" description="Welcome back! What skills will you master today?" />
      <div>
        <h2 className="text-2xl font-bold font-headline tracking-tight mb-4">
          Choose a Skill to Learn
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topics.map((topic) => (
            <Link href={`/lessons/${topic.slug}`} key={topic.slug} className="group">
              <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary">
                <CardHeader>
                  <div className="mb-4">
                    <topic.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
