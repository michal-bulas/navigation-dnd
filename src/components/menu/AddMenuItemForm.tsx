'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import SearchIcon from '@/components/svg/SearchIcon';
import TrashIcon from '@/components/svg/TrashIcon';

import { MenuItemProps } from '@/types/MenuItem';

import { MenuItemSchema, TMenuItemSchema } from '@/schemas/MenuItemSchema';

interface AddMenuItemFormProps {
  type: 'EDIT' | 'ADD';
  item?: MenuItemProps;
  parentId?: string;
  onFormAdd: (
    newItem: Omit<MenuItemProps, 'id'>,
    parentId: string | null
  ) => void;
  onFormEdit?: (updatedData: Omit<MenuItemProps, 'id'>, itemId: string) => void;
  onFormClose: (value: boolean) => void;
}

const AddMenuItemForm = ({
  type,
  item,
  parentId,
  onFormAdd,
  onFormEdit,
  onFormClose
}: AddMenuItemFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TMenuItemSchema>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: type === 'EDIT' ? item?.name : '',
      link: type === 'EDIT' ? item?.link : ''
    }
  });

  const onSubmit = (formMenuItem: TMenuItemSchema) => {
    if (type === 'EDIT' && onFormEdit && item) {
      onFormEdit({ ...formMenuItem, submenu: item.submenu }, item?.id);
    } else {
      onFormAdd({ ...formMenuItem, submenu: [] }, parentId || null);
    }
    onFormClose(false);
    reset();
  };

  return (
    <Card className='w-full bg-white'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full gap-x-5'
      >
        <div className='flex flex-1 flex-col gap-y-3'>
          <div className='form-item'>
            <label
              htmlFor='name'
              className='text-sm font-medium text-text-primary'
            >
              Nazwa
            </label>

            <input
              type='text'
              placeholder='np. Promocje'
              {...register('name')}
              className='form-input placeholder-text-secondary'
            />

            {errors.name && <p className='form-error'>{errors.name.message}</p>}
          </div>

          <div className='form-item'>
            <label
              htmlFor='link'
              className='font-medium text-text-primary'
            >
              Link
            </label>

            <div className='form-input flex items-center gap-2 text-sm'>
              <label
                htmlFor='link'
                className='block'
              >
                <SearchIcon size={20} />
              </label>
              <input
                type='text'
                placeholder='Wklej lub wyszukaj'
                {...register('link')}
                className='flex-1 placeholder-text-secondary outline-none'
              />
            </div>
            {errors.link && <p className='form-error'>{errors.link.message}</p>}
          </div>

          <div className='mt-5 flex gap-x-2'>
            <Button
              type='button'
              onClick={() => onFormClose(false)}
              disabled={isSubmitting}
              className='text-text-primary'
            >
              Anuluj
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='border-border-primary text-primary'
            >
              Dodaj
            </Button>
          </div>
        </div>

        <div
          onClick={() => onFormClose(false)}
          className='cursor-pointer p-2.5'
        >
          <TrashIcon size={20} />
        </div>
      </form>
    </Card>
  );
};

export default AddMenuItemForm;
