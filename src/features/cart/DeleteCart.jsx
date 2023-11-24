import React from 'react'
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

export default function DeleteCart({pizzaId}) {
    const dispatch = useDispatch()
    function delelteCart(e) {
      e.preventDefault();
      dispatch(deleteItem(pizzaId));
    }
  return (
    <Button type="small" onClick={delelteCart}>
      Delete
    </Button>
  );
}
