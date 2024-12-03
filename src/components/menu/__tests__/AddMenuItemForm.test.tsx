import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import AddMenuItemForm from '@/components/menu/AddMenuItemForm';

import { MenuItemProps } from '@/types/MenuItem';

describe('AddMenuItemForm', () => {
  const mockOnFormAdd = jest.fn();
  const mockOnFormEdit = jest.fn();
  const mockOnFormClose = jest.fn();

  const item: MenuItemProps = {
    id: '1',
    name: 'Test Item',
    link: 'https://example.com',
    submenu: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(
      <AddMenuItemForm
        type='ADD'
        onFormAdd={mockOnFormAdd}
        onFormClose={mockOnFormClose}
      />
    );

    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('link-input')).toBeInTheDocument();
    expect(screen.getByTestId('form-cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('form-submit-button')).toBeInTheDocument();
  });

  it('handles form submission for adding a menu item', async () => {
    render(
      <AddMenuItemForm
        type='ADD'
        onFormAdd={mockOnFormAdd}
        onFormClose={mockOnFormClose}
      />
    );

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'New Item' }
    });

    fireEvent.change(screen.getByTestId('link-input'), {
      target: { value: 'https://newlink.com' }
    });

    fireEvent.click(screen.getByTestId('form-submit-button'));

    await waitFor(() => {
      expect(mockOnFormAdd).toHaveBeenCalledWith(
        { name: 'New Item', link: 'https://newlink.com', submenu: [] },
        null
      );
      expect(mockOnFormClose).toHaveBeenCalledWith(false);
    });
  });

  it('handles form submission for editing a menu item', async () => {
    render(
      <AddMenuItemForm
        type='EDIT'
        item={item}
        onFormAdd={mockOnFormAdd}
        onFormEdit={mockOnFormEdit}
        onFormClose={mockOnFormClose}
      />
    );

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Updated Name' }
    });

    fireEvent.click(screen.getByTestId('form-submit-button'));

    await waitFor(() => {
      expect(mockOnFormEdit).toHaveBeenCalledWith(
        { name: 'Updated Name', link: 'https://example.com', submenu: [] },
        '1'
      );
      expect(mockOnFormClose).toHaveBeenCalledWith(false);
    });
  });

  it('displays validation errors when form inputs are invalid', async () => {
    render(
      <AddMenuItemForm
        type='ADD'
        onFormAdd={mockOnFormAdd}
        onFormClose={mockOnFormClose}
      />
    );

    fireEvent.click(screen.getByText('Dodaj'));

    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toBeInTheDocument();
      expect(screen.getByTestId('link-error')).toBeInTheDocument();
      expect(mockOnFormAdd).not.toHaveBeenCalled();
    });
  });

  it('calls onFormClose when cancel button is clicked', () => {
    render(
      <AddMenuItemForm
        type='ADD'
        onFormAdd={mockOnFormAdd}
        onFormClose={mockOnFormClose}
      />
    );

    fireEvent.click(screen.getByTestId('form-cancel-button'));

    expect(mockOnFormClose).toHaveBeenCalledWith(false);
  });
});
