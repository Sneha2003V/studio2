// src/ai/flows/generate-lesson.ts
'use server';

/**
 * @fileOverview Generates dynamic lessons on life skills tailored to the user's age and local context.
 *
 * - generateLesson - A function that generates a lesson based on the given topic, age, and location.
 * - GenerateLessonInput - The input type for the generateLesson function.
 * - GenerateLessonOutput - The return type for the generateLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonInputSchema = z.object({
  topic: z.string().describe('The topic of the life skill lesson.'),
  age: z.number().describe('The age of the user.'),
  location: z.string().describe('The location of the user (e.g., city, state, country).'),
  scenarioExamples: z.string().describe('Examples of real-life scenarios to use in the lesson.')
});
export type GenerateLessonInput = z.infer<typeof GenerateLessonInputSchema>;

const GenerateLessonOutputSchema = z.object({
  title: z.string().describe('The title of the lesson.'),
  content: z.string().describe('The content of the lesson, including bite-sized lessons and visual guides.'),
  quizQuestions: z.array(z.string()).describe('A list of quiz questions for the lesson.'),
  dailyChallenge: z.string().describe('A daily actionable challenge related to the lesson.'),
});
export type GenerateLessonOutput = z.infer<typeof GenerateLessonOutputSchema>;


export async function generateLesson(input: GenerateLessonInput): Promise<GenerateLessonOutput> {
  return generateLessonFlow(input);
}

const lessonPrompt = ai.definePrompt({
  name: 'lessonPrompt',
  input: {schema: GenerateLessonInputSchema},
  output: {schema: GenerateLessonOutputSchema},
  prompt: `You are an expert in creating engaging and informative life skills lessons for teenagers.

  Create a lesson on the topic of "{{topic}}" that is tailored for a {{age}}-year-old user in {{location}}.
  The lesson should be easy to understand and relevant to their daily life.  The lessons should:
  - Be split into bite-sized lessons
  - Include clear visual guides where appropriate
  - Provide real-life scenarios, such as the following: {{{scenarioExamples}}}
  - Written in a friendly, teen-focused tone.

  The output should include:
  - A lesson title
  - The lesson content
  - A list of 3-5 quiz questions to test the user's understanding.
  - A daily actionable challenge that applies the lesson to their life.
  Output the response in JSON format.
  `,
});

const generateLessonFlow = ai.defineFlow(
  {
    name: 'generateLessonFlow',
    inputSchema: GenerateLessonInputSchema,
    outputSchema: GenerateLessonOutputSchema,
  },
  async input => {
    const {output} = await lessonPrompt(input);
    return output!;
  }
);
