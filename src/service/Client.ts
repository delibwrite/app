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

  protected sendMessage<M extends Message, R = undefined>(
    message: M,
    { timeout = 30000 }: SendMessageOptions = {}
  ): Promise<R> {
    const messageWrapper = {
      id: uuid(),
      message,
    };

    let responseListener: (event: MessageEvent) => void;

    const result = new Promise<R>((resolve, reject) => {
      responseListener = (event: MessageEvent) => {
        const response = JSON.parse(event.data) as ResponseWrapper<R>;
        if (response.id === messageWrapper.id) {
          this.worker.removeEventListener("message", responseListener);

          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.data);
          }
        }
      };
      this.worker.addEventListener("message", responseListener);
    });

    this.worker.postMessage(JSON.stringify(message));

    return Promise.race([
      result,
      new Promise<R>((_, reject) => {
        setTimeout(() => {
          this.worker.removeEventListener("message", responseListener);
          reject(new Error("Sending message timed out"));
        }, timeout);
      }),
    ]);
  }
}
