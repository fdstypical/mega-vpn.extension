import { css } from "lit";

export const styles = css`
  .circle-progress {
    position: relative;
  }

  .circle-progress svg * {
    transition: stroke 0.4s ease;
  }

  .circle-progress--gray .circle-progress__inner-track {
    stroke: var(--circle-progress-inner-track--gray);
  }
  .circle-progress--gray .circle-progress__outer-track {
    stroke: var(--circle-progress-outer-track--gray);
  }
  .circle-progress--gray .circle-progress__inner-indicator {
    stroke: var(--circle-progress-inner-indicator--gray);
  }
  .circle-progress--gray .circle-progress__outer-indicator {
    stroke: var(--circle-progress-outer-indicator--gray);
  }

  .circle-progress--orange .circle-progress__inner-track {
    stroke: var(--circle-progress-inner-track--orange);
  }
  .circle-progress--orange .circle-progress__outer-track {
    stroke: var(--circle-progress-outer-track--orange);
  }
  .circle-progress--orange .circle-progress__inner-indicator {
    stroke: var(--circle-progress-inner-indicator--orange);
  }
  .circle-progress--orange .circle-progress__outer-indicator {
    stroke: var(--circle-progress-outer-indicator--orange);
  }

  .circle-progress--green .circle-progress__inner-track {
    stroke: var(--circle-progress-inner-track--green);
  }
  .circle-progress--green .circle-progress__outer-track {
    stroke: var(--circle-progress-outer-track--green);
  }
  .circle-progress--green .circle-progress__inner-indicator {
    stroke: var(--circle-progress-inner-indicator--green);
  }
  .circle-progress--green .circle-progress__outer-indicator {
    stroke: var(--circle-progress-outer-indicator--green);
  }

  .circle-progress__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;
