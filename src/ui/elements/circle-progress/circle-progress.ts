import { LitElement, html } from "lit";
import { styles } from "./styles";
import { Optional } from "@app.types/common";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { Colors } from "./colors.enum";

const INNER_TRACK_WIDTH = 6;
const OUTER_TRACK_WIDTH = 38;
const OFFSET = INNER_TRACK_WIDTH + OUTER_TRACK_WIDTH;

export class CircleProgress extends LitElement {
  public static styles = [styles];

  private declare readonly _size: Optional<number>;
  private declare readonly _progress: Optional<number>;
  private declare readonly _color: Optional<number>;

  public static get properties() {
    return {
      _size: { type: Number, attribute: "size" },
      _color: { type: Number, attribute: "color" },
      _progress: { type: Number, attribute: "progress" },
    };
  }

  public get size(): number {
    return this._size ?? 150;
  }

  public get progress(): number {
    return this._progress ?? 0;
  }

  public get color(): Colors {
    return Colors[Colors[this._color!] as keyof typeof Colors] ?? Colors.Gray;
  }

  protected get classes() {
    const modifier = Colors[this.color].toLowerCase();

    return classMap({
      "circle-progress": true,
      [`circle-progress--${modifier}`]: true,
    });
  }

  protected get styles() {
    return styleMap({
      width: `${this.size}px`,
      height: `${this.size}px`,
    });
  }

  protected get contentStyles() {
    return styleMap({
      width: `${this.size - 2 * OFFSET}px`,
      height: `${this.size - 2 * OFFSET}px`,
    });
  }

  protected get center() {
    return this.size / 2;
  }

  protected get radius() {
    return {
      inner: this.center - OUTER_TRACK_WIDTH - INNER_TRACK_WIDTH / 2,
      outer: (this.size - OUTER_TRACK_WIDTH) / 2,
    };
  }

  protected get dashArray() {
    return {
      inner: 2 * Math.PI * this.radius.inner,
      outer: 2 * Math.PI * this.radius.outer,
    };
  }

  protected get dashOffset() {
    return {
      inner: this.dashArray.inner * ((100 - this.progress) / 100),
      outer: this.dashArray.outer * ((100 - this.progress) / 100),
    };
  }

  protected render(): unknown {
    return html`<div class=${this.classes} style=${this.styles}>
      <svg style=${this.styles}>
        <circle
          class="circle-progress__inner-track"
          fill="transparent"
          cx=${this.center}
          cy=${this.center}
          r=${this.radius.inner}
          stroke-width=${INNER_TRACK_WIDTH}
        />
        <circle
          class="circle-progress__outer-track"
          fill="transparent"
          cx=${this.center}
          cy=${this.center}
          r=${this.radius.outer}
          stroke-width=${OUTER_TRACK_WIDTH}
        />

        <circle
          class="circle-progress__inner-indicator"
          fill="transparent"
          cx=${this.center}
          cy=${this.center}
          r=${this.radius.inner}
          stroke-width=${INNER_TRACK_WIDTH}
          stroke-dasharray=${this.dashArray.inner}
          stroke-dashoffset=${this.dashOffset.inner}
        />
        <circle
          class="circle-progress__outer-indicator"
          fill="transparent"
          cx=${this.center}
          cy=${this.center}
          r=${this.radius.outer}
          stroke-width=${OUTER_TRACK_WIDTH}
          stroke-dasharray=${this.dashArray.outer}
          stroke-dashoffset=${this.dashOffset.outer}
        />
      </svg>

      <div class="circle-progress__content" style=${this.contentStyles}>
        <slot></slot>
      </div>
    </div>`;
  }
}

customElements.define("circle-progress", CircleProgress);
