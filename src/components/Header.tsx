import "./Header.scss";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { ApiResponse } from "../api/backend";

export type HeaderProps = {
  title: string;
  content: string;
  image: {
    src: string;
    alt?: string;
  };
};

export const useHeaderState = (backendApiResponse: ApiResponse | undefined) => {
  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);
  useEffect(
    () =>
      backendApiResponse &&
      setHeader({
        title: backendApiResponse.restaurant.name,
        content: backendApiResponse.restaurant.description,
        image: {
          src: backendApiResponse.restaurant.picture,
          alt: `restaurant : ${backendApiResponse.restaurant.name}`,
        },
      }),
    [backendApiResponse]
  );
  return header;
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
