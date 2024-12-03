import { MenuItemSchema } from '@/schemas/MenuItemSchema';

describe('MenuItemSchema', () => {
  it('should validate a valid menu item', () => {
    const validData = {
      name: 'Home',
      link: 'https://example.com'
    };

    expect(() => MenuItemSchema.parse(validData)).not.toThrow();
  });

  it('should throw an error if name is empty', () => {
    const invalidData = {
      name: '',
      link: 'https://example.com'
    };

    expect(() => MenuItemSchema.parse(invalidData)).toThrow(
      'Nazwa nie może być pusta'
    );
  });

  it('should throw an error if link is not a valid URL', () => {
    const invalidData = {
      name: 'Home',
      link: 'not-a-valid-url'
    };

    expect(() => MenuItemSchema.parse(invalidData)).toThrow(
      'Podaj prawidłowy link'
    );
  });

  it('should throw an error if there are additional properties', () => {
    const invalidData = {
      name: 'Home',
      link: 'https://example.com',
      extra: 'not-allowed'
    };

    expect(() => MenuItemSchema.parse(invalidData)).toThrow();
  });
});
