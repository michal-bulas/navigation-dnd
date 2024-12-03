import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmptyMenu from '@/components/menu/EmptyMenu';

describe('EmptyMenu Component', () => {
  it('renders the component with correct content', () => {
    render(<EmptyMenu onFormOpen={jest.fn()} />);

    expect(screen.getByTestId('empty-title')).toBeInTheDocument();

    expect(screen.getByTestId('empty-paragraph')).toBeInTheDocument();

    expect(screen.getByTestId('empty-add-button')).toBeInTheDocument();
  });

  it('calls onFormOpen with true when button is clicked', async () => {
    const onFormOpenMock = jest.fn();
    render(<EmptyMenu onFormOpen={onFormOpenMock} />);

    await userEvent.click(screen.getByTestId('empty-add-button'));

    expect(onFormOpenMock).toHaveBeenCalledWith(true);
    expect(onFormOpenMock).toHaveBeenCalledTimes(1);
  });
});
