import { useBackendApi } from "./api/backend";
import "./App.scss";
import Cart, { useCartState } from "./components/Cart";
import Header, { useHeaderState } from "./components/Header";
import MenuCategories, {
  useMenuCategoriesState,
} from "./components/MenuCategories";
import Spinner from "./components/Spinner";

function App() {
  const backendApiResponse = useBackendApi();

  const header = useHeaderState(backendApiResponse);
  const menuCategories = useMenuCategoriesState(backendApiResponse);
  const cartState = useCartState();

  return (
    <div className="App">
      {backendApiResponse && header ? (
        <>
          <Header {...header!} />
          <div className="content">
            <div className="menu">
              {menuCategories?.map((menuCategories, index) => (
                <MenuCategories
                  key={index}
                  {...menuCategories}
                  onItemClick={cartState.dispatch}
                />
              ))}
            </div>
            <Cart {...cartState} />
          </div>
          <div className="footer">
            <div>
              Made by Johan CHAN with ReactJs
              <a href="https://www.lereacteur.io/">@LeReacteur</a>
              <a href="https://github.com/JConan/lereacteur-exo-react_deliveroo-frontend">
                Github
              </a>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
