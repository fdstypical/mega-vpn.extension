import { css } from "lit";

export const styles = css`
  .main-page {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .main-page .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
    font-size: 4.25rem;
  }

  .main-page .project-name {
    margin: 0.75rem 0rem 0rem;
  }

  .main-page .project-name h1 {
    margin: 0rem;
    font-size: 1.25rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(131.5deg, #0a3fa6 -11.98%, #53d288 88.43%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-page .footer {
    padding-bottom: 10%;
  }
`;
