import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { MagnifyingGlass } from "phosphor-react";
import { Fragment, useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  message: string;
}
const DialogModal = ({ isOpen, setIsOpen, message }: Props) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-rateio p-6 text-left align-middle shadow-custom transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-theme-1 p-4 text-center"
                >
                  {message}
                </Dialog.Title>
                <div className="flex justify-center p-4">
                  <button
                    className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Fechar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogModal;
