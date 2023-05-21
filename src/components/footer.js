import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="footerContainer">
      <div className="quickLinksSection">
        <h2 className="footerTitle">Quick Links</h2>
        <ul className="quickLinksList">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/wishlist">Wishlist</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </div>
      <div className="titleSection">
        <h1 className="footerTitle appName">SilkCraft</h1>
        <p className="tagline">The feeling of luxury</p>
      </div>
      <div className="connectSection">
        <h2 className="footerTitle">Connect with Me</h2>
        <div className="socialIcons">
          <a href="https://github.com/Sanika03">
            <FaGithub className="socialIcon" />
          </a>
          <a href="https://twitter.com/Sanika_0305">
            <FaTwitter className="socialIcon" />
          </a>
          <a href="https://www.linkedin.com/in/sanika-suryawanshi-b17181205/">
            <FaLinkedin className="socialIcon" />
          </a>
          <a href="mailto:sanikasuryawanshi0305@gmail.com">
            <FaEnvelope className="socialIcon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
