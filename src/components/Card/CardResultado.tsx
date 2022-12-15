import Image from "next/image";
import {
  FindHowManyPayWithoutDiferences,
  ListOfParticipants,
} from "../../Types/global";

interface Props {
  findHowManyPayWithoutDiferences: FindHowManyPayWithoutDiferences[];
  listOfParticipants: ListOfParticipants[];
}

function CardResultado({
  findHowManyPayWithoutDiferences,
  listOfParticipants,
}: Props) {
  return (
    <>
      {findHowManyPayWithoutDiferences.map((element, index: number) => {
        const findWhoPaid = listOfParticipants.find(
          (participants: ListOfParticipants) =>
            participants.description === element.expenseName
        );
        return (
          <div
            className="bg-cardbg w-fit min-w-[200px] h-auto p-4 border-b-2 border-theme-4 rounded shadow-custom mt-10 rounded-t-3xl"
            key={`${element.expenseName}-${index}`}
          >
            {element.icon && (
              <div className="relative h-7">
                <Image
                  src={`/food/${element.icon}.png`}
                  width={80}
                  height={80}
                  alt={""}
                  className="absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -bottom-8"
                />
              </div>
            )}
            <strong className="text-xl text-white capitalize self-center flex justify-center mb-2">
              {element.expenseName}
            </strong>
            {element.participants.map((participant, index: number) => (
              <div
                className="flex flex-row justify-between gap-4"
                key={`${participant.name}-${index}`}
              >
                <span className="text-grey-theme capitalize">
                  {participant.name}
                </span>
                <strong className="text-grey-theme capitalize">
                  R$ {Number(participant.value).toFixed(2)}
                </strong>
              </div>
            ))}
            <div className="flex flex-col">
              <span className="text-white text-lg flex justify-center p-2 ">
                Quem pagou?
              </span>
              <div className="flex flex-row justify-between gap-4">
                <span className="text-grey-theme capitalize">
                  {findWhoPaid?.participant}
                </span>
                <strong className="text-grey-theme capitalize">
                  R$ {Number(findWhoPaid?.expenses).toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CardResultado;
