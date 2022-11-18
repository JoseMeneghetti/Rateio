import { ListOfParticipants } from "../../pages";
import { FindHowManyPayWithoutDiferences } from "../../Types/global";

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
            className="bg-cardbg w-fit h-auto p-4 border-b-2 border-yellow-theme rounded shadow-custom"
            key={`${element.expenseName}-${index}`}
          >
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
                  R$ {participant.value}
                </strong>
              </div>
            ))}
            <div className="flex flex-col">
              <span className="text-white text-lg flex justify-center p-2 ">Quem pagou?</span>
              <div className="flex flex-row justify-between gap-4">
                <span className="text-grey-theme capitalize">
                  {findWhoPaid?.participant}
                </span>
                <strong className="text-grey-theme capitalize">
                  R$ {findWhoPaid?.expenses}
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
