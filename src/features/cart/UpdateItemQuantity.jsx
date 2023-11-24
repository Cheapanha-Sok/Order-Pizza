import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuanity, increaseItemQuantity } from "./cartSlice";

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  function handleIncrease() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecrease() {
    dispatch(decreaseItemQuanity(pizzaId));
  }
  return (
    <div className="flex items-center gap-1 md:gap-4">
      <Button type="round" onClick={handleIncrease}>+
      </Button>
      <span className="text-semibold ">{currentQuantity}</span>
      <Button type="round" onClick={handleDecrease}>-
      </Button>
    </div>
  );
}
