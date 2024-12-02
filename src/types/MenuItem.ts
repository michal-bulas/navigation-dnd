export type MenuItemProps = {
  id: string;
  name: string;
  link?: string;
  submenu: MenuItemProps[];
};
