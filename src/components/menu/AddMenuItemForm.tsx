'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Card from '@/components/UI/Card';
import SearchIcon from '@/components/svg/SearchIcon';
import TrashIcon from '@/components/svg/TrashIcon';

import { MenuItemProps } from '@/types/MenuItem';

import { MenuItemSchema, TMenuItemSchema } from '@/schemas/MenuItemSchema';

interface AddMenuFormProps {
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

const AddMenuForm = ({
  type,
  item,
  parentId,
  onFormAdd,
  onFormEdit,
  onFormClose
}: AddMenuFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TMenuItemSchema>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      name: type === 'EDIT' ? item?.name : '',
      link: type === 'EDIT' ? item?.name : ''
    }
  });

  const onSubmit = (formMenuItem: TMenuItemSchema) => {
    if (type === 'EDIT' && onFormEdit && item)
      return onFormEdit({ ...formMenuItem, submenu: item.submenu }, item?.id);
    return onFormAdd({ ...formMenuItem, submenu: [] }, parentId || null);
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
              className='text-text-primary'
            >
              Nazwa
            </label>

            <input
              type='text'
              placeholder='np. Promocje'
              {...register('name')}
              className='form-input'
            />

            {errors.name && <p className='form-error'>{errors.name.message}</p>}
          </div>

          <div className='form-item'>
            <label
              htmlFor='link'
              className='text-text-primary'
            >
              Link
            </label>

            <div className='form-input flex items-center gap-2'>
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
                className='flex-1 outline-none'
              />
            </div>
            {errors.link && <p className='form-error'>{errors.link.message}</p>}
          </div>

          <div className='mt-5 flex gap-x-2'>
            <button
              type='button'
              onClick={() => onFormClose(false)}
              disabled={isSubmitting}
              className='form-button border-border text-text-primary'
            >
              Anuluj
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='form-button border-border-primary text-primary'
            >
              Dodaj
            </button>
          </div>
        </div>

        <div
          onClick={() => onFormClose(false)}
          className='cursor-pointer p-2'
        >
          <TrashIcon size={20} />
        </div>
      </form>
    </Card>
  );
};

export default AddMenuForm;
