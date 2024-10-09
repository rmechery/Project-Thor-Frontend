import { SupabaseClient } from "@supabase/supabase-js";
import { OllamaEmbeddings } from "@langchain/ollama"; // Assuming Ollama provides embeddings
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

export type Metadata = {
  url: string;
  text: string;
  chunk: string;
};

const getMatchesFromEmbeddings = async (
  inquiry: string,
  client: SupabaseClient,
  topK: number
) => {
  // Use Ollama embeddings
  const embeddings = new OllamaEmbeddings({
    model: "llama3.2",  // Specifying Ollama's Llama3.2 model for embeddings
  });

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  try {
    const queryResult = await store.similaritySearch(inquiry, topK);
    return (
      queryResult.map((match) => ({
        ...match,
        metadata: match.metadata as Metadata,
      })) || []
    );
  } catch (e) {
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export { getMatchesFromEmbeddings };
