import { useEffect, useState } from "react";
import { Pays, Receives, Sugestion, Total } from "../../Types/global";

interface Props {
  total: Total[];
}

function Sugestion({ total }: Props) {
  const [sugestionList, setSugestionList] = useState<any>([]);

  useEffect(() => {
    const sugestion = total.reduce(
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
    setSugestionList(sugestion);
  }, [total]);

  return (
    <>
      {sugestionList.map((sugestion: Sugestion | any, index: number) => (
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
