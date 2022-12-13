import { Pays, Receives, Sugestion } from "../../Types/global";

interface Props {
  sugestion: Sugestion[];
}

function Sugestion({ sugestion }: Props) {
  return (
    <>
      {sugestion.map((sugestion: Sugestion | any, index: number) => (
        <div
          className="bg-cardbg w-fit h-auto p-4 border-b-2 border-theme-4 rounded shadow-custom mt-10 rounded-t-3xl"
          key={`${sugestion.name}-${index}`}
        >
          <div className="relative h-7">
            <p
              className="w-20 h-20 flex border-2 bg-cardbg border-black rounded-full items-center justify-center text-2xl text-theme-4 absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -bottom-8"
              style={
                sugestion?.receives 
                  ? { backgroundColor: "#768a4f" }
                  : { backgroundColor: "#bd2f28" }
              }
            >
              {sugestion.name && sugestion.name[0]?.toUpperCase()}
            </p>
          </div>

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
