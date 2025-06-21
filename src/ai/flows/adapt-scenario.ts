'use server';

/**
 * @fileOverview This file contains a Genkit flow that adapts real-life scenarios used in lessons to be relevant to the user's local context.
 *
 * - adaptScenario - A function that adapts a given scenario to a specific location.
 * - AdaptScenarioInput - The input type for the adaptScenario function.
 * - AdaptScenarioOutput - The return type for the adaptScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptScenarioInputSchema = z.object({
  scenario: z.string().describe('The original real-life scenario.'),
  location: z.string().describe('The user\'s location (e.g., city, state).'),
  age: z.number().describe('The user\'s age.'),
});
export type AdaptScenarioInput = z.infer<typeof AdaptScenarioInputSchema>;

const AdaptScenarioOutputSchema = z.object({
  adaptedScenario: z.string().describe('The adapted real-life scenario, relevant to the user\'s local context.'),
});
export type AdaptScenarioOutput = z.infer<typeof AdaptScenarioOutputSchema>;

export async function adaptScenario(input: AdaptScenarioInput): Promise<AdaptScenarioOutput> {
  return adaptScenarioFlow(input);
}

const adaptScenarioPrompt = ai.definePrompt({
  name: 'adaptScenarioPrompt',
  input: {schema: AdaptScenarioInputSchema},
  output: {schema: AdaptScenarioOutputSchema},
  prompt: `You are an expert at adapting real-life scenarios to be more relevant to teenagers.

  Given the following scenario and the user's location and age, adapt the scenario to be more relevant to their everyday life.
  The adapted scenario should be easily understandable and relatable for a teenager in that location.

  Original Scenario: {{{scenario}}}
  Location: {{{location}}}
  Age: {{{age}}}

  Adapted Scenario:`, // Prompt content here
});

const adaptScenarioFlow = ai.defineFlow(
  {
    name: 'adaptScenarioFlow',
    inputSchema: AdaptScenarioInputSchema,
    outputSchema: AdaptScenarioOutputSchema,
  },
  async input => {
    const {output} = await adaptScenarioPrompt(input);
    return output!;
  }
);
