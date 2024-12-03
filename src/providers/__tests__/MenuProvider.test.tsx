import { MenuProvider, useMenu } from '@/providers/MenuProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { menuItems, addMenuItem, editMenuItem, deleteMenuItem } = useMenu();

  return (
    <div>
      <button
        onClick={() => addMenuItem({ name: 'Test Item', submenu: [] }, null)}
      >
        Add Item
      </button>
      <button
        onClick={() =>
          editMenuItem({ name: 'Updated Item' }, menuItems[0]?.id || '')
        }
      >
        Edit Item
      </button>
      <button onClick={() => deleteMenuItem(menuItems[0]?.id || '')}>
        Delete Item
      </button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe('MenuProvider', () => {
  it('should add a menu item', async () => {
    render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    const user = userEvent.setup();
    const addButton = screen.getByText('Add Item');

    await user.click(addButton);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should edit a menu item', async () => {
    render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    const user = userEvent.setup();
    const addButton = screen.getByText('Add Item');
    const editButton = screen.getByText('Edit Item');

    await user.click(addButton);
    await user.click(editButton);

    expect(screen.getByText('Updated Item')).toBeInTheDocument();
  });

  it('should delete a menu item', async () => {
    render(
      <MenuProvider>
        <TestComponent />
      </MenuProvider>
    );

    const user = userEvent.setup();
    const addButton = screen.getByText('Add Item');
    const deleteButton = screen.getByText('Delete Item');

    await user.click(addButton);
    await user.click(deleteButton);

    expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
  });
});
