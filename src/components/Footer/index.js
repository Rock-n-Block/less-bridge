import React from "react";

import config from "../../config";

import { ReactComponent as LogoFooter } from "../../assets/images/logo-footer.svg";
import { ReactComponent as Twitter } from "../../assets/icons/social/twitter.svg";
import { ReactComponent as Medium } from "../../assets/icons/social/medium.svg";
import { ReactComponent as Telegram } from "../../assets/icons/social/telegram.svg";
import { ReactComponent as Github } from "../../assets/icons/social/github.svg";

import "./style.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <a href="/">
          <LogoFooter />
        </a>
      </div>
      <div className="footer-social">
        <a
          className="footer-social-link"
          target="_blank"
          href={config.links.twitter}
          rel="noreferrer"
        >
          <Twitter />
        </a>
        <a
          className="footer-social-link"
          target="_blank"
          href={config.links.medium}
          rel="noreferrer"
        >
          <Medium />
        </a>
        <a
          className="footer-social-link"
          target="_blank"
          href={config.links.telegram}
          rel="noreferrer"
        >
          <Telegram />
        </a>
        <a
          className="footer-social-link"
          target="_blank"
          href={config.links.github}
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
      <div className="footer-copyright">©2021 less. All rights reserved</div>
    </footer>
  );
}

export default Footer;
