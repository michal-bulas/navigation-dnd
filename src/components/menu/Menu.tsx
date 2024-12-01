'use client';

import { useState } from 'react';

import AddMenuForm from '@/components/menu/AddMenuItemForm';
import EmptyMenu from '@/components/menu/EmptyMenu';

import { MenuItemProps } from '@/types/MenuItem';

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

  return (
    <main className=''>
      {isFormOpen ? (
        <AddMenuForm
          type='ADD'
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
