import { FormEvent, useRef, useState } from "react";
import Step2 from "../components/Step2/Step2";
import Step3 from "../components/Step3/Step3";

export interface ListOfParticipants {
  participant: string;
  expenses: number;
  description: string;
}
export default function Home() {
  const [nomeRateio, setnomeRateio] = useState("");
  const [listOfParticipants, setListOfParticipants] = useState<any>([]);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const formRef = useRef<any>(null);

  console.log(listOfParticipants);
  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center pt-10">
      <div>
        <h1 className="text-5xl font-extrabold neon-text text-center">
          De um nome ao seu rateio
        </h1>
      </div>
      <div className="my-10 bg-yellow-500 bg-opacity-90 w-5/6 h-fit rounded-lg p-5">
        <div className="flex justify-start flex-row items-center h-full gap-4">
          <input
            id="search"
            name="search"
            placeholder="Nome do rateio"
            className="bg-gray-100 py-2 px-4 rounded text-2xl placeholder:text-black w-full font-bold"
            value={nomeRateio}
            onChange={(e) => setnomeRateio(e.target.value)}
          ></input>
          <button
            className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg font-jack text-2xl h-fit"
            onClick={() => setStep2(true)}
          >
            Continuar
          </button>
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
              className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-yellow-500 rounded-lg text-3xl h-fit"
              onClick={() => {
                setStep3(true);
                setStep2(false);
              }}
            >
              Continue
            </button>
          )}
        </>
      )}
      {step3 && <Step3 listOfParticipants={listOfParticipants} nomeRateio={nomeRateio}/>}
    </div>
  );
}
