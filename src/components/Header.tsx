import "./Header.scss";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

export type HeaderProps = {
  title: string;
  content: string;
  image: {
    src: string;
    alt?: string;
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
