import "./MenuCategory.scss";

export type MenuCategoryProps = {
  name: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    isPopular?: boolean;
    pictureUrl?: string;
  }>;
};

const MenuCategory = ({ name, items }: MenuCategoryProps) =>
  items.length > 0 ? (
    <div className="menuCategory">
      <h2>{name}</h2>
      {items.map((item, index) => (
        <div key={index} className="menuItem">
          <div>
            <h3>{item.name}</h3>
            {item.description && <p>{item.description}</p>}
            <div>
              <span>{`${item.price.toFixed(2)} €`}</span>
              <span>
                {item.isPopular && (
                  <>
                    <svg
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#ff8000"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Populaire
                  </>
                )}
              </span>
            </div>
          </div>
          {item.pictureUrl && <img src={item.pictureUrl} alt={item.name} />}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
export default MenuCategory;
