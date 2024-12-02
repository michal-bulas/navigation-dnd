'use client';

import { useState } from 'react';

import Link from 'next/link';

import { DragEndEvent } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/UI/Button';
import AddMenuItemForm from '@/components/menu/AddMenuItemForm';
import DraggableMenuContainer from '@/components/menu/dnd/DraggableMenuContainer';
import MoveIcon from '@/components/svg/MoveIcon';

import { MenuItemProps } from '@/types/MenuItem';

interface DraggableMenuItemProps {
  index: number;
  itemsLength: number;
  menuItem: MenuItemProps;
  addMenuItemHandler: (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => void;
  editMenuItemHandler: (
    updatedData: Omit<MenuItemProps, 'id'>,
    itemId: string
  ) => void;
  deleteMenuItemHandler: (itemId: string) => void;
  dragSubMenuItemHandler: (
    parentId: string,
    newSubMenu: MenuItemProps[]
  ) => void;
  dragMenuItemEndHandler: (event: DragEndEvent) => void;
}

const DraggableMenuItem = ({
  index,
  itemsLength,
  menuItem,
  addMenuItemHandler,
  deleteMenuItemHandler,
  dragMenuItemEndHandler,
  dragSubMenuItemHandler,
  editMenuItemHandler
}: DraggableMenuItemProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [typeForm, setTypeForm] = useState<'ADD' | 'EDIT'>('ADD');

  const openAddFormHandler = () => {
    setTypeForm('ADD');
    setIsFormOpen(true);
  };

  const openEditFormHandler = () => {
    setTypeForm('EDIT');
    setIsFormOpen(true);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: menuItem.id
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className=''
    >
      <div
        className={twMerge(
          'relative flex max-h-[78px] items-center justify-between border-b border-l bg-white px-6 py-4'
        )}
      >
        <div className='flex items-center gap-x-2 p-2.5'>
          <div className='p-2.5'>
            <MoveIcon
              size={20}
              className='text-text-secondary'
            />
          </div>

          <div className='space-y-4'>
            <h3>{menuItem.name}</h3>
            {menuItem.link && (
              <Link
                href={menuItem.link}
                className='text-sm text-text-secondary'
              >
                {menuItem.link}
              </Link>
            )}
          </div>
        </div>

        <div className='flex flex-nowrap text-nowrap'>
          <Button
            onClick={() => deleteMenuItemHandler(menuItem.id)}
            className='rounded-r-none text-text-primary'
          >
            Usuń
          </Button>

          <Button
            onClick={openEditFormHandler}
            className='rounded-none border-x-0 text-text-primary'
          >
            Edytuj
          </Button>

          <Button
            onClick={openAddFormHandler}
            className='rounded-l-none text-text-primary'
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <div className='form-container ml-16 p-6'>
          <AddMenuItemForm
            type={typeForm}
            item={typeForm === 'EDIT' ? menuItem : undefined}
            parentId={typeForm === 'ADD' ? menuItem.id : undefined}
            onFormAdd={addMenuItemHandler}
            onFormEdit={editMenuItemHandler}
            onFormClose={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {menuItem.submenu.length > 0 && (
        <DraggableMenuContainer
          type='SUB'
          menuItems={menuItem.submenu}
          addMenuItemHandler={addMenuItemHandler}
          editMenuItemHandler={editMenuItemHandler}
          deleteMenuItemHandler={deleteMenuItemHandler}
          dragMenuItemEndHandler={dragMenuItemEndHandler}
          dragSubMenuItemHandler={dragSubMenuItemHandler}
        />
      )}
    </li>
  );
};

export default DraggableMenuItem;
