import { SetStateAction } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { MenuItemProps } from '@/types/MenuItem';

export const addMenuItem = (
  newItem: Omit<MenuItemProps, 'id'>,
  parentId: string | null,
  setMenuItems: (value: SetStateAction<MenuItemProps[]>) => void
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
    parentId === null ? [...prev, { ...newItem, id: uuidv4() }] : addItem(prev)
  );
};

export const editMenuItem = (
  updatedItem: Partial<Omit<MenuItemProps, 'id'>>,
  itemId: string,
  setMenuItems: (value: SetStateAction<MenuItemProps[]>) => void
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

export const deleteMenuItem = (
  itemId: string,
  setMenuItems: (value: SetStateAction<MenuItemProps[]>) => void
) => {
  const removeItem = (items: MenuItemProps[]): MenuItemProps[] =>
    items
      .filter((item) => item.id !== itemId)
      .map((item) => ({
        ...item,
        submenu: item.submenu ? removeItem(item.submenu) : []
      }));

  setMenuItems((prev) => removeItem(prev));
};
