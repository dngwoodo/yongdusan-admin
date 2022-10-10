export async function setupMocks() {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    import("./mswWorker").then(({ mswWorker }) => {
      mswWorker.start();
    });

    return;
  }

  import("./mswServer").then(({ mswServer }) => {
    mswServer.listen();
  });
}
