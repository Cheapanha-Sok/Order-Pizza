import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex justify-between items-center gap-4">
          <p>
            <span>{quantity}&times;</span> {name}
          </p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        <p className="text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? 'Loading...' : ingredients.join(',  ')}
        </p>
    </li>
  );
}

export default OrderItem;
