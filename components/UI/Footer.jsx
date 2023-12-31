import React from "react";
import {
  GithubLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo,
  ReadCvLogo,
} from "phosphor-react";
import { socials } from "@/data/data";
const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full px-4 py-6 sm:px-10 text-start ">
      <span>Logger © 2023</span>
      <div className="flex items-center gap-2 ">
        <a href="https://github.com/anurag-327" target="blank">
          <GithubLogo size={25} className="" />
        </a>
        <a href="https://linkedin.com/in/anuragsr327/" target="blank">
          <LinkedinLogo className="" size={25} />
        </a>
        <a href="https://twitter.com/itsAnurag_sri" target="blank">
          <TwitterLogo size={25} className="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
