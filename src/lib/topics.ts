import { ChefHat, PiggyBank, Landmark, Briefcase, HeartPulse, Scale, Smile, Shield, Clock, type LucideIcon } from 'lucide-react';

export type Topic = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  scenarioExamples: string;
};

export const topics: Topic[] = [
  {
    slug: 'cooking-basics',
    title: 'Cooking Basics',
    description: 'Learn to cook simple, healthy meals.',
    icon: ChefHat,
    scenarioExamples: 'Making pasta for the first time, trying to bake cookies, preparing a simple breakfast.',
  },
  {
    slug: 'budgeting',
    title: 'Budgeting',
    description: 'Master your money with smart budgeting.',
    icon: PiggyBank,
    scenarioExamples: 'Saving up for a new video game, managing a weekly allowance, planning expenses for a school trip.',
  },
  {
    slug: 'filing-taxes',
    title: 'Filing Taxes',
    description: 'Understand the basics of filing taxes.',
    icon: Landmark,
    scenarioExamples: 'Getting a first part-time job and seeing deductions on a paycheck, learning about W-2 forms.',
  },
  {
    slug: 'job-searching',
    title: 'Job Searching',
    description: 'Find your first job and build your resume.',
    icon: Briefcase,
    scenarioExamples: 'Applying for a summer job at a local cafe, preparing for a job interview, writing a first resume.',
  },
  {
    slug: 'first-aid',
    title: 'First Aid',
    description: 'Know how to respond in emergencies.',
    icon: HeartPulse,
    scenarioExamples: 'Treating a minor cut or scrape, what to do if a friend faints, recognizing signs of an allergic reaction.',
  },
  {
    slug: 'legal-rights',
    title: 'Legal Rights',
    description: 'Understand your rights as a teen.',
    icon: Scale,
    scenarioExamples: 'Knowing rights during a police stop, understanding contracts for a part-time job, cyberbullying laws.',
  },
  {
    slug: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    description: 'Navigate social situations with confidence.',
    icon: Smile,
    scenarioExamples: 'Dealing with a disagreement with a friend, managing stress during exams, giving and receiving feedback.',
  },
  {
    slug: 'digital-safety',
    title: 'Digital Safety',
    description: 'Stay safe and smart in the online world.',
    icon: Shield,
    scenarioExamples: 'Recognizing a phishing email, setting strong passwords, dealing with online trolls.',
  },
  {
    slug: 'time-management',
    title: 'Time Management',
    description: 'Balance school, work, and fun.',
    icon: Clock,
    scenarioExamples: 'Juggling homework and extracurriculars, avoiding procrastination on a big project, planning a study schedule.',
  },
];

export const getTopicBySlug = (slug: string): Topic | undefined => topics.find((t) => t.slug === slug);
