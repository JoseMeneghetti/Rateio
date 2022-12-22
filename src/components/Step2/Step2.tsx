import React, { FormEvent, useRef, useState } from "react";
import { Minus, PencilSimple, PlusCircle, Trash } from "phosphor-react";

import ModalEdit from "./ModalEdit/ModalEdit";
import PopoverFoods from "../PopoverFoods/PopoverFoods";
import { ListOfParticipants } from "../../Types/global";
import Image from "next/image";
import { PhotoUploader } from "../PhotoUploader/PhotoUploader";
import CardStep2 from "./CardStep2/CardStep2";
import uuid from "react-uuid";

interface Props {
  formRef: any;
  listOfParticipants: ListOfParticipants[];
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
  const [icon, setIcon] = useState<any>(null);
  const [thumbPhoto, setThumbPhoto] = useState<Uint8Array | null>(null);

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

    const formPlusIcons = {
      id: uuid(),
      ...dataForm,
      icon: icon,
      thumbPhoto: thumbPhoto,
    };

    setListOfParticipants([...listOfParticipants, formPlusIcons]);

    if (formRef) {
      formRef?.current?.reset();
    }

    setOpenEdit(false);
    setIcon(null);
    setOpenExpenses(false);
    setThumbPhoto(null);
  }

  function handleEdit(id: string) {
    const find = listOfParticipants.find((el) => el.id === id);
    setIsOpenModal(true);
    setEditablePerson(structuredClone(find));
  }

  function handleDelete(id: string) {
    const find = listOfParticipants.find((el) => el.id === id);
    console.log(find);
    const newData = listOfParticipants.filter(
      (el: ListOfParticipants) => el.id !== find?.id
    );
    setListOfParticipants([...newData]);
  }

  return (
    <>
      <div className="my-10 bg-theme-5 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
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
              <span className="text-center lg:text-xl mb-2 text-theme-4">
                Adicione um novo participante
              </span>
              <input
                id="participant"
                name="participant"
                placeholder="Nome do Participante"
                className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-full"
                required
                ref={nameRef}
              ></input>
              {/* <PhotoUploader setThumbPhoto={setThumbPhoto} /> */}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (nameRef?.current?.value !== "") {
                  setOpenExpenses(true);
                }
              }}
              className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-4 rounded-lg text-2xl h-fit"
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
            <span className="text-center lg:text-xl mb-2 text-theme-4">
              Gastou com algo?
            </span>
            <div className="flex flex-row gap-5">
              <button
                type="button"
                onClick={() => setOpenEdit(true)}
                className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-4 rounded-lg lg:text-3xl h-fit"
              >
                Sim
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-4 rounded-lg lg:text-3xl h-fit"
              >
                Nao
              </button>
            </div>
          </div>

          <div
            className="flex flex-col lg:flex-row justify-start items-center w-full gap-4"
            style={openEdit ? { display: "flex" } : { display: "none" }}
          >
            <label className="text-theme-4">No que gastou?</label>
            <input
              id="description"
              name="description"
              placeholder="Nome do gasto"
              className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-full "
              required={openEdit}
              defaultValue={""}
            ></input>
            <label className="text-theme-4">Quanto?</label>
            <input
              id="expenses"
              name="expenses"
              placeholder="Quanto gastou?"
              type="number"
              className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-full "
              required={openEdit}
            ></input>
            <PopoverFoods setIcon={setIcon} icon={icon} />
            <button
              type="submit"
              className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-4 rounded-lg text-3xl h-fit"
            >
              <PlusCircle />
            </button>
          </div>
        </form>
      </div>

      <CardStep2
        listOfParticipants={listOfParticipants}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setListOfParticipants={setListOfParticipants}
      />

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
