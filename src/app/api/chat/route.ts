import { ChatXAI } from "@langchain/xai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";

// Initialize xAI chat model using official LangChain integration
const initChatModel = () => {
  return new ChatXAI({
    model: "grok-4-1-fast-non-reasoning", // xAI's Grok model
    temperature: 0.7,
    maxRetries: 2,
    // API key is automatically loaded from XAI_API_KEY environment variable
  });
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json(
        { error: "XAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const chatModel = initChatModel();

    // System prompt for Hometown Connect assistant
    const systemPrompt = new SystemMessage(
      `You are a helpful assistant for Hometown Connect, a government services platform. 
      You help citizens with:
      - Information about government schemes and programs
      - Utility schedules (electricity, water supply)
      - Filing complaints and grievances
      - Connecting with government officials
      - General civic information
      
      Be helpful, concise, and professional. If users want to file a complaint, 
      guide them through the process and ask for necessary details.`
    );

    // Convert messages to LangChain format
    const langchainMessages = [
      systemPrompt,
      ...messages.map((msg: any) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content)
      ),
    ];

    // Get response from xAI
    const response = await chatModel.invoke(langchainMessages);

    return NextResponse.json({
      message: response.content,
      success: true,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to get response from chatbot",
        success: false 
      },
      { status: 500 }
    );
  }
}
