import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import Header, { HeaderProps } from "./components/Header";

type ApiResponse = {
  restaurant: {
    name: string;
    description: string;
    picture: string;
  };
};

function App() {
  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const response = await axios.get<ApiResponse>(
        process.env.REACT_APP_BACKEND_API_URL
      );

      setHeader({
        title: response.data.restaurant.name,
        content: response.data.restaurant.description,
        image: {
          src: response.data.restaurant.picture,
          alt: `restaurant : ${response.data.restaurant.name}`,
        },
      });
    })();
  }, []);

  return (
    <div className="App">
      {header && <Header {...header} />}
      <div className="content"></div>
    </div>
  );
}

export default App;
