'use client';

import { useState } from 'react';

import {
  addMenuItem,
  deleteMenuItem,
  editMenuItem
} from '@/lib/manageMenuItems';

import AddMenuForm from '@/components/menu/AddMenuItemForm';
import EmptyMenu from '@/components/menu/EmptyMenu';

import { MenuItemProps } from '@/types/MenuItem';

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

  const addMenuItemHandler = (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => {
    return addMenuItem(newItem, parentId, setMenuItems);
  };

  const editMenuItemHandler = (
    updatedData: Omit<MenuItemProps, 'id'>,
    itemId: string
  ) => {
    return editMenuItem(updatedData, itemId, setMenuItems);
  };

  const deleteHandler = (itemId: string) => {
    return deleteMenuItem(itemId, setMenuItems);
  };

  return (
    <main className=''>
      {menuItems.length > 0 ? (
        ''
      ) : isFormOpen ? (
        <>
          <AddMenuForm
            type='ADD'
            onFormAdd={addMenuItemHandler}
            onFormClose={() => {
              setIsFormOpen(false);
            }}
          />
          <p>{JSON.stringify(menuItems)}</p>
        </>
      ) : (
        <EmptyMenu onFormOpen={() => setIsFormOpen(true)} />
      )}
    </main>
  );
};

export default Menu;
