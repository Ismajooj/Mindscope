'use server';

/**
 * @fileOverview A student insights AI agent.
 *
 * - generateStudentInsights - A function that handles the student insights generation process.
 * - GenerateStudentInsightsInput - The input type for the generateStudentInsights function.
 * - GenerateStudentInsightsOutput - The return type for the generateStudentInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentInsightsInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  engagementData: z.string().describe('The engagement data of the student.'),
  personalityProfile: z.string().describe('The personality profile of the student.'),
});
export type GenerateStudentInsightsInput = z.infer<typeof GenerateStudentInsightsInputSchema>;

const GenerateStudentInsightsOutputSchema = z.object({
  insight: z.string().describe('The personalized insight for the student.'),
  recommendation: z.string().describe('The recommended action to improve student learning outcomes.'),
});
export type GenerateStudentInsightsOutput = z.infer<typeof GenerateStudentInsightsOutputSchema>;

export async function generateStudentInsights(input: GenerateStudentInsightsInput): Promise<GenerateStudentInsightsOutput> {
  return generateStudentInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentInsightsPrompt',
  input: {schema: GenerateStudentInsightsInputSchema},
  output: {schema: GenerateStudentInsightsOutputSchema},
  prompt: `You are an expert educator specializing in student learning outcomes.

You will use the following information to generate personalized insights and recommend actions to improve student learning outcomes.

Student Name: {{{studentName}}}
Engagement Data: {{{engagementData}}}
Personality Profile: {{{personalityProfile}}}

Based on the student's engagement data and personality profile, provide a personalized insight and a recommended action to improve their learning outcomes.
`,
});

const generateStudentInsightsFlow = ai.defineFlow(
  {
    name: 'generateStudentInsightsFlow',
    inputSchema: GenerateStudentInsightsInputSchema,
    outputSchema: GenerateStudentInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
