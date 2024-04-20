import { Collection, ListModelItem, PartialCollection } from '../types';
import Model from './Model';

export default class Collections extends Model {
  protected getType(): string {
    return "collections";
  }

  public async list(): Promise<ListModelItem<Collection>[]> {
    return this.listAll();
  }

  public get(id: string): Promise<Collection> {
    return this.load(id);
  }

  public async upsert(partialCollection: PartialCollection): Promise<Collection> {
    const collection: Collection = {
      schemaVersion: 1,
      ...partialCollection
    }
    await this.persist(collection);

    return collection;
  }
}