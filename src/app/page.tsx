import { MenuProvider } from '@/providers/MenuProvider';

import Menu from '@/components/menu/Menu';

export default function Home() {
  return (
    <div className='w-full max-w-screen-lg py-20'>
      <MenuProvider>
        <Menu />
      </MenuProvider>
    </div>
  );
}
