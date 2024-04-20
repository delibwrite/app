const init = () => {
  const worker = new Worker(new URL("./listeners.ts", import.meta.url));

  return {
    worker
  };
};

export default init;
