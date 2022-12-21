import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SwitchButton from "./SwitchButton/SwitchButton";
import {
  FindHowManyPayWithoutDiferences,
  ListOfParticipants,
} from "../../Types/global";

import pako from "pako";
import { encodeBase64 } from "../../lib/utils/base64";

interface Props {
  listOfParticipants: ListOfParticipants[] | any;
  nomeRateio: string;
  findHowManyPayWithoutDiferences?: FindHowManyPayWithoutDiferences[];
}

export default function Step3({
  listOfParticipants,
  nomeRateio,
  findHowManyPayWithoutDiferences,
}: Props) {
  const [typesOfExpenses, setTypesOfExpenses] = useState([]);
  const [names, setNames] = useState([]);

  const participationRef = useRef<any>(null);

  const router = useRouter();

  function setParticipation(event: FormEvent) {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    const dataForm = Object.keys(Object.fromEntries(form));

    const participantsShare = dataForm.reduce(
      (total: any, currentElement: any) => {
        const splited = currentElement.split("-");
        const typeOfExpense = splited[0];
        const participantName = splited[1];

        if (total.find((el: any) => el.expenseName === typeOfExpense)) {
          total
            .find((el: any) => el.expenseName === typeOfExpense)
            .participants.push(participantName);
          return [...total];
        }
        const icon = listOfParticipants.find(
          (el: ListOfParticipants) => el.description === typeOfExpense
        ).icon;
        return [
          ...total,
          {
            participants: [participantName],
            expenseName: typeOfExpense,
            icon: icon,
          },
        ];
      },
      []
    );

    const data = JSON.stringify({
      listOfParticipants: listOfParticipants,
      participantsShare: participantsShare,
      nomeRateio: nomeRateio,
    });

    var pakoDeflated = pako.deflate(data);

    const pakoEncoded64 = encodeBase64(pakoDeflated);

    console.log("pako base64", pakoEncoded64, pakoEncoded64.length);

    router.push({
      pathname: "/resultado",
      query: {
        result: pakoEncoded64,
      },
    });
  }

  useEffect(() => {
    setTypesOfExpenses(
      listOfParticipants
        .filter(
          (participants: ListOfParticipants) => participants.description.length
        )
        .map((participant: ListOfParticipants) => participant.description)
    );

    setNames(
      listOfParticipants.reduce(
        (total: any, participant: ListOfParticipants) => {
          if (total.find((el: any) => el === participant.participant)) {
            return [...total];
          }
          return [...total, participant.participant];
        },
        []
      )
    );
  }, [listOfParticipants]);

  return (
    <form
      className="my-10 w-5/6 h-fit rounded-lg p-5"
      ref={participationRef}
      onSubmit={setParticipation}
    >
      <div className="flex w-full bg-theme-5 rounded p-2 m-2 flex-col">
        <span className="flex justify-center text-2xl mb-4 text-theme-4">
          Quem participou?
        </span>
        <div className="flex flex-row justify-center gap-5 flex-wrap">
          {typesOfExpenses.map((expenseName: string) => (
            <div key={expenseName}>
              <div className="shadow-custom py-2 px-5 rounded m-2">
                <strong className="capitalize mb-1 block text-center text-theme-4">
                  {expenseName}
                </strong>
                {names.map((name: string) => (
                  <div className="flex items-center" key={name}>
                    <SwitchButton
                      name={`${expenseName}-${name}`}
                      findHowManyPayWithoutDiferences={
                        findHowManyPayWithoutDiferences
                      }
                    />
                    <label className="ml-3 min-w-0 flex-1 text-theme-4 capitalize">
                      {name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-theme-2 hover:bg-theme-3 text-theme-6 rounded-lg text-3xl h-fit"
        >
          Calcular
        </button>
      </div>
    </form>
  );
}
