import { Dialog, Transition } from "@headlessui/react";
import { PlusCircle, X } from "phosphor-react";
import { FormEvent, Fragment, useRef, useState } from "react";
import { ListOfParticipants } from "../../../pages";

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
  const [openExpenses, setOpenExpenses] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const nameRef = useRef<any>(null);
  if (!editablePerson) {
    return <></>;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const dataForm = Object.fromEntries(form);

    const newData = listOfParticipants.filter(
      (el: ListOfParticipants) => el.participant !== editablePerson.participant
    );

    setListOfParticipants([...newData, dataForm]);
    setIsOpenModal(false);
    setOpenExpenses(false);
    setOpenEdit(false);
  }

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setOpenExpenses(false);
          setOpenEdit(false);
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
            <Dialog.Panel className="relative w-full max-w-sm lg:max-w-lg rounded bg-yellow-500 shadow-custom">
              <button className="absolute top-0 right-0 p-2">
                <X
                  color="black"
                  size={20}
                  weight={"bold"}
                  onClick={() => {
                    setIsOpenModal(false);
                    setOpenExpenses(false);
                    setOpenEdit(false);
                  }}
                />
              </button>
              <div className="my-10 bg-yellow-500 bg-opacity-90 h-fit rounded-lg px-5">
                <div
                  className="flex flex-row justify-start items-end w-full gap-4"
                  style={
                    !openExpenses && !openEdit
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <div className="flex flex-col w-full">
                    <span className="text-center lg:text-xl mb-2">
                      Edite esse participante
                    </span>
                    <input
                      id="participant"
                      name="participant"
                      className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full"
                      required
                      defaultValue={editablePerson.participant}
                    ></input>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (nameRef?.current?.value !== "") {
                        setOpenExpenses(true);
                      }
                    }}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-3xl h-fit"
                  >
                    <PlusCircle />
                  </button>
                </div>

                <div
                  className="flex flex-row justify-start items-center w-full gap-4"
                  style={
                    openExpenses && !openEdit
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <span>Gastou com algo?</span>
                  <button
                    type="button"
                    onClick={() => setOpenEdit(true)}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg lg:text-3xl h-fit"
                  >
                    Sim
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg lg:text-3xl h-fit"
                  >
                    Nao
                  </button>
                </div>

                <div
                  className="flex flex-col justify-start items-center w-full gap-4"
                  style={openEdit ? { display: "flex" } : { display: "none" }}
                >
                  <label>No que gastou?</label>
                  <input
                    id="description"
                    name="description"
                    placeholder="Nome do gasto"
                    className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full "
                    required={openEdit}
                  ></input>
                  <label>Quanto?</label>
                  <input
                    id="expenses"
                    name="expenses"
                    placeholder="Quanto gastou?"
                    type="number"
                    className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full "
                    required={openEdit}
                  ></input>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-3xl h-fit"
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
