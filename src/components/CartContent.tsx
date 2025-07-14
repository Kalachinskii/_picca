import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/img/empty-cart.png";
import { addItem, deleteItem } from "../store/slices/cartSlice";
import { RootState } from "../store";

export function CartContent() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // костылики
  const types = ["тонкое", "традиционное"];
  const sizes = [26, 30, 40];

  return cart.length == 0 ? (
    <div className="cart cart--empty">
      <h2>Корзина пуста</h2>
      <p>
        Вероятнее всего, вы не заказывали еще пиццу.
        <br />
        Для заказа перейдите на главную страницу
      </p>
      <img src={emptyCart} alt="картинка корзина-пуста" />
    </div>
  ) : (
    cart.map((item) =>
      item.detaild.map((detailsItem) =>
        detailsItem.size.map((sizesItem) => (
          <div
            className="cart__item"
            key={`${item.id}-${detailsItem.type}-${sizesItem.size}`}
          >
            <div className="cart__item-img">
              <img
                className="pizza-block__image"
                src={item.imageUrl}
                alt="Pizza"
              />
            </div>
            <div className="cart__item-info">
              <h3>{item.title}</h3>
              <p>
                {types[detailsItem.type] + " тесто, "}
                {sizes[sizesItem.size]} см.
              </p>
            </div>
            <div className="cart__item-count">
              <div
                onClick={() =>
                  dispatch(
                    deleteItem({
                      id: item.id,
                      imageUrl: item.imageUrl,
                      title: item.title,
                      price: item.price,
                      activeSize: sizesItem.size,
                      activeType: detailsItem.type,
                    })
                  )
                }
                className="button button--outline button--circle cart__item-count-minus"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  />
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  />
                </svg>
              </div>
              <b>{sizesItem.qty}</b>
              <div
                onClick={() =>
                  dispatch(
                    addItem({
                      id: item.id,
                      imageUrl: item.imageUrl,
                      title: item.title,
                      price: item.price,
                      activeSize: sizesItem.size,
                      activeType: detailsItem.type,
                    })
                  )
                }
                className="button button--outline button--circle cart__item-count-plus"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  />
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  />
                </svg>
              </div>
            </div>
            <div className="cart__item-price">
              <b>{item.price * sizesItem.qty} ₽</b>
            </div>
            <div className="cart__item-remove">
              <div className="button button--outline button--circle">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  />
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))
      )
    )
  );
}
