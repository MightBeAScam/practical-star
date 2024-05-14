import {
  VectorStoreIndex,
  storageContextFromDefaults,
  serviceContextFromDefaults,
  Settings,
} from "llamaindex";

import * as dotenv from "dotenv";

import { getDocuments } from "./loader";
import { initSettings } from "./settings";
import { STORAGE_CACHE_DIR } from "./shared";

// Load environment variables from local .env file
dotenv.config();

async function getRuntime(func: any) {
  const start = Date.now();
  await func();
  const end = Date.now();
  return end - start;
}

async function generateDatasource() {
  console.log(`Generating generateDatasource...`);
  // console.log(`embedModel`, Settings.embedModel);
  console.log(`STORAGE_CACHE_DIR`, STORAGE_CACHE_DIR);

  // Split documents, create embeddings and store them in the storage context
  const ms = await getRuntime(async () => {
    console.log(`Generating serviceContextFromDefaults...`);
    const serviceContext = await serviceContextFromDefaults({
      embedModel: Settings.embedModel,
      chunkSize: Number(process.env.CHUNK_SIZE),
      chunkOverlap: Number(process.env.CHUNK_OVERLAP),
    });
    console.log(`Generating storageContextFromDefaults...`);
    const storageContext = await storageContextFromDefaults({
      persistDir: STORAGE_CACHE_DIR,
    });
    console.log(`getting docutments...`);
    const documents = await getDocuments();
    documents.forEach((doc) => {
      console.log(`document ${doc.id_} loaded`);
    });
    console.log(`Generating VectorStoreIndex.fromDocuments...`);
    await VectorStoreIndex.fromDocuments(documents, {
      storageContext: storageContext,
      serviceContext: serviceContext,
    });
  });
  console.log(`Storage context successfully generated in ${ms / 1000}s.`);
}

(async () => {
  initSettings();
  await generateDatasource();
  console.log("Finished generating storage.");
})();
