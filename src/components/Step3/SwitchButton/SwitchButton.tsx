import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import {
  FindHowManyPayWithoutDiferences,
  Participant,
} from "../../../Types/global";

interface Props {
  name: string;
  findHowManyPayWithoutDiferences?: FindHowManyPayWithoutDiferences[];
}

export default function SwitchButton({
  name,
  findHowManyPayWithoutDiferences,
}: Props) {
  const [enabled, setEnabled] = useState(true);


  useEffect(() => {
    const splited = name.split("¥");
    const typeOfExpense = splited[0];
    const participantName = splited[1];
    const findType: FindHowManyPayWithoutDiferences[] | any =
      findHowManyPayWithoutDiferences?.find(
        (el) => el.expenseName === typeOfExpense
      );

    if (findType) {
      const findParticipant = findType.participants.find(
        (el: Participant) => el.name === participantName
      );

      setEnabled(findParticipant ? true : false);
    }
  }, []);

  return (
    <div className="py-2">
      <Switch
        name={name}
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-cardbg" : "bg-theme-2"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
}
