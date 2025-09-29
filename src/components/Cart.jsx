import { useCart } from '@/src/context/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { state, dispatch } = useCart();

  return (
    <div className='fixed top-0 right-0 w-80 bg-white shadow-lg p-4 z-50'>
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} (${item.price * item.quantity})
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}>Remove</button>
              <input
                type='number'
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
      <Link href='/checkout'>
        <button disabled={state.items.length === 0}>Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
