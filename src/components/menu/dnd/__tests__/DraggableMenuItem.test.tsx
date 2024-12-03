import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import DraggableMenuItem from '@/components/menu/dnd/DraggableMenuItem';

import { MenuItemProps } from '@/types/MenuItem';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null
  }))
}));

// eslint-disable-next-line
jest.mock('@/components/menu/AddMenuItemForm', () => (props: any) => (
  <div data-testid='add-menu-item-form'>{JSON.stringify(props)}</div>
));

jest.mock(
  '@/components/menu/dnd/DraggableMenuContainer',
  // eslint-disable-next-line
  () => (props: any) => (
    <div data-testid='draggable-menu-container'>{JSON.stringify(props)}</div>
  )
);

describe('DraggableMenuItem Component', () => {
  const mockAddMenuItemHandler = jest.fn();
  const mockEditMenuItemHandler = jest.fn();
  const mockDeleteMenuItemHandler = jest.fn();
  const mockDragSubMenuItemHandler = jest.fn();

  const mockMenuItem: MenuItemProps = {
    id: '1',
    name: 'Menu Item 1',
    link: '/menu-item-1',
    submenu: [
      {
        id: '11',
        name: 'Submenu 1',
        link: 'https://test.com/sub1',
        submenu: []
      },
      {
        id: '12',
        name: 'Submenu 2',
        link: 'https://test.com/sub2',
        submenu: []
      }
    ]
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu item with correct content', () => {
    render(
      <DraggableMenuItem
        className='test-class'
        menuItem={mockMenuItem}
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
    expect(screen.getByText('/menu-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-button-delete')).toBeInTheDocument();
    expect(screen.getByTestId('item-button-edit')).toBeInTheDocument();
    expect(screen.getByTestId('item-button-add')).toBeInTheDocument();
  });

  it('handles opening the AddMenuItemForm', () => {
    render(
      <DraggableMenuItem
        className='test-class'
        menuItem={mockMenuItem}
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    const addButton = screen.getByTestId('item-button-add');
    fireEvent.click(addButton);

    expect(screen.getByTestId('add-menu-item-form')).toBeInTheDocument();
    expect(screen.getByTestId('add-menu-item-form')).toHaveTextContent(
      '"type":"ADD"'
    );
  });

  it('handles opening the EditMenuItemForm', () => {
    render(
      <DraggableMenuItem
        className='test-class'
        menuItem={mockMenuItem}
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    const editButton = screen.getByTestId('item-button-edit');
    fireEvent.click(editButton);

    expect(screen.getByTestId('add-menu-item-form')).toBeInTheDocument();
    expect(screen.getByTestId('add-menu-item-form')).toHaveTextContent(
      '"type":"EDIT"'
    );
  });

  it('calls deleteMenuItemHandler on delete button click', () => {
    render(
      <DraggableMenuItem
        className='test-class'
        menuItem={mockMenuItem}
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    const deleteButton = screen.getByTestId('item-button-delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteMenuItemHandler).toHaveBeenCalledTimes(1);
    expect(mockDeleteMenuItemHandler).toHaveBeenCalledWith(mockMenuItem.id);
  });

  it('renders submenu using DraggableMenuContainer when submenu exists', () => {
    const menuItemWithSubmenu: MenuItemProps = {
      ...mockMenuItem,
      submenu: [{ id: '2', name: 'Submenu Item 1', link: '', submenu: [] }]
    };

    render(
      <DraggableMenuItem
        className='test-class'
        menuItem={menuItemWithSubmenu}
        addMenuItemHandler={mockAddMenuItemHandler}
        editMenuItemHandler={mockEditMenuItemHandler}
        deleteMenuItemHandler={mockDeleteMenuItemHandler}
        dragSubMenuItemHandler={mockDragSubMenuItemHandler}
      />
    );

    expect(screen.getByTestId('draggable-menu-container')).toBeInTheDocument();
    expect(screen.getByTestId('draggable-menu-container')).toHaveTextContent(
      '"type":"SUB"'
    );
  });
});
