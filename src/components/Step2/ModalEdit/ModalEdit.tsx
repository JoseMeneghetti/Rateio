import { Dialog, Transition } from "@headlessui/react";
import { PlusCircle, X } from "phosphor-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { ListOfParticipants } from "../../../Types/global";
import PopoverFoods from "../../PopoverFoods/PopoverFoods";

interface Props {
  setIsOpenModal: any;
  isOpenModal: boolean;
  editablePerson: ListOfParticipants | any;
  setListOfParticipants: any;
  listOfParticipants: ListOfParticipants[];
}

export default function ModalEdit({
  setIsOpenModal,
  isOpenModal,
  editablePerson,
  setListOfParticipants,
  listOfParticipants,
}: Props) {
  const [icon, setIcon] = useState<any>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const dataForm = Object.fromEntries(form);

    const newData = listOfParticipants.filter(
      (el: ListOfParticipants) => el.id !== editablePerson.id
    );

    const EditedData = {
      description: dataForm.description,
      expenses: dataForm.expenses,
      icon: icon,
      id: editablePerson.id,
      participant: editablePerson.participant,
      thumbPhoto: editablePerson.thumbPhoto,
    };

    setListOfParticipants([...newData, EditedData]);

    setIsOpenModal(false);
    setIcon(null);
  }

  useEffect(() => {
    if (editablePerson?.icon) {
      setIcon(editablePerson?.icon);
    }
  }, [editablePerson]);

  if (!editablePerson) {
    return <></>;
  }

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setIcon(null);
        }}
      >
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

        <form
          className="fixed inset-0 flex items-center justify-center p-4"
          onSubmit={handleSubmit}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-sm lg:max-w-lg rounded bg-theme-5 shadow-custom">
              <button className="absolute top-0 right-0 p-2">
                <X
                  color="black"
                  size={20}
                  weight={"bold"}
                  onClick={() => {
                    setIsOpenModal(false);
                    setIcon(null);
                  }}
                />
              </button>
              <div className="my-10 bg-theme-5 bg-opacity-90 h-fit rounded-lg px-5">
                <div className="flex flex-col justify-start items-center w-full gap-4">
                  <label className="text-theme-4">No que gastou?</label>
                  <input
                    id="description"
                    name="description"
                    placeholder="Nome do gasto"
                    className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-full "
                    required
                    defaultValue={editablePerson.description}
                  ></input>
                  <label className="text-theme-4">Quanto?</label>
                  <input
                    id="expenses"
                    name="expenses"
                    placeholder="Quanto gastou?"
                    type="number"
                    className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-full "
                    required
                    defaultValue={editablePerson.expenses}
                  ></input>
                  <PopoverFoods setIcon={setIcon} icon={icon} />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cardbg hover:bg-blue-6 text-theme-4 rounded-lg text-3xl h-fit"
                  >
                    <PlusCircle />
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </form>
      </Dialog>
    </Transition>
  );
}
