export type Data = { id: string } & Record<string, any>;

export interface Model<T extends string, M extends Data> {
  type: T;
  schemaVersion: number;
  data: M;
  content: string;
}

export enum Sharing {
  Private = "private",
  Public = "public",
}

export enum Skills {
  Dialogue = "dialogue",
  Action = "action",
  Character = "character",
  Tone = "tone",
  Setting = "setting",
  Conflict = "conflict",
  Fighting = "fighting",
  Suspense = "suspense",
  SciFi = "sci-fi",
  Fantasy = "fantasy",
  Romance = "romance",
  Horror = "horror",
  Mystery = "mystery",
  Thriller = "thriller",
  Comedy = "comedy",
  Drama = "drama",
  Poetry = "poetry",
  FreeWrite = "free-write",
}

export interface ExerciseData {
  id: string;
  name: string;
}

export type Exercise = Model<"exercise", ExerciseData>;

export interface CollectionData {
  id: string;
  name: string;
  sharing: Sharing;
  skills: (Skills | string)[];
  exercises: string[];
}

export type Collection = Model<"collection", CollectionData>;

export type MessageType = "collections:upsert";

export interface Message {
  type: MessageType;
  data: any;
}

export interface MessageWrapper {
  id: string;
  message: Message;
}

export interface ResponseError {
  code: string;
  message: string;
}

export interface ResponseWrapper<T = void> {
  id: string;
  error?: ResponseError;
  data?: T;
}

export type PartialCollection = Omit<
  Collection,
  "schemaVersion"
>;

export interface UpsertCollectionMessage {
  type: "collections:upsert";
  data: {
    collection: PartialCollection;
  };
}

export type ModelType = Collection | Exercise;