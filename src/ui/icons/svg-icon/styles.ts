import { css } from "lit";

export const styles = css`
  :host {
    display: inline-flex;
  }

  .svg-icon {
    display: inline-flex;
  }

  .svg-icon svg {
    font-size: inherit;
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

  .svg-icon--stroked svg {
    fill: unset;
    stroke: currentColor;
  }
`;
