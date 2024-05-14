import {
  Ollama,
  OllamaEmbedding,
  OpenAI,
  OpenAIEmbedding,
  Settings,
} from "llamaindex";

export const initSettings = async () => {
  // HINT: you can delete the initialization code for unused model providers
  console.log(`Using '${process.env.MODEL_PROVIDER}' model provider`);

  if (!process.env.MODEL || !process.env.EMBEDDING_MODEL) {
    throw new Error("'MODEL' and 'EMBEDDING_MODEL' env variables must be set.");
  }

  switch (process.env.MODEL_PROVIDER) {
    case "ollama":
      initOllama();
      break;
    default:
      initOpenAI();
      break;
  }

  Settings.chunkSize = process.env.CHUNK_SIZE
    ? parseInt(process.env.CHUNK_SIZE)
    : undefined;
  Settings.chunkOverlap = process.env.CHUNK_OVERLAP
    ? parseInt(process.env.CHUNK_OVERLAP)
    : undefined;

  console.log(`CHUNK_SIZE`, Settings.chunkSize);
  console.log(`CHUNK_OVERLAP`, Settings.chunkOverlap);
  // console.log(`EMBEDDING_MODEL`, process.env.EMBEDDING_MODEL);
  console.log(`EMBEDDING_DIM`, process.env.EMBEDDING_DIM);
};

function initOpenAI() {
  Settings.llm = new OpenAI({
    model: process.env.MODEL ?? "gpt-3.5-turbo",
    maxTokens: process.env.MAX_TOKENS
      ? parseInt(process.env.MAX_TOKENS)
      : undefined,
  });
  Settings.embedModel = new OpenAIEmbedding({
    model: process.env.EMBEDDING_MODEL,
    dimensions: process.env.EMBEDDING_DIM
      ? parseInt(process.env.EMBEDDING_DIM)
      : undefined,
  });
}

function initOllama() {
  if (!process.env.MODEL || !process.env.EMBEDDING_MODEL) {
    throw new Error(
      "Using Ollama as model provider, 'MODEL' and 'EMBEDDING_MODEL' env variables must be set.",
    );
  }
  Settings.llm = new Ollama({
    model: process.env.MODEL ?? "",
  });
  Settings.embedModel = new OllamaEmbedding({
    model: process.env.EMBEDDING_MODEL ?? "",
  });
}
