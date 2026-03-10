import type { Meta, StoryObj } from "@storybook/react";
import CodeExample from "./index";

const meta: Meta<typeof CodeExample> = {
  title: "Components/CodeExample",
  component: CodeExample,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente para exibir exemplos de código com suporte a múltiplas linguagens via tabs. Requer mocks do Docusaurus Tabs para funcionar no Storybook.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título do exemplo de código (opcional)",
    },
    description: {
      control: "text",
      description: "Descrição do exemplo (opcional)",
    },
    defaultTab: {
      control: "text",
      description: "Tab padrão selecionada",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeExample>;

const httpExample = {
  label: "HTTP",
  language: "http",
  code: `POST https://api.z-api.io/instances/{instanceId}/send-text
Client-Token: seu-token
Content-Type: application/json

{
  "phone": "5511999999999",
  "message": "Olá! Esta é uma mensagem de teste."
}`,
};

const curlExample = {
  label: "cURL",
  language: "bash",
  code: `curl -X POST "https://api.z-api.io/instances/{instanceId}/send-text" \\
  -H "Client-Token: seu-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "5511999999999",
    "message": "Olá! Esta é uma mensagem de teste."
  }'`,
};

const jsExample = {
  label: "JavaScript",
  language: "javascript",
  code: `const response = await fetch(
  'https://api.z-api.io/instances/{instanceId}/send-text',
  {
    method: 'POST',
    headers: {
      'Client-Token': 'seu-token',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: '5511999999999',
      message: 'Olá! Esta é uma mensagem de teste.',
    }),
  }
);

const data = await response.json();
console.log(data);`,
};

const pythonExample = {
  label: "Python",
  language: "python",
  code: `import requests

url = "https://api.z-api.io/instances/{instanceId}/send-text"
headers = {
    "Client-Token": "seu-token",
    "Content-Type": "application/json",
}
data = {
    "phone": "5511999999999",
    "message": "Olá! Esta é uma mensagem de teste.",
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
};

export const Default: Story = {
  args: {
    title: "Enviar mensagem de texto",
    description:
      "Exemplo básico de como enviar uma mensagem de texto usando a Z-API",
    snippets: [httpExample, curlExample, jsExample, pythonExample],
    defaultTab: "HTTP",
  },
};

export const SingleSnippet: Story = {
  args: {
    title: "Exemplo simples",
    snippets: [jsExample],
  },
};

export const WithoutTitle: Story = {
  args: {
    snippets: [httpExample, curlExample],
  },
};

export const MultipleLanguages: Story = {
  args: {
    title: "Integração completa",
    description: "Exemplos de integração em diferentes linguagens",
    snippets: [
      httpExample,
      curlExample,
      jsExample,
      pythonExample,
      {
        label: "TypeScript",
        language: "typescript",
        code: `interface SendTextRequest {
  phone: string;
  message: string;
}

async function sendTextMessage(request: SendTextRequest): Promise<Response> {
  return fetch(
    'https://api.z-api.io/instances/{instanceId}/send-text',
    {
      method: 'POST',
      headers: {
        'Client-Token': 'seu-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  );
}`,
      },
    ],
    defaultTab: "TypeScript",
  },
};

export const WithIcons: Story = {
  args: {
    title: "Exemplos com ícones",
    snippets: [
      { ...httpExample, icon: "Send" },
      { ...curlExample, icon: "Terminal" },
      { ...jsExample, icon: "Code" },
      { ...pythonExample, icon: "Cpu" },
    ],
  },
};
