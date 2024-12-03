import { mockEvent } from '@/utils/mocks';
import { render, screen, within } from '@testing-library/react';

import DraggableMenuContainer from '@/components/menu/dnd/DraggableMenuContainer';

import { MenuItemProps } from '@/types/MenuItem';

describe('DraggableMenuContainer Component', () => {
  const mockAddMenuItemHandler = jest.fn();
  const mockEditMenuItemHandler = jest.fn();
  const mockDeleteMenuItemHandler = jest.fn();
  const mockDragMenuItemEndHandler = jest.fn();
  const mockDragSubMenuItemHandler = jest.fn();

  const menuItems: MenuItemProps[] = [
    { id: '1', name: 'Menu Item 1', link: '', submenu: [] },
    { id: '2', name: 'Menu Item 2', link: '', submenu: [] }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all menu items', () => {
    render(
      <DraggableMenuContainer
        menuItems={menuItems}
        type='PARENT'
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragMenuItemEndHandler={mockDragMenuItemEndHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    const renderedItems = screen.getByTestId('draggable-menu-container');
    const items = within(renderedItems).getAllByTestId('draggable-menu-item');
    expect(items).toHaveLength(menuItems.length);

    menuItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('calls dragMenuItemEndHandler on drag end', () => {
    render(
      <DraggableMenuContainer
        menuItems={menuItems}
        type='PARENT'
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragMenuItemEndHandler={mockDragMenuItemEndHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    mockDragMenuItemEndHandler(mockEvent);

    expect(mockDragMenuItemEndHandler).toHaveBeenCalledWith(mockEvent);
  });

  it('calls handleDeleteItem when deleting an item', () => {
    render(
      <DraggableMenuContainer
        menuItems={menuItems}
        type='PARENT'
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragMenuItemEndHandler={mockDragMenuItemEndHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    const itemIdToDelete = '2';
    mockDeleteMenuItemHandler(itemIdToDelete);

    expect(mockDeleteMenuItemHandler).toHaveBeenCalledWith(itemIdToDelete);
  });
});
