import Collections from "./Collections"

const init = () => {
  const worker = new Worker(new URL("./listeners.ts", import.meta.url))

  return {
    collections: new Collections(worker)
  }
}

export default init;