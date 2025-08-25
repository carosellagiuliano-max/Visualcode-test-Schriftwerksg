import React, { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id: string | number; quantity?: number; [key: string]: any };

type CartContextType = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string | number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(item: CartItem) {
    setItems((s) => {
      const idx = s.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const copy = [...s];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 1) + (item.quantity || 1) };
        return copy;
      }
      return [...s, { ...item, quantity: item.quantity ?? 1 }];
    });
  }

  function remove(id: string | number) {
    setItems((s) => s.filter((i) => i.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default CartContext;
