import { Link } from "react-router-dom";
import styled from "styled-components";
import illustration from "../../assets/images/Vector 1.svg";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-newsletter mobile">
        <input placeholder="Join our newsletter" />
        <button>Subscribe</button>
      </div>

      <ul className="footer-nav">
        <li>
          <Link to="/svg">Icons</Link>
        </li>
        <li>
          <Link to="/">Docs</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/">About Us</Link>
        </li>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/">Testimonials</Link>
        </li>
        <li>
          <Link to="/">FAQ</Link>
        </li>
      </ul>

      <div className="footer-main">
        <div className="footer-branding">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} className="footer-logo-img" alt="Company Logo" />
            </Link>
          </div>

          <div className="footer-separator"></div>

          <div className="footer-social-icons">
            <a href="#">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                  fill="#fff"
                />
                <path
                  d="M4 10V20"
                  stroke="#fff"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 10V20"
                  stroke="#fff"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 15C10 12.24 12.24 10 15 10C17.76 10 20 12.24 20 15V20"
                  stroke="#fff"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_326_20)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.4 13.0021C2.40017 11.3083 2.93342 9.6505 3.93575 8.22763C4.93808 6.80477 6.36691 5.67729 8.05081 4.98049C9.7347 4.2837 11.6021 4.04717 13.429 4.29931C15.2559 4.55144 16.9646 5.28152 18.3501 6.40195C19.7357 7.52237 20.7392 8.98554 21.2402 10.6159C21.7412 12.2462 21.7185 13.9745 21.1748 15.5933C20.6311 17.2121 19.5895 18.6527 18.1749 19.7423C16.7604 20.8318 15.033 21.5239 13.2 21.7356V15.2026H15.6C15.9183 15.2026 16.2235 15.0867 16.4485 14.8803C16.6736 14.674 16.8 14.3941 16.8 14.1024C16.8 13.8106 16.6736 13.5307 16.4485 13.3244C16.2235 13.1181 15.9183 13.0021 15.6 13.0021H13.2V10.8017C13.2 10.5099 13.3264 10.2301 13.5515 10.0237C13.7765 9.81741 14.0817 9.7015 14.4 9.7015H15C15.3183 9.7015 15.6235 9.58558 15.8485 9.37925C16.0736 9.17292 16.2 8.89308 16.2 8.60128C16.2 8.30949 16.0736 8.02964 15.8485 7.82331C15.6235 7.61698 15.3183 7.50107 15 7.50107H14.4C13.4452 7.50107 12.5295 7.84881 11.8544 8.4678C11.1793 9.0868 10.8 9.92633 10.8 10.8017V13.0021H8.4C8.08174 13.0021 7.77652 13.1181 7.55147 13.3244C7.32643 13.5307 7.2 13.8106 7.2 14.1024C7.2 14.3941 7.32643 14.674 7.55147 14.8803C7.77652 15.0867 8.08174 15.2026 8.4 15.2026H10.8V21.7356C8.47994 21.4676 6.34633 20.4325 4.7997 18.8244C3.25308 17.2164 2.39978 15.1461 2.4 13.0021ZM12 24.0043C18.6276 24.0043 24 19.0786 24 13.0021C24 6.92566 18.6276 2 12 2C5.3724 2 0 6.92566 0 13.0021C0 19.0786 5.3724 24.0043 12 24.0043Z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_326_20">
                    <rect width="24" height="24" fill="#fff" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="#">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_326_24)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM0 12C0 5.3725 5.3725 0 12 0C18.6275 0 24 5.3725 24 12C24 18.6275 18.6275 24 12 24C5.3725 24 0 18.6275 0 12Z"
                    fill="#fff"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.59148 22.736C9.49482 22.611 9.49482 21.4987 9.59148 19.399C8.55582 19.435 7.90132 19.3632 7.62798 19.1835C7.21848 18.914 6.80798 18.0835 6.44448 17.498C6.08098 16.9125 5.27298 16.82 4.94698 16.689C4.62098 16.5585 4.53898 16.025 5.84548 16.428C7.15198 16.8315 7.21548 17.9305 7.62798 18.187C8.04048 18.444 9.02598 18.332 9.47248 18.126C9.91898 17.92 9.88598 17.154 9.96598 16.8505C10.0665 16.567 9.71148 16.504 9.70398 16.502C9.26748 16.502 6.97698 16.0035 6.34748 13.7855C5.71848 11.567 6.52898 10.117 6.96148 9.49403C7.24948 9.07803 7.22398 8.19236 6.88498 6.83703C8.11698 6.67903 9.06748 7.06669 9.73648 8.00003C9.73748 8.00503 10.6145 7.47853 12 7.47853C13.3855 7.47853 13.8775 7.90753 14.257 8.00003C14.6365 8.09253 14.94 6.36703 17.2835 6.83703C16.794 7.79853 16.3845 9.00003 16.697 9.49403C17.01 9.98753 18.237 11.5575 17.4835 13.7855C16.9805 15.2705 15.9923 16.176 14.519 16.502C14.3503 16.556 14.266 16.643 14.266 16.763C14.266 16.943 14.494 16.9625 14.823 17.806C15.043 18.368 15.059 19.9739 14.871 22.6235C14.3953 22.7445 14.0253 22.8259 13.761 22.8675C13.2925 22.941 12.7835 22.9825 12.2835 22.998C11.7835 23.014 11.61 23.0125 10.9185 22.948C10.4719 22.9072 10.0286 22.8364 9.59148 22.736Z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_326_24">
                    <rect width="24" height="24" fill="#fff" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-newsletter desktop">
          <input placeholder="Join our newsletter" />
          <button>Subscribe</button>
        </div>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100%;
  overflow-x: hidden;
  background-color: #18122a;
  padding: 80px 100px 18px 100px;
  height: fit-content;
  position: relative;
  overflow: hidden;
  background-image: url(${illustration});
  background-repeat: no-repeat;
  background-position: right -3px bottom -3px;

  .footer-logo-img {
    width: 160px;
    height: 160px;
    margin: auto;
    display: block;
  }

  .footer-main {
    display: flex;
    width: 100%;
    margin: auto;
    margin-top: 50px;
  }

  .footer-branding {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: fit-content;

    .footer-separator {
      width: 100%;
      height: 2px;
      background: #fff;
      margin: auto;
      border-radius: 14px;
    }
  }

  .footer-social-icons {
    display: flex;
    gap: 10px;
    width: fit-content;
    margin: auto;

    a:hover svg path {
      fill: #c4c4c4;
    }
    a:nth-child(1):hover svg path {
      fill: none;
      stroke: #c4c4c4;
    }
  }

  .footer-nav {
    display: flex;
    gap: 50px;
    margin: auto;
    width: fit-content;
    align-items: center;
  }

  a {
    color: #c4c4c4;
    font-size: 20px;

    &:hover {
      color: #fff;
    }
  }

  .footer-copy {
    font-size: 20px;
    color: #fff;
    text-align: center;
  }

  .footer-newsletter {
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    margin-left: auto;

    input {
      width: 450px;
      padding: 18px 50px;
      font-size: 20px;
      border-radius: 14px;
      color: #fff;
      border: 2px solid transparent;
      outline: none;
      background-image: linear-gradient(#18122a, #18122a),
        linear-gradient(45deg, #2973ff, #932eff);
      background-origin: border-box;
      background-clip: padding-box, border-box;

      &::placeholder {
        color: #c4c4c4;
      }

      &:focus {
        border: 2px solid transparent;
        outline: none;
        background-image: linear-gradient(#18122a, #18122a),
          linear-gradient(45deg, #1b4ba5, #7c00ff);
        background-origin: border-box;
        background-clip: padding-box, border-box;
      }
    }

    button {
      padding: 18px 30px;
      border-radius: 14px;
      border: none;
      background-color: #fff;
      color: #3333ff;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .footer-newsletter.mobile {
    display: none;
  }

  @media screen and (max-width: 1100px) {
    background-image: none;
    padding: 80px 20px 18px 20px;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 20px !important;
    }
    .footer-newsletter.desktop {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-main {
      gap: 0px;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
    }
  }

  @media screen and (max-width: 660px) {
    background-image: none;
    padding: 30px 20px;

    .footer-nav {
      flex-direction: column;
      gap: 16px;
      margin: auto;
      width: fit-content;
      align-items: center;
    }

    .footer-newsletter.desktop {
      display: none;
    }

    .footer-main {
      margin: 36px auto 20px;
    }

    .footer-newsletter.mobile {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 10px;
      margin: 0 auto 36px;

      input {
        width: 100%;
      }

      button {
        padding: 18px 30px;
        width: 100%;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
`;
