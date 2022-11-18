import React, { useEffect, useState } from "react";
import { ListOfParticipants } from ".";
import { GetServerSideProps } from "next";
import CardResultado from "../components/Card/CardResultado";
import Result from "../components/Result/Result";

type Data = {
  listOfParticipants: ListOfParticipants[] | any;
  participantsShare: string[] | any;
  nomeRateio: string;
};

interface Props {
  data: Data;
}
export default function Resultado({ data }: Props) {
  const participantsShare: any = data.participantsShare;
  const listOfParticipants = data.listOfParticipants;
  const nomeRateio = data.nomeRateio;

  const [findHowManyPayWithoutDiferences, setFindHowManyPayWithoutDiferences] =
    useState([]);
  const [onlyParticipants, setOnlyParticipants] = useState([]);
  const [sumOfPaids, setSumOfPaids] = useState([]);
  const [total, setTotal] = useState([]);

  console.log(sumOfPaids, " sumOfPaids");
  console.log(onlyParticipants, " onlyParticipants");
  
  useEffect(() => {
    if (listOfParticipants.length && participantsShare.length) {
      const findHowManyPayWithoutDiferences = participantsShare.reduce(
        (total: any, currentElement: any) => {
          const findWhoPaid = listOfParticipants.find(
            (participants: ListOfParticipants) =>
              participants.description === currentElement.expenseName
          );

          const perPerson = currentElement.participants.map((name: string) => {
            return {
              name: name,
              value: findWhoPaid.expenses / currentElement.participants.length,
            };
          });

          return [
            ...total,
            {
              expenseName: currentElement.expenseName,
              participants: [...perPerson],
            },
          ];
        },
        []
      );

      const onlyParticipants = findHowManyPayWithoutDiferences.reduce(
        (total: any, currentElement: any) => {
          return [...total, ...currentElement.participants];
        },
        []
      );

      const sumOfPaids = onlyParticipants.reduce(
        (total: any, currentElement: any) => {
          if (total.find((el: any) => el.name === currentElement.name)) {
            total.find((el: any) => el.name === currentElement.name).value +=
              currentElement.value;
            return [...total];
          }
          return [
            ...total,
            { name: currentElement.name, value: currentElement.value },
          ];
        },
        []
      );

      const total = sumOfPaids.map((sum: any) => {
        const findWhoPaid = listOfParticipants.find(
          (participants: ListOfParticipants) =>
            participants.participant === sum.name
        );

        return { name: sum.name, value: findWhoPaid.expenses - sum.value };
      });

      findHowManyPayWithoutDiferences &&
        setFindHowManyPayWithoutDiferences(findHowManyPayWithoutDiferences);
      onlyParticipants && setOnlyParticipants(onlyParticipants);
      sumOfPaids && setSumOfPaids(sumOfPaids);
      total && setTotal(total);

      console.log(
        "findHowManyPayWithoutDiferences",
        findHowManyPayWithoutDiferences
      );
      console.log("onlyParticipants", onlyParticipants);
      console.log("sumOfPaids", sumOfPaids);
      console.log("total", total);
    }
  }, [listOfParticipants, participantsShare]);

  // console.log(listOfParticipants);
  // console.log(Object.entries(participantsShare));

  if (!listOfParticipants || !participantsShare) {
    return <div> Ocorreu um erro...</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center pt-10">
      <h1 className="text-3xl text-white">{nomeRateio}</h1>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10 justify-center">
        <CardResultado
          findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
          listOfParticipants={listOfParticipants}
        />
      </div>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10">
        <Result
          total={total}
          listOfParticipants={listOfParticipants}
          findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  // Fetch data from external API

  const data = {
    listOfParticipants: JSON.parse(context.query.listOfParticipants as string),
    participantsShare: JSON.parse(context.query.participantsShare as string),
    nomeRateio: context.query.nomeRateio as string,
  };
  // Pass data to the page via props

  return {
    props: {
      data,
    },
  };
};
