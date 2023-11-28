import { ChatOpenAI } from "langchain/chat_models/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { formatDocumentsAsString } from "langchain/util/document";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

import * as dotenv from "dotenv";
dotenv.config();

const loader = new CSVLoader("src/book_dataset.csv");
const docs = await loader.load();

const model = new ChatOpenAI({
    openAIApiKey: "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",
});

const vectorStore = await HNSWLib.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);
const retriever = vectorStore.asRetriever();

const prompt =
  PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

const chain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocumentsAsString),
    question: new RunnablePassthrough(),
  },
  prompt,
  model,
  new StringOutputParser(),
]);

const result = await chain.invoke("what is the price of how music works?");

console.log(result);
