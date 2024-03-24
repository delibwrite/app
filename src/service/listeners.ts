import type {
  Message,
  UpsertCollectionMessage,
} from "./types";
import { collections } from "./models";

self.addEventListener("message", (event) => {
  const message = JSON.parse(event.data) as Message;

  switch (message.type) {
    case "collections:upsert": {
      const { collection } = (message as UpsertCollectionMessage).data;
      return collections.upsert(collection);
    }
  }
});
