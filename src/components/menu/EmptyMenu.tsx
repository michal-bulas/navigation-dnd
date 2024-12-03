'use client';

import Card from '@/components/UI/Card';
import PlusCircleIcon from '@/components/svg/PlusCircleIcon';

interface EmptyMenuProps {
  onFormOpen: (value: boolean) => void;
}

const EmptyMenu = ({ onFormOpen }: EmptyMenuProps) => {
  return (
    <Card className='flex flex-col items-center justify-center text-center'>
      <h2
        data-testid='empty-title'
        className='mb-1 text-base font-semibold text-text-primary'
      >
        Menu jest puste
      </h2>
      <p
        data-testid='empty-paragraph'
        className='mb-6 text-sm text-text-secondary'
      >
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        data-testid='empty-add-button'
        onClick={() => onFormOpen(true)}
        className='flex flex-row items-center gap-1 rounded-lg bg-primary px-3.5 py-2.5 font-semibold text-white hover:bg-primary/90'
      >
        <PlusCircleIcon size={20} />
        Dodaj pozycję menu
      </button>
    </Card>
  );
};

export default EmptyMenu;
