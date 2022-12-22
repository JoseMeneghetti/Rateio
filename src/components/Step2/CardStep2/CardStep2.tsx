import Image from "next/image";
import { Minus, PencilSimple, Plus, Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { ListCard, ListOfParticipants } from "../../../Types/global";
import ModalAddExpense from "../ModalAddExpense/ModalAddExpense";

interface Props {
  listOfParticipants: ListOfParticipants[];
  setListOfParticipants: any;
  handleEdit: any;
  handleDelete: any;
}

export default function CardStep2({
  listOfParticipants,
  handleDelete,
  handleEdit,
  setListOfParticipants,
}: Props) {
  const [listCard, setListCard] = useState<ListCard[] | null>(null);
  const [isOpenModalAdd, setisOpenModalAdd] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  useEffect(() => {
    const newListOfParticipants = structuredClone(listOfParticipants);

    const listNew: ListCard[] = newListOfParticipants.reduce(
      (total: any, currentElement: ListOfParticipants) => {
        const sameAsTotal = total.find(
          (el: any) => el.name === currentElement.participant
        );

        if (sameAsTotal) {
          sameAsTotal.expenseCard.push({
            id: currentElement.id,
            description: currentElement.description,
            expenses: currentElement.expenses,
            icon: currentElement.icon,
            thumbPhoto: currentElement.thumbPhoto,
          });
          return [...total];
        }

        return [
          ...total,
          {
            name: currentElement.participant,
            expenseCard: [
              {
                id: currentElement.id,
                description: currentElement.description,
                expenses: currentElement.expenses,
                icon: currentElement.icon,
                thumbPhoto: currentElement.thumbPhoto,
              },
            ],
          },
        ];
      },
      []
    );

    setListCard(listNew);
  }, [listOfParticipants]);

  console.log(listCard);
  console.log(listOfParticipants);

  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center gap-2">
      {listCard?.map((participant: ListCard) => (
        <div
          className="p-2 flex flex-col justify-center items-center bg-theme-5 rounded-lg mt-14 w-full mx-2 lg:max-w-[390px] lg:mx-0"
          key={participant.name}
        >
          <div className="flex items-center flex-col justify-center relative">
            <p className="w-20 h-20 flex border-2 border-black rounded-full items-center justify-center text-2xl text-theme-4 absolute -top-14 bg-theme-5">
              {participant.name && participant.name[0]?.toUpperCase()}
            </p>
            <span className="px-1 text-lg lg:text-xl w-full font-bold text-center break-words capitalize text-theme-4 pt-8">
              {participant.name}
            </span>
          </div>
          {participant.expenseCard.map((expenseCard) => (
            <div
              className="bg-theme-5 rounded-xl flex flex-row justify-center p-2 lg:max-w-[370px] lg:w-[370px] min-h-[116px] w-full shadow-custom my-2"
              key={expenseCard.description}
            >
              {expenseCard.icon && (
                <div className="w-1/6 flex justify-center items-center">
                  <Image
                    src={`/food/${expenseCard.icon}.png`}
                    width={50}
                    height={50}
                    alt={""}
                  />
                </div>
              )}
              <div className="flex flex-col gap-4 w-4/6 justify-center ml-2">
                <div className="flex items-center">
                  <>
                    <label className="w-full text-theme-4">Gastou em:</label>
                    <span className="px-1 capitalize lg:text-lg w-full font-bold break-words text-theme-4">
                      {expenseCard.description !== "" ? (
                        expenseCard.description
                      ) : (
                        <Minus
                          size={24}
                          weight="bold"
                          className="text-center text-theme-4"
                        />
                      )}
                    </span>
                  </>
                </div>
                <div className="flex items-center">
                  <label className="w-full text-theme-4">Quanto Gastou:</label>
                  <span className="px-1 lg:text-lg w-full font-bold break-words text-theme-4">
                    {expenseCard.expenses
                      ? `R$ ${expenseCard.expenses}`
                      : "R$ 0"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-5 w-1/6">
                <PencilSimple
                  size={24}
                  className="cursor-pointer"
                  onClick={() => handleEdit(expenseCard.id)}
                />
                <Trash
                  size={24}
                  className="cursor-pointer"
                  onClick={() => handleDelete(expenseCard.id)}
                />
              </div>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-6 rounded-lg lg:text-lg h-fit flex items-center gap-3 text-theme-4 my-2"
            onClick={(e) => {
              e.preventDefault();
              setisOpenModalAdd(true);
              setSelectedParticipant(participant);
            }}
          >
            Adicionar gasto
            <Plus />
          </button>
        </div>
      ))}
      <ModalAddExpense
        isOpenModalAdd={isOpenModalAdd}
        setisOpenModalAdd={setisOpenModalAdd}
        listOfParticipants={listOfParticipants}
        setListOfParticipants={setListOfParticipants}
        selectedParticipant={selectedParticipant}
      />
    </div>
  );
}
