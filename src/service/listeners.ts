import type {
  UpsertCollectionMessage,
  ResponseWrapper,
  ResponseError,
  MessageWrapper,
} from "./types";
import { collections } from "./models";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", async (event) => {
  const messageWrapper = JSON.parse(event.data) as MessageWrapper;
  const message = messageWrapper.message;

  const sendResponse = <D>(data: D) => {
    const responseWrapper: ResponseWrapper<D> = {
      id: messageWrapper.id,
      data,
    };
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(JSON.stringify(responseWrapper));
  };

  const sendError = (error: ResponseError) => {
    const responseWrapper: ResponseWrapper = {
      id: messageWrapper.id,
      error,
    };
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(JSON.stringify(responseWrapper));
  }

  try {
    switch (message.type) {
      case "collections:upsert": {
        const { collection } = (message as UpsertCollectionMessage).data;
        return sendResponse(await collections.upsert(collection));
      }
    }
  } catch (e) {
    sendError({ code: 'GENERIC', message: (e as Error).message });
  }
});
