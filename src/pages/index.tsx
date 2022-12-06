import { GetServerSideProps } from "next";
import { ArrowFatLineRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import Step2 from "../components/Step2/Step2";
import Step3 from "../components/Step3/Step3";

export interface ListOfParticipants {
  participant: string;
  expenses: number;
  description: string;
}

interface Props {
  data: Data;
}

type Data = {
  listOfParticipantsByEdition: ListOfParticipants[] | any;
  nomeRateioByEdition: string | any;
};

export default function Home({ data }: Props) {
  const [nomeRateio, setnomeRateio] = useState("");
  const [listOfParticipants, setListOfParticipants] = useState<any>([]);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const formRef = useRef<any>(null);

  useEffect(() => {
    if (data.listOfParticipantsByEdition && data.nomeRateioByEdition) {
      setListOfParticipants(data.listOfParticipantsByEdition);
      setnomeRateio(data.nomeRateioByEdition);
      setStep2(true);
    }
  }, []);

  console.log(step2);
  console.log(step3);

  return (
    <>
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        <div>
          <h1 className="text-5xl text-center text-white">
            De um nome ao seu rateio
          </h1>
        </div>
        <div className="my-10 bg-yellow-500 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
          <div className="flex justify-start flex-row items-center h-full gap-4">
            <div className="flex flex-col w-full">
              {step2 && (
                <span className="text-center lg:text-xl mb-2">
                  Nome do Seu Rateio
                </span>
              )}
              <input
                id="name"
                name="name"
                placeholder="Nome do rateio"
                className="bg-gray-100 py-2 px-4 rounded lg:text-2xl placeholder:text-black w-full font-bold"
                value={nomeRateio}
                onChange={(e) => setnomeRateio(e.target.value)}
                required
              ></input>
            </div>

            {!step2 && (
              <button
                className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg font-jack lg:text-2xl h-fit"
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
                className="px-4 py-2 my-10 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-3xl h-fit flex items-center gap-3"
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
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  // Fetch data from external API

  const data = {
    listOfParticipantsByEdition: JSON.parse(
      (context.query.listOfParticipants as string) ?? null
    ),
    nomeRateioByEdition: (context.query.nomeRateio as string) ?? null,
  };
  // Pass data to the page via props

  return {
    props: {
      data,
    },
  };
};
