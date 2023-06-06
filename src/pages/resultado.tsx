import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import CardResultado from "../components/Card/CardResultado";
import Result from "../components/Result/Result";
import pako from "pako";

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
import { FloppyDisk, PencilSimple, Share } from "phosphor-react";
import useDeviceType from "../lib/hooks/useDeviceType";
import { decodeBase64, encodeBase64 } from "../lib/utils/base64";
import PasswordModal from "../components/Modal/PasswordModal";
import DialogModal from "../components/Modal/DialogModal";
import NewPasswordModal from "../components/Modal/NewPasswordModal";
import PasswordModalEdit from "../components/Modal/PasswordModalEdit";

type Result = {
  result: Data;
  id: number | null;
};

type Data = {
  id: number | null;
  listOfParticipants: ListOfParticipants[] | any;
  participantsShare: string[] | any;
  nomeRateio: string;
};

interface Props {
  data: Result;
  isView: boolean;
}

export default function Resultado({ data, isView }: Props) {
  const [newData, setNewData] = useState<Data | null>(null);

  const [findHowManyPayWithoutDiferences, setFindHowManyPayWithoutDiferences] =
    useState([]);
  const [onlyParticipants, setOnlyParticipants] = useState([]);
  const [sumOfPaids, setSumOfPaids] = useState([]);
  const [total, setTotal] = useState([]);
  const [listForResult, setListForResult] = useState<ListForResult | any>([]);
  const [sugestionList, setSugestionList] = useState<any>([]);
  const [shortURL, setShortURL] = useState("");
  const [shortError, setShortError] = useState("");

  const [fade, setFade] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenPasswordEdit, setIsOpenPasswordEdit] = useState(false);
  const [isOpenDialogModal, setIsOpenDialogModal] = useState(false);
  const [isOpenNewPassword, setIsOpenNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const tableRef = useRef<any>(null);
  const device = useDeviceType();
  const router = useRouter();

  async function GerarLink() {
    if (newData?.id) {
      const ref = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/view/${newData?.id}`;
      navigator.clipboard.writeText(ref);
      setShortURL(ref);
    } else {
      setShortError("Salve seu Rateio para compartilhar!");
      setTimeout(() => setShortError(""), 3000);
    }
  }

  useEffect(() => {
    setNewData({
      id: data?.id ?? null,
      listOfParticipants: data?.result.listOfParticipants,
      participantsShare: data?.result.participantsShare,
      nomeRateio: data?.result.nomeRateio,
    });
  }, [
    data?.id,
    data?.result.listOfParticipants,
    data?.result.nomeRateio,
    data?.result.participantsShare,
  ]);

  useEffect(() => {
    if (isView) {
      setIsOpenPassword(true);
    } else {
      setIsOpenPassword(false);
    }
  }, [isView]);

  function handleEditRateio() {
    localStorage.setItem(
      "listOfParticipants",
      JSON.stringify(newData?.listOfParticipants)
    );
    localStorage.setItem("nomeRateio", newData?.nomeRateio ?? "");
    localStorage.setItem(
      "findHowManyPayWithoutDiferences",
      JSON.stringify(findHowManyPayWithoutDiferences)
    );
    localStorage.setItem("rateio-id", newData?.id?.toString() ?? "");

    router.push("/");
  }

  function handleSaveRateio(password: string) {
    const saveData = JSON.stringify({
      listOfParticipants: newData?.listOfParticipants,
      participantsShare: newData?.participantsShare,
      nomeRateio: newData?.nomeRateio,
    });

    const pakoDeflated = pako.deflate(saveData);

    const pakoEncoded64 = encodeBase64(pakoDeflated);

    axios
      .post(`/api/edit`, {
        id: newData?.id,
        rateio: pakoEncoded64,
        password: password,
      })
      .then((response) => {
        if (response.data.code === 200) {
          setErrorMessage("Rateio Salvo com sucesso!");
          setIsOpenDialogModal(true);
        } else {
          setErrorMessage("Senha Invalida!");
          setIsOpenDialogModal(true);
        }
      });

    setIsOpenPasswordEdit(false);
  }

  function handleCreateRateio(newPassword: string) {
    const createData = JSON.stringify({
      listOfParticipants: newData?.listOfParticipants,
      participantsShare: newData?.participantsShare,
      nomeRateio: newData?.nomeRateio,
    });

    const pakoDeflated = pako.deflate(createData);

    const pakoEncoded64 = encodeBase64(pakoDeflated);

    axios
      .post("/api/create", {
        rateio: pakoEncoded64,
        password: newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage(
            `Rateio Criado com sucesso! Codigo do Rateio: ${response.data.productResult.id}`
          );
          setIsOpenDialogModal(true);
          setIsOpenNewPassword(false);
          setNewData((old: any) => ({
            ...old,
            id: response.data.productResult.id,
          }));
        }
      });
  }

  useEffect(() => {
    if (
      newData?.listOfParticipants.length &&
      newData?.participantsShare.length
    ) {
      const findHowManyPayWithoutDiferences = newData?.participantsShare.reduce(
        (total: any, currentElement: ParticipantsShare) => {
          const findWhoPaid = newData?.listOfParticipants.find(
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

      const listForResult = newData?.listOfParticipants.reduce(
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

      //control persistence
      localStorage.setItem(
        "findHowManyPayWithoutDiferences",
        JSON.stringify(findHowManyPayWithoutDiferences)
      );

      findHowManyPayWithoutDiferences &&
        setFindHowManyPayWithoutDiferences(findHowManyPayWithoutDiferences);
      onlyParticipants && setOnlyParticipants(onlyParticipants);
      sumOfPaids && setSumOfPaids(sumOfPaids);
      listForResult && setListForResult(listForResult);
      total && setTotal(total);
      sugestion && setSugestionList(sugestion);
    }
  }, [newData?.listOfParticipants, newData?.participantsShare]);

  useEffect(() => {
    if (device) {
      if (device !== "Phone") {
        setFade(true);
      }
    }
  }, [device]);

  if (!newData?.listOfParticipants || !newData?.participantsShare) {
    return <div> Ocorreu um erro...</div>;
  }

  //to do profile img
  // const Image = () => (
  //   <div>
  //     <img src={`data:image/svg+xml;utf8,${svg}`} />
  //   </div>
  // );

  if (isOpenPassword) {
    return (
      <PasswordModal
        isOpen={isOpenPassword}
        setIsOpen={setIsOpenPassword}
        id={newData.id}
      />
    );
  }

  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-white">{newData?.nomeRateio}</h1>
        {newData?.id && (
          <h1 className="text-2xl font-bold text-white">
            Codigo do Rateio: {newData?.id}
          </h1>
        )}
      </div>
      <div className="my-10 h-fit w-full flex flex-wrap gap-10 justify-center">
        <CardResultado
          findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
          listOfParticipants={newData?.listOfParticipants}
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
          listOfParticipants={newData?.listOfParticipants}
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
              Link Copiado com sucesso:{" "}
            </label>
            <input
              className="bg-theme-4 py-2 px-4 rounded placeholder:text-black w-fit "
              value={shortURL}
              disabled
            ></input>
          </div>
        )}
        {shortError && (
          <div className="flex flex-row items-center justify-center gap-4">
            <label className="font-bold my-4 text-red-700">{shortError}</label>
          </div>
        )}
        {!isView && !newData.id ? (
          <button
            className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
            onClick={() => setIsOpenNewPassword(true)}
          >
            Criar novo Rateio
            <PencilSimple size={24} weight="bold" />
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
              onClick={() => handleEditRateio()}
            >
              Editar
              <PencilSimple size={24} weight="bold" />
            </button>
            <button
              className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
              onClick={() => setIsOpenPasswordEdit(true)}
            >
              Salvar
              <FloppyDisk size={24} weight="bold" />
            </button>
          </div>
        )}
        <button
          className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg lg:text-3xl h-fit flex items-center gap-3 text-theme-4"
          onClick={() => GerarLink()}
        >
          Compartilhar
          <Share size={24} weight="bold" />
        </button>
      </div>
      {/* to do profile img */}
      {/* <Image /> */}
      <DialogModal
        setIsOpen={setIsOpenDialogModal}
        isOpen={isOpenDialogModal}
        message={errorMessage}
      />
      <NewPasswordModal
        isOpen={isOpenNewPassword}
        handleCreateRateio={handleCreateRateio}
      />
      <PasswordModalEdit
        isOpen={isOpenPasswordEdit}
        handleSaveRateio={handleSaveRateio}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Result }> = async (
  context
) => {
  // Fetch data from external API
  let result = null;

  if (typeof context.query.id === "string") {
    // Use a string
    result = parseInt(context.query.id);
    // Resto do código
  }

  const data = {
    result: JSON.parse(
      pako.inflate(decodeBase64(context.query.result), { to: "string" })
    ),
    id: result,
  };
  // Pass data to the page via props

  return {
    props: {
      data,
    },
  };
};
