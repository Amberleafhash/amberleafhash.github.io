import { Ollama } from "@langchain/ollama";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

// Initialize LLM
const llm = new Ollama({
    model: 'llama3.2', // Default value
});

// Initialize chat history
const chatHistory = new ChatMessageHistory();

export const generateReply = async ({ input_message }) => {

    // Add users message to chat history
    await chatHistory.addMessage(new HumanMessage(input_message));

    // Retrieve full chat history
    const messages = await chatHistory.getMessages();

    // Generate AI response
    const response = await llm.invoke(messages);

    // Store AI response in history
    await chatHistory.addMessage(new AIMessage(response));

    // console.log(response);

    return response;
};