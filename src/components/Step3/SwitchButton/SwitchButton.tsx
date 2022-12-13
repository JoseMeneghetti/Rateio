import { useState } from "react";
import { Switch } from "@headlessui/react";

interface Props {
  name: string;
}

export default function SwitchButton({ name }: Props) {
  const [enabled, setEnabled] = useState(true);

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
