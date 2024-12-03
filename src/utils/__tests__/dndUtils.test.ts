import { dragMenuItem, dragSubMenuItem } from '@/utils/dndUtils';
import { mockEvent, mockMenu, mockMenuChanged } from '@/utils/mocks';
import { Over } from '@dnd-kit/core';

import { MenuItemProps } from '@/types/MenuItem';

describe('dragMenuItem', () => {
  it('should move an item from one position to another', () => {
    const active = mockEvent.active;
    const over = mockEvent.over;

    const updatedMenuItems = dragMenuItem(mockMenu, active, over);

    expect(updatedMenuItems).toEqual(mockMenuChanged);
  });

  it('should return undefined if "over" is null', () => {
    const active = mockEvent.active;
    const over: Over | null = null;

    const updatedMenuItems = dragMenuItem(mockMenu, active, over);

    expect(updatedMenuItems).toBeUndefined();
  });

  it('should return undefined if active and over IDs are the same', () => {
    const active = mockEvent.active;
    const over = mockEvent.over;

    if (over) over.id = active.id;

    const updatedMenuItems = dragMenuItem(mockMenu, active, over);

    expect(updatedMenuItems).toBeUndefined();
  });
});

describe('dragSubMenuItem', () => {
  const menuItems: MenuItemProps[] = [
    {
      id: '1',
      name: 'Item 1',
      link: '',
      submenu: [
        { id: '1-1', name: 'SubItem 1-1', submenu: [], link: '' },
        { id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' }
      ]
    },
    {
      id: '2',
      name: 'Item 2',
      submenu: [],
      link: ''
    }
  ];

  it('should update the submenu for the given parentId', () => {
    const newSubMenu = [
      { id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' },
      { id: '1-1', name: 'SubItem 1-1', submenu: [], link: '' }
    ];

    const updatedMenuItems = dragSubMenuItem(menuItems, '1', newSubMenu);

    expect(updatedMenuItems).toEqual([
      {
        id: '1',
        name: 'Item 1',
        link: '',
        submenu: [
          { id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' },
          { id: '1-1', name: 'SubItem 1-1', submenu: [], link: '' }
        ]
      },
      {
        id: '2',
        name: 'Item 2',
        submenu: [],
        link: ''
      }
    ]);
  });

  it('should return the original array if parentId is not found', () => {
    const newSubMenu = [
      { id: '2-1', name: 'SubItem 2-1', submenu: [], link: '' }
    ];

    const updatedMenuItems = dragSubMenuItem(menuItems, '3', newSubMenu);

    expect(updatedMenuItems).toEqual(menuItems);
  });

  it('should handle nested submenu updates recursively', () => {
    const newSubMenu = [
      { id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' }
    ];

    const updatedMenuItems = dragSubMenuItem(menuItems, '1-1', newSubMenu);

    expect(updatedMenuItems).toEqual([
      {
        id: '1',
        name: 'Item 1',
        link: '',
        submenu: [
          {
            id: '1-1',
            name: 'SubItem 1-1',
            link: '',
            submenu: [{ id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' }]
          },
          { id: '1-2', name: 'SubItem 1-2', submenu: [], link: '' }
        ]
      },
      {
        id: '2',
        name: 'Item 2',
        submenu: [],
        link: ''
      }
    ]);
  });
});
