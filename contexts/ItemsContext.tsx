import React, {createContext, useState} from 'react';
import {Types} from '../api/types';

type ItemsContextState = [Types | null, (items: Types | null) => void];

const ItemsContext = createContext<ItemsContextState | null>(null);

export function ItemsContextProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState<Types | null>([]);
  const [locks, setLocks] = useState<Types | null>([]);
  const [unlocks, setUnlocks] = useState<Types | null>([]);
  const [dropdowns, setDropdowns] = useState<Types | null>([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalValue, setModalValue] = useState([]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        locks,
        setLocks,
        unlocks,
        setUnlocks,
        dropdowns,
        setDropdowns,
        dropdownItems,
        setDropdownItems,
        index,
        setIndex,
        modalValue,
        setModalValue,
      }}>
      {children}
    </ItemsContext.Provider>
  );
}

export default ItemsContext;
