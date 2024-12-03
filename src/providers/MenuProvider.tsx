'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { MenuItemProps } from '@/types/MenuItem';

export interface MenuContextProps {
  menuItems: MenuItemProps[];
  addMenuItem: (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => void;
  editMenuItem: (
    updatedItem: Partial<Omit<MenuItemProps, 'id'>>,
    itemId: string
  ) => void;
  deleteMenuItem: (itemId: string) => void;
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItemProps[]>>;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

  const addMenuItem = (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => {
    const addItem = (items: MenuItemProps[]): MenuItemProps[] =>
      items.map((item) =>
        item.id === parentId
          ? {
              ...item,
              submenu: [...(item.submenu || []), { ...newItem, id: uuidv4() }]
            }
          : {
              ...item,
              submenu: item.submenu ? addItem(item.submenu) : []
            }
      );

    setMenuItems((prev) =>
      parentId === null
        ? [...prev, { ...newItem, id: uuidv4() }]
        : addItem(prev)
    );
  };

  const editMenuItem = (
    updatedItem: Partial<Omit<MenuItemProps, 'id'>>,
    itemId: string
  ) => {
    const updateItem = (items: MenuItemProps[]): MenuItemProps[] =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, ...updatedItem }
          : {
              ...item,
              submenu: item.submenu ? updateItem(item.submenu) : []
            }
      );

    setMenuItems((prev) => updateItem(prev));
  };

  const deleteMenuItem = (itemId: string) => {
    const removeItem = (items: MenuItemProps[]): MenuItemProps[] =>
      items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          ...item,
          submenu: item.submenu ? removeItem(item.submenu) : []
        }));

    setMenuItems((prev) => removeItem(prev));
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        setMenuItems
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
