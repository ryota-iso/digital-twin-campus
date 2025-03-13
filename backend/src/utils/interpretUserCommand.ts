import { ChatCompletionRequestMessage } from 'openai';
import { ChatGPT } from '../lib/chatGPT';

export async function interpretUserCommand(chatMessage: string) {
  const prompt: ChatCompletionRequestMessage = {
    role: 'user',
    content: chatMessage
  };

  const response = await ChatGPT.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    messages: [prompt],
    function_call: 'auto',
    functions: [
      {
        name: 'getRouteMap',
        description:
          'Set your current location and destination and determine the appropriate course of action.',
        parameters: {
          type: 'object',
          properties: {
            destination: {
              type: 'string',
              description: 'User Destination'
            }
          },
          required: ['destination']
        }
      },
      {
        name: 'listMapInfo',
        description: 'Retrieve the necessary information from the map information.',
        parameters: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              description: 'Filtering Target'
            }
          },
          required: ['target']
        }
      },
      {
        name: 'otherOrder',
        description: 'Other orders that cannot be handled by the above functions.',
        parameters: {
          type: 'object',
          properties: {
            orderProposal: {
              type: 'string',
              description: 'Suggest relevant potential wayfinding questions in Japanese.'
            }
          },
          required: ['orderProposal']
        }
      }
    ]
  });

  return response.data.choices[0].message?.function_call?.name || 'otherOrder';
}
