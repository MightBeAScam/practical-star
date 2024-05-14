This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Getting Started

First, populate .env with OPENAI_API_KEY

install the dependencies:

```
npm install
```

Second, generate the embeddings of the documents in the `./data` directory:

```
npm run generate
```

EXPECTED RESULT:
- generated cache/doc_store.json
- generated cache/index_store.json
- generated cache/vector_store.json

ACTUAL RESULT:
- Error generating text embeddings:
adRequestError: 400 This model's maximum context length is 8192 tokens, however you requested 29265 tokens (29265 in your prompt; 0 for the completion). Please reduce your prompt; or completion length.
    at Function.generate (/workspaces/workspace/node_modules/.pnpm/openai@4.46.1/node_modules/openai/src/error.ts:70:14)
    at OpenAI.makeStatusError (/workspaces/workspace/node_modules/.pnpm/openai@4.46.1/node_modules/openai/src/core.ts:383:21)
    at OpenAI.makeRequest (/workspaces/workspace/node_modules/.pnpm/openai@4.46.1/node_modules/openai/src/core.ts:446:24)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async OpenAIEmbedding.getOpenAIEmbedding (/workspaces/workspace/node_modules/.pnpm/llamaindex@0.3.10_@notionhq+client@2.2.15_typescript@5.4.5/node_modules/llamaindex/dist/cjs/embeddings/OpenAIEmbedding.js:100:26)
    at async OpenAIEmbedding.getTextEmbeddings (/workspaces/workspace/node_modules/.pnpm/llamaindex@0.3.10_@notionhq+client@2.2.15_typescript@5.4.5/node_modules/llamaindex/dist/cjs/embeddings/OpenAIEmbedding.js:111:16)
    at async batchEmbeddings (/workspaces/workspace/node_modules/.pnpm/llamaindex@0.3.10_@notionhq+client@2.2.15_typescript@5.4.5/node_modules/llamaindex/dist/cjs/embeddings/types.js:61:32)
    at async OpenAIEmbedding.getTextEmbeddingsBatch (/workspaces/workspace/node_modules/.pnpm/llamaindex@0.3.10_@notionhq+client@2.2.15_typescript@5.4.5/node_modules/llamaindex/dist/cjs/embeddings/types.js:43:16)


You can start editing the page by modifying `app/generate.ts`. The page auto-updates as you edit the file.
