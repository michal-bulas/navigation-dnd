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
        <ul
          className={twMerge('divide-y', type === 'SUB' ? '-mb-px ml-16' : '')}
        >
          {menuItems.map((item, index) => (
            <DraggableMenuItem
              key={item.id}
              index={index}
              itemsLength={menuItems.length}
              menuItem={item}
              addMenuItemHandler={addMenuItemHandler}
              editMenuItemHandler={editMenuItemHandler}
              deleteMenuItemHandler={deleteMenuItemHandler}
              dragSubMenuItemHandler={dragSubMenuItemHandler}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableMenuContainer;
