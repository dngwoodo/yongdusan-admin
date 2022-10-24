export async function setupMocks() {
  const isBrowser = typeof window !== "undefined";

  console.log(isBrowser);

  if (isBrowser) {
    const { mswWorker } = await import("./mswWorker");

    await mswWorker.start();

    return;
  }

  const { mswServer } = await import("./mswServer");

  mswServer.listen();
}
