import { FormEvent, useEffect, useRef, useState } from "react";
import { ListOfParticipants } from "../../pages";
import { useRouter } from "next/router";

interface Props {
  listOfParticipants: any;
  nomeRateio: string;
}
export default function Step3({ listOfParticipants, nomeRateio }: Props) {
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

        return [
          ...total,
          { participants: [participantName], expenseName: typeOfExpense },
        ];
      },
      []
    );

    router.push({
      pathname: "/resultado",
      query: {
        listOfParticipants: JSON.stringify(listOfParticipants),
        participantsShare: JSON.stringify(participantsShare),
        nomeRateio: nomeRateio,
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
      <div className="flex w-full bg-yellow-500 rounded p-2 m-2 flex-col">
        <span className="flex justify-center text-2xl mb-4">
          Quem participou?
        </span>
        <div className="flex flex-row justify-center gap-5 flex-wrap">
          {typesOfExpenses.map((expenseName: string) => (
            <div key={expenseName}>
              <div className="shadow-custom py-2 px-5 rounded m-2">
                <strong className="capitalize mb-1 block text-center">
                  {expenseName}
                </strong>
                {names.map((name: string) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 capitalize text-lg"
                  >
                    <input
                      type="checkbox"
                      id={`${expenseName}-${name}`}
                      name={`${expenseName}-${name}`}
                      defaultChecked={true}
                    ></input>
                    <label>{name}</label>
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
          className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-3xl h-fit"
        >
          Calcular
        </button>
      </div>
    </form>
  );
}
