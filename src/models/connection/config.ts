export const loadConfig = (host: string, port: number | string) => {
  port = Number.parseInt(`${port}`);

  const scheme = "socks5",
    mode = "fixed_servers";

  if (!Number.isInteger(port) || port <= 0)
    throw new Error("Invalid port provided");

  return {
    mode,
    rules: {
      proxyForHttp: { scheme, host, port },
      proxyForHttps: { scheme, host, port },
    },
  } as const;
};
