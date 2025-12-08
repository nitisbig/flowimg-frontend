'use client'

import React, { useState } from 'react';
import { Check, Copy, Terminal, Globe, Server } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// --- Data & Types ---

const API_ENDPOINT = "https://api.flowdira.com/v1/img";

const CODE_EXAMPLES = {
  python: `import requests

url = "${API_ENDPOINT}"
payload = {
    "prompt": "futuristic city with neon lights",
    "size": "1024x1024"
}
headers = {
    "x-key": "YOUR_API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

  nodejs: `const options = {
  method: 'POST',
  headers: {
    'x-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'futuristic city with neon lights',
    size: '1024x1024'
  })
};

fetch('${API_ENDPOINT}', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));`,

  curl: `curl --request POST \\
  --url ${API_ENDPOINT} \\
  -H "x-key: $API_KEY" \\
  --data '{
    "prompt": "futuristic city with neon lights",
    "size": "1024x1024"
  }'`
};

const RESPONSE_EXAMPLE = `{
  "data": {
    "id": "gen_123456789",
    "imgUrl": "https://cdn.flowdira.com/images/gen_123456789.png",
    "rawbase64": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  }
}`;

// --- Helper Components ---

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md border bg-muted/50 font-mono text-sm">
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-background/50 backdrop-blur-sm"
          onClick={onCopy}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};



export default function ApiDocumentation() {
  return (
    <div className="container mx-auto max-w-5xl py-10 space-y-10">
      

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Image Generation API
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Generate high-quality visuals from text prompts programmatically.
        </p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Endpoint</AlertTitle>
        <AlertDescription className="mt-2 flex items-center gap-2 font-mono text-sm">
          <Badge variant="default">POST</Badge>
          <span className="text-muted-foreground">{API_ENDPOINT}</span>
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Left Column: Documentation */}
        <div className="space-y-8">
          
          {/* Authentication */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Authentication
            </h2>
            <Separator />
            <p className="text-muted-foreground">
              Authenticate requests via the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">x-key</code> header.
            </p>
          </section>

          {/* Parameters */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Parameters
            </h2>
            <Separator />
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-bold">prompt</code>
                  <Badge variant="secondary" className="text-xs">String</Badge>
                  <Badge variant="outline" className="text-xs text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  The text description of the image you want to generate. Be specific for better results.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-bold">size</code>
                  <Badge variant="secondary" className="text-xs">String</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Output resolution. Defaults to 1024x1024.
                </p>
              </div>
            </div>
          </section>

          {/* Response Fields */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Response Object
            </h2>
            <Separator />
            <ul className="grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-mono font-medium text-foreground">id</span>
                <span>Unique identifier for the generated asset.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-medium text-foreground">imgUrl</span>
                <span>Public CDN URL to access the image.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-medium text-foreground">rawbase64</span>
                <span>Base64 encoded image data string.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column: Code Playground */}
        <div className="space-y-8">
          
          {/* Request Tabs */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Request
            </h3>
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="nodejs">Node.js</TabsTrigger>
              </TabsList>
              
              <div className="mt-4">
                <TabsContent value="curl">
                  <CodeBlock code={CODE_EXAMPLES.curl} language="bash" />
                </TabsContent>
                <TabsContent value="python">
                  <CodeBlock code={CODE_EXAMPLES.python} language="python" />
                </TabsContent>
                <TabsContent value="nodejs">
                  <CodeBlock code={CODE_EXAMPLES.nodejs} language="javascript" />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Response Card */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Response
            </h3>
            <Card>
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-muted/50 border-b">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">200 OK</span>
                </div>
                <span className="text-xs text-muted-foreground">application/json</span>
              </CardHeader>
              <CardContent className="p-0">
                <CodeBlock code={RESPONSE_EXAMPLE} language="json" />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}