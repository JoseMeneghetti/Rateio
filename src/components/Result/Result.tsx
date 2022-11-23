import { useEffect, useState } from "react";
import { ListOfParticipants } from "../../pages";
import {
  FindHowManyPayWithoutDiferences,
  ListForResult,
  Total,
} from "../../Types/global";

interface Props {
  total: Total[];
  listOfParticipants: ListOfParticipants[];
  findHowManyPayWithoutDiferences: FindHowManyPayWithoutDiferences[];
  listForResult: ListForResult[];
}

export default function Result({
  total,
  listOfParticipants,
  findHowManyPayWithoutDiferences,
  listForResult
}: Props) {

  if (
    !listForResult ||
    !listOfParticipants ||
    !findHowManyPayWithoutDiferences ||
    total
  ) {
    <div>Loading..</div>;
  }

  console.log(listForResult);
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
      {listForResult?.map((participants: ListForResult, index: number) => {
        const totalPerson = total.find(
          (el) => el.name === participants.participant
        );

        return (
          <tr
            key={`${participants.participant}-${index}`}
            className="rounded-lg"
          >
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
                    R${Number(value)?.toFixed(2) ?? 0}
                  </td>
                );
              }
            )}

            <td className="text-center rounded-lg bg-yellow-theme p-1 border-4 border-cardbg">
              R${Number(participants.expenses).toFixed(2)}
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
                ? `Recebe R$ ${Number(totalPerson?.value).toFixed(2)}`
                : `Deve R$ ${Number(totalPerson?.value).toFixed(2)}`}
            </td>
          </tr>
        );
      })}
    </table>
  );
}
