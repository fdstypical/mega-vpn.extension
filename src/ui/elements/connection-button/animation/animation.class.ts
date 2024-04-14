import { Nullable, Optional } from "@app.types/common";
import { AnimationStatus } from "./status.enum";

export interface AnimationOptions {
  progress: number;
  status: AnimationStatus;
  cancelId: Nullable<number>;
}

export class ConnectionAnimation implements Omit<AnimationOptions, "cancelId"> {
  public static DEFAULT_SPEED = 1;
  public static ENDS_SPEED = 3;

  private proxy: AnimationOptions;
  private updater: Optional<() => boolean>;

  constructor() {
    this.proxy = new Proxy<AnimationOptions>(
      {
        progress: 0,
        cancelId: null,
        status: AnimationStatus.Stopped,
      },
      {
        set: (target, prop: keyof AnimationOptions, value) => {
          const reflected = Reflect.set(target, prop, value);
          const updated = this.updater?.();
          return reflected && !!updated;
        },
      }
    );
  }

  public get status(): AnimationStatus {
    return this.proxy.status;
  }

  public get progress(): number {
    return this.proxy.progress;
  }

  protected get cancelId(): Nullable<number> {
    return this.proxy.cancelId;
  }

  public init(updater: () => boolean): this {
    this.updater = updater;
    return this;
  }

  public run(): void {
    this.require(!!this.updater, "Exec `init(() => boolean)` before run");

    this.require(
      this.status != AnimationStatus.Runs,
      "Animation already running"
    );

    this.proxy.status = AnimationStatus.Runs;
    this.proxy.progress = 0;
    this.proxy.cancelId = requestAnimationFrame(this.anim.bind(this));
  }

  public stop(): void {
    this.require(!!this.cancelId, "Animation can`t be stopped");
    cancelAnimationFrame(this.cancelId!);

    this.proxy.status = AnimationStatus.Stopped;
    this.proxy.progress = 0;
    this.proxy.cancelId = null;
  }

  public end(): void {
    this.proxy.status = AnimationStatus.Ends;
  }

  protected anim(): void {
    this.require(
      ![AnimationStatus.Stopped].includes(this.status),
      "Animation has been stopped"
    );

    this.proxy.progress +=
      this.status == AnimationStatus.Ends
        ? ConnectionAnimation.ENDS_SPEED
        : ConnectionAnimation.DEFAULT_SPEED;

    this.proxy.cancelId = requestAnimationFrame(this.anim.bind(this));
  }

  protected require(expression: boolean, msg?: string): void {
    if (!expression) throw new Error(msg ?? "Prerequire failed");
  }
}
