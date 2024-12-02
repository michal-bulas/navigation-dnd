'use client';

import { useState } from 'react';

import { useMenu } from '@/providers/MenuProvider';

import AddMenuItemForm from '@/components/menu/AddMenuItemForm';
import EmptyMenu from '@/components/menu/EmptyMenu';
import MenuItemsList from '@/components/menu/MenuItemsList';

import { MenuItemProps } from '@/types/MenuItem';

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { menuItems, addMenuItem } = useMenu();

  const addMenuItemHandler = (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => {
    return addMenuItem(newItem, parentId);
  };

  return (
    <main>
      {menuItems.length > 0 ? (
        <MenuItemsList />
      ) : isFormOpen ? (
        <AddMenuItemForm
          type='ADD'
          onFormAdd={addMenuItemHandler}
          onFormClose={() => {
            setIsFormOpen(false);
          }}
        />
      ) : (
        <EmptyMenu onFormOpen={() => setIsFormOpen(true)} />
      )}
    </main>
  );
};

export default Menu;
