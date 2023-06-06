import { GetServerSideProps } from "next";
import {
  ArrowFatLineRight,
  ArrowsClockwise,
  MagnifyingGlass,
  PlusCircle,
} from "phosphor-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Step2 from "../components/Step2/Step2";
import Step3 from "../components/Step3/Step3";
import { decodeBase64 } from "../lib/utils/base64";
import pako from "pako";

import {
  FindHowManyPayWithoutDiferences,
  ListOfParticipants,
} from "../Types/global";
import SearchModal from "../components/Modal/SearchModal";
import { useRouter } from "next/router";

type Result = {
  result: Data;
};
interface Props {
  data: Result;
}

type Data = {
  id: number;
  listOfParticipants: ListOfParticipants[];
  findHowManyPayWithoutDiferences: FindHowManyPayWithoutDiferences[];
  nomeRateio: string | any;
};

export default function Home({ data }: Props) {
  const [nomeRateio, setnomeRateio] = useState("");
  const [listOfParticipants, setListOfParticipants] = useState<
    ListOfParticipants[]
  >([]);
  const [findHowManyPayWithoutDiferences, setFindHowManyPayWithoutDiferences] =
    useState<FindHowManyPayWithoutDiferences[]>([]);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const formRef = useRef<any>(null);
  const router = useRouter();

  const handleReset = useCallback(() => {
    localStorage.removeItem("listOfParticipants");
    localStorage.removeItem("nomeRateio");
    localStorage.removeItem("findHowManyPayWithoutDiferences");
    setListOfParticipants([]);

    setFindHowManyPayWithoutDiferences([]);
    setnomeRateio("");
    setStep2(false);
    setId(null)
  }, []);

  //control persistence
  useEffect(() => {
    const savedParticipants = localStorage.getItem("listOfParticipants");
    const savedNome = localStorage.getItem("nomeRateio");
    const savedDiferences = localStorage.getItem(
      "findHowManyPayWithoutDiferences"
    );
    const id = localStorage.getItem("rateio-id");
    if (savedParticipants || savedNome || savedDiferences) {
      savedParticipants && setListOfParticipants(JSON.parse(savedParticipants));
      savedDiferences &&
        setFindHowManyPayWithoutDiferences(JSON.parse(savedDiferences));
      savedNome && setnomeRateio(savedNome);
      setStep2(true);
    }
    if (id) {
      setId(id);
      localStorage.removeItem("rateio-id");
    }
  }, []);

  useEffect(() => {
    if (listOfParticipants.length > 0) {
      localStorage.setItem(
        "listOfParticipants",
        JSON.stringify(listOfParticipants)
      );
    }
  }, [listOfParticipants]);

  useEffect(() => {
    if (nomeRateio.length > 0) {
      localStorage.setItem("nomeRateio", nomeRateio.toString());
    }
  }, [nomeRateio]);

  return (
    <>
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        <div className="flex flex-col gap-8 justify-center">
          <div className="flex gap-8 justify-center">
            <button
              className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
              onClick={() => handleReset()}
            >
              Resetar
              <ArrowsClockwise size={24} weight="bold" />
            </button>
            <button
              className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
              onClick={() => setIsOpen(true)}
            >
              Buscar Rateio
              <MagnifyingGlass size={24} weight="bold" />
            </button>
          </div>
          <h1 className="text-5xl text-center text-white">
            De um nome ao seu rateio
          </h1>
        </div>
        <div className="my-10 bg-theme-5 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
          <div className="flex justify-start flex-row items-center h-full gap-4">
            <div className="flex flex-col w-full">
              {step2 && (
                <span className="text-center lg:text-xl mb-2 text-theme-4">
                  Nome do Seu Rateio
                </span>
              )}
              <input
                id="name"
                name="name"
                placeholder="Nome do rateio"
                className="bg-theme-4 py-2 px-4 rounded lg:text-2xl placeholder:text-black w-full font-bold"
                value={nomeRateio}
                onChange={(e) => setnomeRateio(e.target.value)}
                required
              ></input>
            </div>

            {!step2 && (
              <button
                className="px-4 py-2 bg-cardbg hover:bg-theme-6 text-theme-4 rounded-lg font-jack lg:text-2xl h-fit"
                onClick={() => setStep2(true)}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
        {step2 && (
          <>
            <Step2
              formRef={formRef}
              listOfParticipants={listOfParticipants}
              setListOfParticipants={setListOfParticipants}
            />
            {listOfParticipants.length > 1 && (
              <button
                className="px-4 py-2 my-10 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
                onClick={() => {
                  setStep3(true);
                  setStep2(false);
                }}
              >
                Avançar
                <ArrowFatLineRight size={24} weight="bold" />
              </button>
            )}
          </>
        )}
        {step3 && (
          <Step3
            listOfParticipants={listOfParticipants}
            nomeRateio={nomeRateio}
            findHowManyPayWithoutDiferences={findHowManyPayWithoutDiferences}
            id={id}
          />
        )}
      </div>
      <SearchModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}
