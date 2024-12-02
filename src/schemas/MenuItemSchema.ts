import { z } from 'zod';

export const MenuItemSchema = z
  .object({
    name: z.string().min(1, 'Nazwa nie może być pusta'),
    link: z.string().url('Podaj prawidłowy link')
  })
  .strict();

export type TMenuItemSchema = z.infer<typeof MenuItemSchema>;
