import {
  Collection,
  ListCollectionMessage,
  ListModelItem,
  PartialCollection,
  UpsertCollectionMessage,
} from "../types";
import Client from "./Client";

export default class Collections extends Client {
  public async list() {
    return this.sendMessage<ListCollectionMessage, ListModelItem<Collection>[]>({
      type: "collections:list",
      data: null,
    });
  }

  public async upsert(collection: PartialCollection) {
    return this.sendMessage<UpsertCollectionMessage, Collection>({
      type: "collections:upsert",
      data: {
        collection,
      },
    });
  }
}
