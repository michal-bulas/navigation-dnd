'use client';

import Card from '@/components/UI/Card';
import PlusCircleIcon from '@/components/svg/PlusCircleIcon';

interface EmptyMenuProps {
  onFormOpen: (value: boolean) => void;
}

const EmptyMenu = ({ onFormOpen }: EmptyMenuProps) => {
  return (
    <Card className='flex flex-col items-center justify-center text-center'>
      <h2 className='text-text-primary mb-1 text-base font-semibold'>
        Menu jest puste
      </h2>
      <p className='text-text-secondary mb-6 text-sm'>
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        onClick={() => onFormOpen(true)}
        className='bg-primary hover:bg-primary/90 flex flex-row items-center gap-1 rounded-lg px-3.5 py-2.5 font-semibold text-white'
      >
        <PlusCircleIcon size={20} />
        Dodaj pozycję menu
      </button>
    </Card>
  );
};

export default EmptyMenu;
