import { useEffect, useState } from "react";
import ProductQuantity from "./ProductQuantity";
import { useCart } from "./CartContext";

const Cart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { items, handleAdjustItemQuant, handleRemoveItemFromCart, toggleCart } =
    useCart();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 0);
  }, []);

  const TRANSIT_DURATION = 300;
  const transitionClasses = `transition-all duration-${TRANSIT_DURATION}`;

  let classes = { cart: "", background: "" };

  if (isVisible) {
    classes.cart = "translate-x-0";
    classes.background = "bg-black/70 backdrop-blur-sm";
  } else {
    classes.cart = "translate-x-full invisible";
  }

  const handleCloseTransition = () => {
    setIsVisible(false);
    setTimeout(() => {
      toggleCart();
    }, TRANSIT_DURATION);
  };

  const subtotal = items
    .reduce((total, curr) => {
      total += curr.regularPrice * curr.quantity;
      return total;
    }, 0)
    .toFixed(2);

  return (
    <>
      <div
        className={`z-[1000] fixed bg-white h-full w-full leading-5 right-0 overflow-y-auto text-sm max-w-xl flex flex-col py-10 ${transitionClasses} ${classes.cart}`}
      >
        <div className="px-16 grow">
          <div className="mb-12 flex justify-between items-start">
            <div>
              <span className="text-3xl font-bold tracking-tighter mr-5 font-headings">
                Cart
              </span>
            </div>
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleCloseTransition}
              aria-label="close"
              title="close"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div>
            <ul>
              {items.map((item) => (
                <li key={item.sku} className="flex gap-8 mb-8">
                  <div className="shrink-0 bg-white">
                    <img
                      src={item.image}
                      className="w-24 max-w-full h-24 object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-y-6">
                    <div className="flex gap-x-3 items-start">
                      <p
                        className="leading-4 font-medium"
                        data-testid="itemTitle"
                      >
                        {item.name}
                      </p>
                      <button
                        type="button"
                        className="stroke-slate-500"
                        onClick={() => handleRemoveItemFromCart(item.sku)}
                        aria-label="Remove item"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <p className="font-bold text-lg leading-5">
                        ${item.price}
                      </p>
                      <ProductQuantity
                        quantity={item.quantity}
                        onDecrement={() =>
                          handleAdjustItemQuant(
                            item.sku,
                            item.quantity,
                            "decrement",
                          )
                        }
                        onIncrement={() =>
                          handleAdjustItemQuant(
                            item.sku,
                            item.quantity,
                            "increment",
                          )
                        }
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="px-16">
            <div className="text-base flex justify-between pb-6 items-center">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold text-lg" data-testid="subtotal">
                $ {subtotal}
              </span>
            </div>

            <div>
              <a
                href="#"
                className="py-4 px-8 font-bold rounded-full uppercase border-2 border-black shadow-[7px_8px_0px_5px_black] mb-3 w-full text-base flex justify-center gap-x-2 duration-200 hover:bg-shiny-yellow"
                aria-label="checkout"
              >
                <span>CHECKOUT</span>
                <span>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`z-[999] fixed w-full h-full ${transitionClasses} ${classes.background}`}
        onClick={handleCloseTransition}
      ></div>
    </>
  );
};

export default Cart;
