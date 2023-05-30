import { Menu } from '@headlessui/react';

interface HeaderProps {
  openModalCreate: () => void;
  userLogout: () => void;
}

export const Header = ({ openModalCreate, userLogout }: HeaderProps) => {
  return (
    <header className="bg-gray-800 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                onClick={openModalCreate}
              >
                Adicionar Contato
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <Menu as="div" className="relative">
              <div>
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={userLogout}
                >
                  Logout
                </button>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};
