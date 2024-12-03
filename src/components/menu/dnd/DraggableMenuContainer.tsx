'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { twMerge } from 'tailwind-merge';

import DraggableMenuItem from '@/components/menu/dnd/DraggableMenuItem';

import { MenuItemProps } from '@/types/MenuItem';

interface DraggableMenuContainerProps {
  menuItems: MenuItemProps[];
  type: 'PARENT' | 'SUB';
  addMenuItemHandler: (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => void;
  editMenuItemHandler: (
    updatedData: Omit<MenuItemProps, 'id'>,
    itemId: string
  ) => void;
  deleteMenuItemHandler: (itemId: string) => void;
  dragMenuItemEndHandler: (event: DragEndEvent) => void;
  dragSubMenuItemHandler: (
    parentId: string,
    newSubMenu: MenuItemProps[]
  ) => void;
}

const DraggableMenuContainer = ({
  menuItems,
  type,
  addMenuItemHandler,
  editMenuItemHandler,
  deleteMenuItemHandler,
  dragMenuItemEndHandler,
  dragSubMenuItemHandler
}: DraggableMenuContainerProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={dragMenuItemEndHandler}
    >
      <SortableContext
        items={menuItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={type === 'SUB' ? '-mb-px ml-16' : ''}>
          {menuItems.map((item, index) => (
            <DraggableMenuItem
              key={item.id}
              menuItem={item}
              addMenuItemHandler={addMenuItemHandler}
              editMenuItemHandler={editMenuItemHandler}
              deleteMenuItemHandler={deleteMenuItemHandler}
              dragSubMenuItemHandler={dragSubMenuItemHandler}
              className={twMerge(
                // Top-rounded menu
                'flex h-[78px] max-h-[78px] flex-row items-center justify-between border bg-white px-6 py-4',
                type === 'PARENT' &&
                  index === 0 &&
                  '-mt-px rounded-t-lg border-t-0',

                // Menu with submenu
                type === 'PARENT' &&
                  item.submenu.length > 0 &&
                  'relative z-10 border-b',

                // Last menu item
                type === 'PARENT' &&
                  item.submenu.length === 0 &&
                  index === menuItems.length - 1 &&
                  'relative z-10',

                // Middle menu item
                type === 'PARENT' &&
                  item.submenu.length === 0 &&
                  index !== menuItems.length - 1 &&
                  'border-b-0 border-t',

                // Submenu with submenu
                type === 'SUB' &&
                  item.submenu.length > 0 &&
                  '-mt-px rounded-bl-lg border-b border-l border-t',

                // Last submenu item
                type === 'SUB' &&
                  item.submenu.length === 0 &&
                  index === menuItems.length - 1 &&
                  '-mt-px rounded-bl-lg border-b border-l border-t',

                // Middle submenu item
                type === 'SUB' &&
                  item.submenu.length === 0 &&
                  index !== menuItems.length - 1 &&
                  '-mt-px border-b border-l border-t'
              )}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableMenuContainer;
