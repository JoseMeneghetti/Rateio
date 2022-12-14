import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import CardResultado from "../components/Card/CardResultado";
import Result from "../components/Result/Result";
import {
  FindHowManyPayWithoutDiferences,
  ListForResult,
  ListOfParticipants,
  OnlyParticipants,
  ParticipantsShare,
  SumOfPaids,
  Total,
} from "../Types/global";
import Sugestion from "../components/Result/Sugestion";
import axios from "axios";
import { useRouter } from "next/router";
import { PencilSimple, Share } from "phosphor-react";
import { table } from "console";

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
  const [listForResult, setListForResult] = useState<ListForResult | any>([]);
  const [sugestionList, setSugestionList] = useState<any>([]);
  const [shortURL, setShortURL] = useState("");
  const [fade, setFade] = useState(true);
  const tableRef = useRef<any>(null);

  const router = useRouter();

  async function GerarLink() {
    const ref = window.location.href;

    let headersList = {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: process.env.NEXT_PUBLIC_API_SHORT_IO,
    };

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

  function handleEditRateio() {
    router.push({
      pathname: "/",
      query: {
        listOfParticipants: JSON.stringify(listOfParticipants),
        nomeRateio: nomeRateio,
      },
    });
  }

  useEffect(() => {
    if (listOfParticipants.length && participantsShare.length) {
      const findHowManyPayWithoutDiferences = participantsShare.reduce(
        (total: any, currentElement: ParticipantsShare) => {
          const findWhoPaid = listOfParticipants.find(
            (participants: ListOfParticipants) =>
              participants.description === currentElement.expenseName
          );

          const perPerson = currentElement.participants.map((name) => {
            return {
              name: name,
              value: findWhoPaid.expenses / currentElement.participants.length,
            };
          });

          return [
            ...total,
            {
              expenseName: currentElement.expenseName,
              icon: currentElement.icon,
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

      const total = sumOfPaids
        .map((sum: SumOfPaids) => {
          const findWhoPaid = listForResult.find(
            (participants: ListForResult) =>
              participants.participant === sum.name
          );

          return {
            name: sum.name,
            value: Number(findWhoPaid?.expenses - sum.value).toFixed(2),
          };
        })
        .sort((a: Total, b: Total) => b.value - a.value);

      const total2 = structuredClone(total);

      const sugestion = total2.reduce(
        (totalSugestion: any, currentElement: any) => {
          if (currentElement.value >= 0) {
            return [
              ...totalSugestion,
              {
                name: currentElement.name,
                value: currentElement.value,
              },
            ];
          }

          totalSugestion.forEach((sugestionItem: any) => {
            if (sugestionItem.value === 0 || currentElement.value === 0) {
              return;
            }

            const sumItems =
              Number(sugestionItem.value) + Number(currentElement.value);

            if (sumItems >= 0) {
              sugestionItem.value = sumItems;

              if (!sugestionItem.receives) {
                sugestionItem.receives = [];
              }

              sugestionItem.receives.push({
                receiveFrom: currentElement.name,
                receiveValue: currentElement.value,
              });

              if (!currentElement.pays) {
                currentElement.pays = [];
              }
              currentElement.pays.push({
                pays: sugestionItem.name,
                payValue: currentElement.value,
              });

              currentElement.value = 0;
            } else {
              if (!currentElement.pays) {
                currentElement.pays = [];
              }
              currentElement.pays.push({
                pays: sugestionItem.name,
                payValue: sugestionItem.value,
              });

              if (!sugestionItem.receives) {
                sugestionItem.receives = [];
              }
              sugestionItem.receives.push({
                receiveFrom: currentElement.name,
                receiveValue: sugestionItem.value,
              });

              sugestionItem.value = 0;
              currentElement.value = sumItems;
            }
          });

          if (
            !totalSugestion.find((el: Total) => el.name === currentElement.name)
          ) {
            return [...totalSugestion, currentElement];
          }

          return [...totalSugestion];
        },
        []
      );

      findHowManyPayWithoutDiferences &&
        setFindHowManyPayWithoutDiferences(findHowManyPayWithoutDiferences);
      onlyParticipants && setOnlyParticipants(onlyParticipants);
      sumOfPaids && setSumOfPaids(sumOfPaids);
      listForResult && setListForResult(listForResult);
      total && setTotal(total);
      sugestion && setSugestionList(sugestion);
    }
  }, [listOfParticipants, participantsShare]);

  if (!listOfParticipants || !participantsShare) {
    return <div> Ocorreu um erro...</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white">{nomeRateio}</h1>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10 justify-center">
        <CardResultado
          findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
          listOfParticipants={listOfParticipants}
        />
      </div>
      <div
        className={`my-10 h-fit w-full flex flex-wrap gap-10 overflow-auto relative ${
          !fade && "fade-overflow"
        }`}
        ref={tableRef}
        onScroll={() => {
          const resultOffset =
            tableRef.current.scrollWidth - tableRef.current.offsetWidth;
          if (resultOffset !== tableRef.current.scrollLeft) {
            setFade(false);
          } else {
            if (!fade) {
              setFade(true);
            }
          }
        }}
      >
        <Result
          total={total}
          listOfParticipants={listOfParticipants}
          findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
          listForResult={listForResult}
        />
      </div>
      <h1 className="text-4xl font-bold text-white my-4">
        Sugestão de Pagamentos
      </h1>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10 justify-center">
        <Sugestion sugestion={sugestionList} />
      </div>
      <div className="my-10 h-fit w-full flex flex-wrap flex-col gap-10 justify-center items-center">
        {shortURL && (
          <div className="flex flex-row items-center justify-center gap-4">
            <label className="font-bold text-white my-4">
              Compartilhe o Link do seu Rateio:{" "}
            </label>
            <input
              className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-fit "
              value={shortURL}
              disabled
            ></input>
          </div>
        )}
        <button
          className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
          onClick={() => handleEditRateio()}
        >
          Editar
          <PencilSimple size={24} weight="bold" />
        </button>
        <button
          className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
          onClick={() => GerarLink()}
        >
          Compartilhar
          <Share size={24} weight="bold" />
        </button>
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
