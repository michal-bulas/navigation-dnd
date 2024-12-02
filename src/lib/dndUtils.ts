import { Active, Over } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { MenuItemProps } from '@/types/MenuItem';

export const dragMenuItem = (
  menuItems: MenuItemProps[],
  active: Active,
  over: Over | null
): MenuItemProps[] | undefined => {
  if (!over || active.id === over.id) return;

  const activeIndex = menuItems.findIndex((item) => item.id === active.id);
  const overIndex = menuItems.findIndex((item) => item.id === over.id);

  if (activeIndex !== -1 && overIndex !== -1) {
    const newOrder = arrayMove(menuItems, activeIndex, overIndex);
    return newOrder;
  }
};

export const dragSubMenuItem = (
  itemsList: MenuItemProps[],
  parentId: string,
  newSubMenu: MenuItemProps[]
): MenuItemProps[] => {
  return itemsList.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        submenu: newSubMenu
      };
    }

    if (item.submenu?.length) {
      return {
        ...item,
        submenu: dragSubMenuItem(item.submenu, parentId, newSubMenu)
      };
    }
    return item;
  });
};
