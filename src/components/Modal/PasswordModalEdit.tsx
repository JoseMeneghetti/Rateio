import { Transition } from "@headlessui/react";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import { Fragment, useState } from "react";

type HandleSaveRateio = (password: string) => void;

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleSaveRateio: HandleSaveRateio;
}

const PasswordModalEdit = ({ isOpen, setIsOpen, handleSaveRateio }: Props) => {
  const [password, setPassword] = useState("");

  const handleCheckPassword = () => {
    handleSaveRateio(password);
  };

  return (
    <Transition appear show={isOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-100" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full flex-col justify-center items-center content-center">
          <div className="flex flex-col min-h-full items-center justify-center p-4 text-center w-full md:max-w-xs">
            <div className="flex flex-col gap-4 w-full">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                className="bg-theme-4 py-2 px-4 rounded lg:text-2xl placeholder:text-black w-full font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-around py-4 w-full md:max-w-xs">
              <button
                className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-xl h-fit flex items-center gap-3 text-theme-4"
                onClick={() => handleCheckPassword()}
              >
                Editar e Salvar
              </button>
              <button
                className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-xl h-fit flex items-center gap-3 text-theme-4"
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default PasswordModalEdit;
