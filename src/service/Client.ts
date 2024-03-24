import { v4 as uuid } from "uuid";
import { Message, ResponseWrapper } from "./types";

interface SendMessageOptions {
  timeout?: number;
}

export default class Client {
  protected worker: Worker;

  constructor(worker: Worker) {
    this.worker = worker;
  }

  protected sendMessage<M extends Message, R = void>(
    message: M,
    { timeout = 30000 }: SendMessageOptions = {}
  ): Promise<R | undefined> {
    const messageWrapper = {
      id: uuid(),
      message,
    };

    let responseListener: (event: MessageEvent) => void;

    const result = new Promise<R | undefined>((resolve, reject) => {
      responseListener = (event: MessageEvent) => {
        const responseWrapper = JSON.parse(event.data) as ResponseWrapper<R>;
        console.debug(`client:${message.type}:response`, event);

        if (responseWrapper.id === messageWrapper.id) {
          this.worker.removeEventListener("message", responseListener);

          if (responseWrapper.error) {
            reject(new Error(responseWrapper.error.message));
          } else {
            resolve(responseWrapper.data);
          }
        }
      };
      this.worker.addEventListener("message", responseListener);
    });

    console.debug(`client:${message.type}:sending`, messageWrapper)
    this.worker.postMessage(JSON.stringify(messageWrapper));

    return Promise.race([
      result,
      new Promise<R | undefined>((_, reject) => {
        setTimeout(() => {
          this.worker.removeEventListener("message", responseListener);
          reject(new Error("Sending message timed out"));
        }, timeout);
      }),
    ]);
  }
}
