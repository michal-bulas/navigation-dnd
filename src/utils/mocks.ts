import { DragEndEvent } from '@dnd-kit/core';

import { MenuItemProps } from '@/types/MenuItem';

export const mockMenu: MenuItemProps[] = [
  {
    id: '1',
    name: 'Name 1',
    link: 'https://test.com/name-1 ',
    submenu: []
  },
  {
    id: '2',
    name: 'Name 2',
    link: 'https://test.com/name-2',
    submenu: [
      {
        id: '21',
        name: 'Name 2-1',
        link: 'https://test.com/name-2/1',
        submenu: []
      },
      {
        id: '22',
        name: 'Name 2-2',
        link: 'https://test.com/name-2/2',
        submenu: []
      }
    ]
  },
  {
    id: '3',
    name: 'Name 3',
    link: 'https://test.com/name-3',
    submenu: [
      {
        id: '31',
        name: 'Name 3-1',
        link: 'https://test.com/name-3/1',
        submenu: [
          {
            id: '311',
            name: 'Name 3-1-1',
            link: 'https://test.com/name-3/1/1',
            submenu: []
          }
        ]
      }
    ]
  }
];

export const mockEvent: DragEndEvent = {
  active: {
    id: mockMenu[0].id,
    data: {
      current: {
        type: 'menuItem',
        id: mockMenu[0].id,
        index: 0
      }
    },
    rect: { current: { initial: null, translated: null } }
  },
  over: {
    id: mockMenu[1].id,
    rect: {
      width: 20,
      height: 20,
      top: 20,
      left: 20,
      bottom: 20,
      right: 20
    },
    data: {
      current: {
        type: 'menuItem',
        id: mockMenu[1].id,
        index: 1
      }
    },
    disabled: false
  },
  activatorEvent: new MouseEvent('mousemove'),
  collisions: null,
  delta: {
    x: 0,
    y: 0
  }
};

export const mockMenuChanged: MenuItemProps[] = [
  {
    id: '2',
    name: 'Name 2',
    link: 'https://test.com/name-2',
    submenu: [
      {
        id: '21',
        name: 'Name 2-1',
        link: 'https://test.com/name-2/1',
        submenu: []
      },
      {
        id: '22',
        name: 'Name 2-2',
        link: 'https://test.com/name-2/2',
        submenu: []
      }
    ]
  },
  {
    id: '1',
    name: 'Name 1',
    link: 'https://test.com/name-1 ',
    submenu: []
  },
  {
    id: '3',
    name: 'Name 3',
    link: 'https://test.com/name-3',
    submenu: [
      {
        id: '31',
        name: 'Name 3-1',
        link: 'https://test.com/name-3/1',
        submenu: [
          {
            id: '311',
            name: 'Name 3-1-1',
            link: 'https://test.com/name-3/1/1',
            submenu: []
          }
        ]
      }
    ]
  }
];
