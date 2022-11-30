import React, { FormEvent, useRef, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { ListOfParticipants } from "../../pages";

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

  return (
    <>
      <div className="my-10 bg-yellow-500 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
        <form
          className="flex justify-start flex-col items-center"
          onSubmit={addParticipant}
          ref={formRef}
        >
          <div
            className="flex flex-row justify-start items-center w-full gap-4"
            style={
              !openExpenses && !openEdit
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <input
              id="participant"
              name="participant"
              placeholder="Nome"
              className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-full "
              required
              ref={nameRef}
            ></input>

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

      <div className="my-1 rounded-lg p-1 gap-2 w-full flex flex-col">
        {listOfParticipants.map((participant: ListOfParticipants) => (
          <div
            className="bg-yellow-500 rounded-xl w-full flex flex-row justify-between p-2"
            key={participant.participant}
          >
            <div className="flex items-center">
              <label>Nome:</label>
              <span className="px-4 lg:text-lg w-full font-bold ">
                {participant.participant}
              </span>
            </div>
            <div className="flex items-center">
              {participant.description ? (
                <>
                  <label>Gastou em:</label>
                  <span className="px-4 lg:text-lg w-full font-bold ">
                    {participant.description}
                  </span>
                </>
              ) : (
                <span className="px-4 lg:text-lg w-full font-bold text-center">
                  Nao gastou em nada
                </span>
              )}
            </div>
            <div className="flex items-center">
              <label>Quanto Gastou:</label>
              <span className="px-4 lg:text-lg w-full font-bold ">
                {participant.expenses ? `R$ ${participant.expenses}` : "R$ 0"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
