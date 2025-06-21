'use server';
/**
 * @fileOverview Generates a daily challenge based on a given lesson using AI.
 *
 * - generateDailyChallenge - A function that generates a daily challenge.
 * - GenerateDailyChallengeInput - The input type for the generateDailyChallenge function.
 * - GenerateDailyChallengeOutput - The return type for the generateDailyChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyChallengeInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The content of the lesson for which to generate a daily challenge.'),
  userAge: z.number().describe('The age of the user.'),
  userLocation: z.string().describe('The general location of the user (e.g., city, region).'),
});
export type GenerateDailyChallengeInput = z.infer<typeof GenerateDailyChallengeInputSchema>;

const GenerateDailyChallengeOutputSchema = z.object({
  challenge: z.string().describe('A daily challenge related to the lesson content.'),
});
export type GenerateDailyChallengeOutput = z.infer<typeof GenerateDailyChallengeOutputSchema>;

export async function generateDailyChallenge(input: GenerateDailyChallengeInput): Promise<GenerateDailyChallengeOutput> {
  return generateDailyChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyChallengePrompt',
  input: {schema: GenerateDailyChallengeInputSchema},
  output: {schema: GenerateDailyChallengeOutputSchema},
  prompt: `You are an AI assistant that generates daily challenges for teenagers based on educational lessons.

  Given the following lesson content, user age, and user location, create a single, actionable daily challenge that applies the lesson's principles to real-world situations.

  Lesson Content: {{{lessonContent}}}
  User Age: {{{userAge}}}
  User Location: {{{userLocation}}}

  Daily Challenge:`,
});

const generateDailyChallengeFlow = ai.defineFlow(
  {
    name: 'generateDailyChallengeFlow',
    inputSchema: GenerateDailyChallengeInputSchema,
    outputSchema: GenerateDailyChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
