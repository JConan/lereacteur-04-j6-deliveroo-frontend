import "./Header.scss";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { useState } from "react";
import { ApiResponse } from "../api/backend";

export type HeaderProps = {
  title: string;
  content: string;
  image: {
    src: string;
    alt?: string;
  };
};

export const useHeaderState = () => {
  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);
  return {
    header,
    setHeader: (response: ApiResponse) => {
      setHeader({
        title: response.restaurant.name,
        content: response.restaurant.description,
        image: {
          src: response.restaurant.picture,
          alt: `restaurant : ${response.restaurant.name}`,
        },
      });
    },
  };
};

const Header = ({ title, content, image: { src, alt } }: HeaderProps) => (
  <div className="header">
    <div className="top-bar">
      <Logo className="logo" />
    </div>
    <div className="restaurant-info">
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <img alt={alt} src={src} />
    </div>
  </div>
);

export default Header;
