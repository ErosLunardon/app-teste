import { useState } from 'react';

const endpoint = "https://bikefacilchatgpt4.openai.azure.com/openai/deployments/gpt-4-1-mini-2025-04-14-ft-2bd8c576b27a4928a2c18d809ddb08b3/chat/completions?api-version=2024-02-15-preview";
const apiKey = "c0d7b931aa684f7fbac906c03dcd7f2e";

const SYSTEM_PROMPT = `
Você é um assistente virtual do app de mobilidade urbana *BikeFácil*.

Seu papel é exclusivamente responder dúvidas sobre:

- Como funciona o aplicativo BikeFácil;
- Cadastro, planos, preços e formas de pagamento (somente cartão de crédito);
- Suporte ao usuário;
- Tipos de bicicletários disponíveis e como instalá-los;
- Bicicletas de hidrogênio oferecidas pela BikeFácil;
- Informações disponíveis no site ou blog oficial da empresa.

⚠️ Limites:
- NÃO invente respostas.
- NÃO mencione parcerias, empresas, produtos ou informações que não estejam nos dados fornecidos durante o treinamento.
- NÃO responda sobre marcas de terceiros como Toyota, Google etc.
- Se a pergunta estiver fora do escopo, responda apenas: "Desculpe, não tenho essa informação."

Responda sempre de forma amigável, objetiva e educada.
`;


export const useChatCompletion = (): { sendMessage: (userMessage: string) => Promise<string>; loading: boolean } => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (userMessage: string): Promise<string> => {
    setLoading(true);
    console.log('Iniciando sendMessage com:', userMessage);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage }
          ],
          max_tokens: 800,
          temperature: 1,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      console.log('Resposta recebida com sucesso');
      return content || 'Desculpe, não entendi.';
    } catch (err: any) {
      console.error('Erro ao chamar Azure API:', err.message);
      return `Erro: ${err.message || 'Erro desconhecido'}`;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
