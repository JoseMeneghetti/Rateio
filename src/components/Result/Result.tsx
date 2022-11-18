import { useEffect, useState } from "react";
import { ListOfParticipants } from "../../pages";
import { FindHowManyPayWithoutDiferences, Total } from "../../Types/global";

interface Props {
  total: Total[];
  listOfParticipants: ListOfParticipants[];
  findHowManyPayWithoutDiferences: FindHowManyPayWithoutDiferences[];
}

export default function Result({
  total,
  listOfParticipants,
  findHowManyPayWithoutDiferences,
}: Props) {
  // const [expensesNames, setexpensesNames] = useState<string[] | any>([]);

  // useEffect(() => {
  //   if (findHowManyPayWithoutDiferences) {
  //     setexpensesNames(
  //       findHowManyPayWithoutDiferences.map((el) => el.expenseName)
  //     );
  //   }
  // }, [findHowManyPayWithoutDiferences]);

  // console.log(expensesNames)

  return (
    <table className="bg-cardbg rounded-lg w-full shadow-custom">
      <tr className="rounded-lg">
        <th className="text-white">Nome</th>
        {findHowManyPayWithoutDiferences.map((expanse, index: number) => (
          <th
            key={`${expanse.expenseName}-${index}`}
            className="capitalize text-white"
          >
            {expanse.expenseName}
          </th>
        ))}
        <th className="text-white">Quanto Gastou</th>
        <th className="text-white">Total</th>
      </tr>
      {listOfParticipants?.map((participants, index: number) => {
        const totalPerson = total.find(
          (el) => el.name === participants.participant
        );
        const diferencesPerson = findHowManyPayWithoutDiferences.find((el) =>
          el.participants.find((el2) => el2.name === participants.participant)
        );
        console.log(diferencesPerson);
        return (
          <tr key={`${participants.participant}-${index}`} className="rounded-lg">
            <td className="text-center rounded-lg bg-yellow-theme p-1 border-4 border-cardbg">
              {participants.participant}
            </td>

            {findHowManyPayWithoutDiferences.map(
              (expenseDiferences, index: number) => {
                const value = expenseDiferences.participants.find(
                  (diferenceParticipants) =>
                    diferenceParticipants.name === participants.participant
                )?.value;

                return (
                  <td
                    className="text-center rounded-lg bg-yellow-theme p-1 border-4 border-cardbg"
                    key={`${value}-${index}`}
                  >
                    R${value ?? 0}
                  </td>
                );
              }
            )}

            <td className="text-center rounded-lg bg-yellow-theme p-1 border-4 border-cardbg">
              R${participants.expenses}
            </td>
            <td
              className="text-center rounded-lg bg-yellow-theme p-1 border-4 border-cardbg"
              style={
                totalPerson && totalPerson?.value > 0
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {totalPerson && totalPerson?.value > 0
                ? `Recebe R$ ${totalPerson?.value}`
                : `Deve R$ ${totalPerson?.value}`}
            </td>
          </tr>
        );
      })}
    </table>
  );
}
