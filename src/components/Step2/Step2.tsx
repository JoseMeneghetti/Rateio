import React, { FormEvent, useRef, useState } from "react";
import { Minus, PencilSimple, PlusCircle, Trash } from "phosphor-react";
import { ListOfParticipants } from "../../pages";
import ModalEdit from "./ModalEdit/ModalEdit";

interface Props {
  formRef: any;
  listOfParticipants: any;
  setListOfParticipants: any;
}
export default function Step2({
  formRef,
  listOfParticipants,
  setListOfParticipants,
}: Props) {
  const [openExpenses, setOpenExpenses] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [editablePerson, setEditablePerson] = useState<any>(null);

  const nameRef = useRef<any>(null);

  function addParticipant(event: FormEvent) {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const dataForm = Object.fromEntries(form);

    const duplicated =
      dataForm.description !== "" &&
      listOfParticipants.find(
        (list: ListOfParticipants) => list.description === dataForm.description
      );

    if (duplicated) {
      alert("Tipo de gasto ja cadastrado");
      return;
    }

    setListOfParticipants([...listOfParticipants, dataForm]);

    if (formRef) {
      formRef?.current?.reset();
    }

    setOpenEdit(false);
    setOpenExpenses(false);
  }

  function handleEdit(params: ListOfParticipants) {
    setIsOpenModal(true);
    setEditablePerson(params);
  }

  function handleDelete(params: ListOfParticipants) {
    const newData = listOfParticipants.filter(
      (el: ListOfParticipants) => el.participant !== params.participant
    );
    setListOfParticipants([...newData]);
  }

  return (
    <>
      <div className="my-10 bg-yellow-500 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
        <form
          className="flex justify-start flex-col items-center"
          onSubmit={addParticipant}
          ref={formRef}
        >
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
                Adicione um novo participante
              </span>
              <input
                id="participant"
                name="participant"
                placeholder="Nome"
                className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full"
                required
                ref={nameRef}
              ></input>
            </div>
            <button
              type="button"
              onClick={() => {
                if (nameRef?.current?.value !== "") {
                  setOpenExpenses(true);
                }
              }}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-2xl h-fit"
            >
              <PlusCircle />
            </button>
          </div>

          <div
            className="flex flex-col justify-start items-center w-full gap-4"
            style={
              openExpenses && !openEdit
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <span className="text-center lg:text-xl mb-2">
              Gastou com algo?
            </span>
            <div className="flex flex-row gap-5">
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
          </div>

          <div
            className="flex flex-col lg:flex-row justify-start items-center w-full gap-4"
            style={openEdit ? { display: "flex" } : { display: "none" }}
          >
            <label>No que gastou?</label>
            <input
              id="description"
              name="description"
              placeholder="Nome do gasto"
              className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full "
              required={openEdit}
              defaultValue={""}
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
        </form>
      </div>

      <div className="my-1 rounded-lg p-1 gap-2 w-full flex flex-row flex-wrap justify-center items-center">
        {listOfParticipants.map((participant: ListOfParticipants) => (
          <div
            className="bg-yellow-500 rounded-xl flex flex-row justify-center p-3 lg:max-w-[390px] lg:w-[390px] min-h-[116px] w-full"
            key={participant.participant}
          >
            <div className="flex items-center w-1/3 flex-col justify-center">
              <p className="w-12 h-12 flex border-2 border-black rounded-full items-center justify-center text-2xl">
                {participant.participant &&
                  participant.participant[0]?.toUpperCase()}
              </p>
              <span className="px-1 lg:text-lg w-full font-bold text-center break-words capitalize">
                {participant.participant}
              </span>
            </div>

            <div className="flex flex-col gap-4 w-2/3 justify-center">
              <div className="flex items-center">
                <>
                  <label className="w-full">Gastou em:</label>
                  <span className="px-1 lg:text-lg w-full font-bold break-words">
                    {participant.description !== "" ? (
                      participant.description
                    ) : (
                      <Minus
                        size={24}
                        color="#0d0c0c"
                        weight="bold"
                        className="text-center"
                      />
                    )}
                  </span>
                </>
              </div>
              <div className="flex items-center">
                <label className="w-full">Quanto Gastou:</label>
                <span className="px-1 lg:text-lg w-full font-bold break-words">
                  {participant.expenses ? `R$ ${participant.expenses}` : "R$ 0"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <PencilSimple
                size={24}
                className="cursor-pointer"
                onClick={() => handleEdit(participant)}
              />
              <Trash
                size={24}
                className="cursor-pointer"
                onClick={() => handleDelete(participant)}
              />
            </div>
          </div>
        ))}
      </div>
      <ModalEdit
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        editablePerson={editablePerson}
        setListOfParticipants={setListOfParticipants}
        listOfParticipants={listOfParticipants}
      />
    </>
  );
}
