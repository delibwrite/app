import * as matter from "gray-matter";
import { ListModelItem, ModelType } from "../types";

const parseMatter = matter.default;

export default abstract class Model {
  private directoryHandle: FileSystemDirectoryHandle | null = null;

  protected abstract getType(): string;

  private async getDirectoryHandle(): Promise<FileSystemDirectoryHandle> {
    if (!this.directoryHandle) {
      const opfsRoot = await navigator.storage.getDirectory();
      this.directoryHandle = await opfsRoot.getDirectoryHandle(this.getType(), {
        create: true,
      });
    }

    return this.directoryHandle;
  }

  private async getFileHandle(id: string): Promise<FileSystemFileHandle> {
    const directoryHandle = await this.getDirectoryHandle();
    return await directoryHandle.getFileHandle(`${id}.md`, { create: true });
  }

  protected async load<M extends ModelType>(id: string): Promise<M> {
    const fileHandle = await this.getFileHandle(id);
    const file = await fileHandle.getFile();
    const fileContent = await file.text();
    const { data: attributes, content } = parseMatter(fileContent);

    return {
      type: attributes.type,
      schemaVersion: attributes.schemaVersion,
      data: attributes.data,
      content,
    } as M;
  }

  protected async listAll<M extends ModelType>(): Promise<ListModelItem<M>[]> {
    const directoryHandle = await this.getDirectoryHandle();
    // @ts-ignore
    const fileHandles = await directoryHandle.values();
    const models: Omit<M, 'content'>[] = [];

    for await (const fileHandle of fileHandles) {
      const file = await fileHandle.getFile();
      const fileContent = await file.text();
      const { data: attributes } = parseMatter(fileContent);

      models.push({
        type: attributes.type,
        schemaVersion: attributes.schemaVersion,
        data: attributes.data,
      } as Omit<M, 'content'>);
    }

    return models;
  }

  protected async persist(model: ModelType) {
    const fileHandle = await this.getFileHandle(model.data.id);
    const fileWriter = await fileHandle.createWritable();
    const { type, schemaVersion, data, content } = model;

    const fileContent = matter.stringify(content, {
      type,
      schemaVersion,
      data,
    });

    await fileWriter.write(fileContent);
    await fileWriter.close();
  }
}
