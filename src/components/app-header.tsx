"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

type AppHeaderProps = {
  title: string;
  description?: string;
};

export default function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <div className="flex items-center gap-4">
       <SidebarTrigger className="flex md:hidden" />
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
