import { useEffect, useState } from "react";

const Cart = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

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
    classes.cart = "translate-x-full";
  }

  const handleCloseTransition = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, TRANSIT_DURATION);
  };

  return (
    <>
      <div
        className={`z-10 fixed bg-slate-100 h-full max-w-xl w-full leading-5 py-16 px-20 right-0 ${transitionClasses} ${classes.cart}`}
      >
        <div className="mb-10 flex item-center justify-between">
          <span className="text-4x1 font-extrabold block">Cart</span>
          <span className="curson-pointer" onClick={handleCloseTransition}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        className={`fixed w-full h-full ${transitionClasses} ${classes.background}`}
        onClick={handleCloseTransition}
      ></div>
    </>
  );
};

export default Cart;
