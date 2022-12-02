import { Pays, Receives, Sugestion } from "../../Types/global";

interface Props {
  sugestion: Sugestion[];
}

function Sugestion({ sugestion }: Props) {
  return (
    <>
      {sugestion.map((sugestion: Sugestion | any, index: number) => (
        <div
          className="bg-cardbg w-fit h-auto p-4 border-b-2 border-yellow-theme rounded shadow-custom"
          key={`${sugestion.name}-${index}`}
        >
          <strong className="text-xl text-white capitalize self-center flex justify-center mb-2">
            {sugestion.name}
          </strong>
          {sugestion?.pays && (
            <>
              <strong className="text-white capitalize self-center flex justify-center mb-2">
                Paga
              </strong>
              {sugestion?.pays.map((element: Pays | any, index: number) => {
                const value = parseFloat(element.payValue);
                return (
                  <div
                    className="flex flex-row justify-between gap-4"
                    key={`${element.pays}-${index}`}
                  >
                    <span className="text-grey-theme capitalize">
                      {element.pays}
                    </span>
                    <strong className="text-grey-theme capitalize">
                      R${" "}
                      {value >= 0 ? value.toFixed(2) : (value * -1).toFixed(2)}
                    </strong>
                  </div>
                );
              })}
            </>
          )}
          {sugestion?.receives && (
            <>
              <strong className="text-white capitalize self-center flex justify-center mb-2">
                Recebe
              </strong>
              {sugestion.receives.map(
                (element: Receives | any, index: number) => {
                  const value = parseFloat(element.receiveValue);
                  return (
                    <div
                      className="flex flex-row justify-between gap-4"
                      key={`${element.receiveFrom}-${index}`}
                    >
                      <span className="text-grey-theme capitalize">
                        {element.receiveFrom}
                      </span>
                      <strong className="text-grey-theme capitalize">
                        R${" "}
                        {value >= 0
                          ? value.toFixed(2)
                          : (value * -1).toFixed(2)}
                      </strong>
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default Sugestion;
