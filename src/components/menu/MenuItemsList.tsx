'use client';

import { useState } from 'react';

import { dragMenuItem, dragSubMenuItem } from '@/lib/dndUtils';
import { useMenu } from '@/providers/MenuProvider';
import { DragEndEvent } from '@dnd-kit/core';

import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import AddMenuItemForm from '@/components/menu/AddMenuItemForm';
import DraggableMenuContainer from '@/components/menu/dnd/DraggableMenuContainer';

import { MenuItemProps } from '@/types/MenuItem';

const MenuItemsList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { menuItems, setMenuItems, addMenuItem, editMenuItem, deleteMenuItem } =
    useMenu();

  const addMenuItemHandler = (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => {
    return addMenuItem(newItem, parentId);
  };

  const editMenuItemHandler = (
    updatedData: Omit<MenuItemProps, 'id'>,
    itemId: string
  ) => {
    return editMenuItem(updatedData, itemId);
  };

  const deleteMenuItemHandler = (itemId: string) => {
    return deleteMenuItem(itemId);
  };

  const dragMenuItemEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;
    const newOrder = dragMenuItem(menuItems, active, over);

    if (!newOrder) return;
    return setMenuItems(newOrder);
  };

  const dragSubMenuItemHandler = (
    parentId: string,
    newSubMenu: MenuItemProps[]
  ) => {
    const newOrder = dragSubMenuItem(menuItems, parentId, newSubMenu);

    if (!newOrder) return;
    return setMenuItems(newOrder);
  };

  return (
    <Card className='h-fit p-0'>
      <DraggableMenuContainer
        type='PARENT'
        menuItems={menuItems}
        addMenuItemHandler={addMenuItemHandler}
        editMenuItemHandler={editMenuItemHandler}
        deleteMenuItemHandler={deleteMenuItemHandler}
        dragMenuItemEndHandler={dragMenuItemEndHandler}
        dragSubMenuItemHandler={dragSubMenuItemHandler}
      />
      {isFormOpen && (
        <div className='border-primary-border border-b p-6'>
          <AddMenuItemForm
            type='ADD'
            onFormAdd={addMenuItemHandler}
            onFormClose={() => setIsFormOpen(false)}
          />
        </div>
      )}

      <div className='bg-main-bg p-6'>
        <Button
          onClick={() => setIsFormOpen(true)}
          className='text-text-primary'
        >
          Dodaj pozycję menu
        </Button>
      </div>
    </Card>
  );
};

export default MenuItemsList;
