import React, { useEffect, useState } from "react";
import { ListOfParticipants } from ".";
import { GetServerSideProps } from "next";
import CardResultado from "../components/Card/CardResultado";
import Result from "../components/Result/Result";
import {
  FindHowManyPayWithoutDiferences,
  ListForResult,
  OnlyParticipants,
  SumOfPaids,
  Total,
} from "../Types/global";
import Sugestion from "../components/Result/Sugestion";
import axios from "axios";

type Data = {
  listOfParticipants: ListOfParticipants[] | any;
  participantsShare: string[] | any;
  nomeRateio: string;
  api_key: string;
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
  const [listForResult, setListForResult] = useState<ListForResult | any>([]);
  const [shortURL, setShortURL] = useState("");
  async function GerarLink() {
    const ref = window.location.href;

    let headersList = {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: process.env.NEXT_PUBLIC_API_SHORT_IO,
    };
    console.log(headersList)
    let bodyContent = JSON.stringify({
      originalURL: `${ref}`,
      domain: "5ve5.short.gy",
    });

    let reqOptions = {
      url: "https://api.short.cm/links/public",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    setShortURL(response.data.shortURL);
  }

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

      const listForResult = listOfParticipants.reduce(
        (total: any, participant: ListOfParticipants) => {
          if (
            total.find((el: any) => el.participant === participant.participant)
          ) {
            total.find(
              (el: any) => el.participant === participant.participant
            ).expenses += Number(participant.expenses);
            return [...total];
          }
          return [
            ...total,
            {
              participant: participant.participant,
              expenses: Number(participant.expenses),
            },
          ];
        },
        []
      );

      const onlyParticipants = findHowManyPayWithoutDiferences.reduce(
        (total: any, currentElement: FindHowManyPayWithoutDiferences) => {
          return [...total, ...currentElement.participants];
        },
        []
      );

      const sumOfPaids = onlyParticipants.reduce(
        (total: any, currentElement: OnlyParticipants) => {
          if (total.find((el: any) => el.name === currentElement.name)) {
            total.find((el: any) => el.name === currentElement.name).value +=
              currentElement.value;
            return [...total];
          }
          return [
            ...total,
            {
              name: currentElement.name,
              value: currentElement.value,
            },
          ];
        },
        []
      );

      const total = sumOfPaids.map((sum: SumOfPaids) => {
        const findWhoPaid = listForResult.find(
          (participants: ListForResult) => participants.participant === sum.name
        );

        return {
          name: sum.name,
          value: Number(findWhoPaid?.expenses - sum.value).toFixed(2),
        };
      });

      findHowManyPayWithoutDiferences &&
        setFindHowManyPayWithoutDiferences(findHowManyPayWithoutDiferences);
      onlyParticipants && setOnlyParticipants(onlyParticipants);
      sumOfPaids && setSumOfPaids(sumOfPaids);
      listForResult && setListForResult(listForResult);
      total && setTotal(total);
    }
  }, [listOfParticipants, participantsShare]);

  if (!listOfParticipants || !participantsShare) {
    return <div> Ocorreu um erro...</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold text-white">{nomeRateio}</h1>
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
          listForResult={listForResult}
        />
      </div>
      <h1 className="text-4xl font-bold text-white my-4">
        Sugestao de Pagamentos
      </h1>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10 justify-center">
        <Sugestion total={total} />
      </div>
      <div className="my-10 h-fit w-full flex flex-wrap flex-col gap-10 justify-center items-center">
        <button
          className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg lg:text-3xl h-fit"
          onClick={() => GerarLink()}
        >
          Compartilhar
        </button>
        {shortURL && (
          <div className="flex flex-row items-center justify-center gap-4">
            <label className="font-bold text-white my-4">
              Compartilhe o Link do seu Rateio:{" "}
            </label>
            <input
              className="bg-gray-100 py-2 px-4 rounded placeholder:text-black w-fit "
              value={shortURL}
              disabled
            ></input>
          </div>
        )}
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
