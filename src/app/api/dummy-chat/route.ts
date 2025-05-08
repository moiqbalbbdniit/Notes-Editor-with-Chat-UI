import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  // Mock responses based on prompt
  const responses: Record<string, string> = {
    "hello": "Hello! I'm your AI assistant. How can I help you with this note?",
    "help": "I can help you summarize content, generate ideas, or answer questions about your notes.",
    "summarize": "Here's a summary of your note: [This would be a generated summary in a real implementation]",
    "default": "I'm an AI assistant embedded in your notes. Ask me anything about your content!"
  };
  
  const response = responses[prompt.toLowerCase()] || responses.default;
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ response });
}