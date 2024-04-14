import { Optional } from "@app.types/common";
import { loadConfig } from "./config";
import { ConnectionStatus } from "./connection-status.enum";

export interface ClientOptions {
  isReady: boolean;
  status: ConnectionStatus;
}

export class ConnectionClient implements ClientOptions {
  private static config = loadConfig(
    import.meta.env.VITE_PROXY_HOST,
    import.meta.env.VITE_PROXY_PORT
  );

  private proxy: ClientOptions;
  private updater: Optional<() => boolean>;

  constructor() {
    this.proxy = new Proxy<ClientOptions>(
      { isReady: false, status: ConnectionStatus.Disconnected },
      {
        set: (target, prop: keyof ClientOptions, value) => {
          const reflected = Reflect.set(target, prop, value);
          const updated = this.updater?.();
          return reflected && !!updated;
        },
      }
    );
  }

  public get status(): ConnectionStatus {
    return this.proxy.status;
  }

  public get isReady(): boolean {
    return this.proxy.isReady;
  }

  public init(updater: () => boolean): this {
    this.getStatus().then((status) => (this.proxy.status = status));
    this.updater = updater;
    return this;
  }

  public toggle(): Promise<void> {
    if (this.status == ConnectionStatus.Disconnected) return this.connect();
    if (this.status == ConnectionStatus.Connected) return this.disconnect();
    return Promise.reject();
  }

  protected getStatus(): Promise<ConnectionStatus> {
    return new Promise((resolve) =>
      chrome.proxy.settings.get({ incognito: false }, (details) =>
        resolve(
          details.value.mode == "system"
            ? ConnectionStatus.Disconnected
            : ConnectionStatus.Connected
        )
      )
    );
  }

  protected connect(): Promise<void> {
    this.require(
      this.status != ConnectionStatus.Connected,
      "Status is already like this"
    );

    this.require(!!this.updater, "Exec `init(() => boolean)` before connect");

    this.proxy.status = ConnectionStatus.Connecting;

    return new Promise((resolve) =>
      chrome.proxy.settings.set(
        { value: ConnectionClient.config, scope: "regular" },
        () =>
          this.getStatus().then((status) => {
            this.proxy.status = status;
            resolve();
          })
      )
    );
  }

  protected disconnect(): Promise<void> {
    this.require(
      this.status != ConnectionStatus.Disconnected,
      "Status is already like this"
    );

    this.require(
      !!this.updater,
      "Exec `init(() => boolean)` before disconnect"
    );

    this.proxy.status = ConnectionStatus.Disconnecting;

    return new Promise((resolve) => {
      chrome.proxy.settings.set(
        { value: { mode: "system" }, scope: "regular" },
        () =>
          this.getStatus().then((status) => {
            this.proxy.status = status;
            resolve();
          })
      );
    });
  }

  protected require(expression: boolean, msg?: string): void {
    if (!expression) throw new Error(msg ?? "Prerequire failed");
  }
}
