import { Collection, PartialCollection, UpsertCollectionMessage } from "./types";
import Client from "./Client";

export default class Collections extends Client {
  public async upsert(collection: PartialCollection) {
    return this.sendMessage<UpsertCollectionMessage, Collection>({
      type: "collections:upsert",
      data: {
        collection,
      },
    });
  }
}
