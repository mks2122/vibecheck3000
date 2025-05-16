// utils/llmUtil.ts
import { Groq } from 'groq-sdk';


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Make sure to set this in your .env
});

/**
 * Generalized LLM Query Utility
 * 
 * @param {string} systemPrompt - Instructional context for the LLM
 * @param {string} userInput - The user's message or question
 * @param {Object} options - Optional overrides (e.g., streaming, temperature, etc.)
 * @returns {Promise<string>} - Cleaned LLM response
 */
export async function queryLLM(
  systemPrompt: string,
  userInput: string,
  options?: {
    stream?: boolean;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    model?: string;
  }
): Promise<string> {
  const {
    stream = false,
    temperature = 1,
    maxTokens = 1024,
    topP = 1,
    model = 'meta-llama/llama-4-scout-17b-16e-instruct',
  } = options || {};

  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userInput,
    },
  ];

  if (stream) {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_completion_tokens: maxTokens,
      top_p: topP,
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(content); // Optional logging
      fullResponse += content;
    }

    return fullResponse.trim();
  } else {
    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_completion_tokens: maxTokens,
      top_p: topP,
      stream: false,
    });

    const content = completion.choices?.[0]?.message?.content || '';
    return content.trim();
  }
}
