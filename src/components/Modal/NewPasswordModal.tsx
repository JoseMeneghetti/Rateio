import { Transition } from "@headlessui/react";
import { MagnifyingGlass } from "phosphor-react";
import { Fragment, useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleCreateRateio(password: string): void;
}

const NewPasswordModal = ({ isOpen, handleCreateRateio, setIsOpen }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleCheckPassword = () => {
    if (confirmPassword === password) {
      handleCreateRateio(password);
    } else {
      setErro("As senhas estao diferentes. Tente novamente.");
      setTimeout(() => setErro(""), 3000);
    }
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
          <div className="flex min-h-full items-center justify-center p-4 text-center flex-col ">
            {erro && (
              <span className="font-bold my-4 text-red-700">{erro}</span>
            )}
            <div className="flex flex-col gap-4 w-full md:max-w-xs">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                className="bg-theme-4 py-2 px-4 rounded lg:text-2xl placeholder:text-black w-full font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                placeholder="Confirme a Senha"
                className="bg-theme-4 py-2 px-4 rounded lg:text-2xl placeholder:text-black w-full font-bold"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-around py-4 w-full md:max-w-xs">
              <button
                className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-xl h-fit flex items-center gap-3 text-theme-4"
                onClick={() => handleCheckPassword()}
              >
                Criar Rateio
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

export default NewPasswordModal;
