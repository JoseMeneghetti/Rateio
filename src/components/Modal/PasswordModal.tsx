import { Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import Spinner from "../Spinner/Spinner";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  id: number | null;
}

const PasswordModal = ({ isOpen, setIsOpen, id }: Props) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckPassword = () => {
    setIsLoading(true);

    axios
      .post("/api/password", {
        id: id,
        password: password,
      })
      .then((response) => {
        if (response.data.code === 403) {
          setErrorMsg(true);
          setTimeout(() => setErrorMsg(false), 3000);
          setIsLoading(false);
        } else {
          setIsOpen(false);
          setIsLoading(false);
        }
      });
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
          {isLoading ? (
            <div className="fixed inset-0 z-20 w-full h-full flex justify-center items-center bg-rateio bg-opacity-90 top-0 left-0">
              <Spinner customClass="fill-black" size="h-20 w-20" />
            </div>
          ) : (
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="flex flex-col gap-4">
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
              </div>
              <div className="flex justify-center p-4">
                <button
                  className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
                  onClick={() => handleCheckPassword()}
                >
                  Entrar
                </button>
              </div>
            </div>
          )}
          {errorMsg && (
            <span className="text-red-800 font-bold py-4">
              Senha Incorreta!
            </span>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default PasswordModal;
