import { SimpleDirectoryReader, PapaCSVReader } from "llamaindex";

export const DATA_DIR = "./data";

export async function getDocuments() {
  const papaCSVReader = await new PapaCSVReader();

  return await new SimpleDirectoryReader().loadData({
    directoryPath: DATA_DIR,
    defaultReader: papaCSVReader,
  });
}
