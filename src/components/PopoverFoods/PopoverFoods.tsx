import { Popover } from "@headlessui/react";
import Image from "next/image";
import { CaretUp } from "phosphor-react";
import { mockIcons } from "../../lib/mocks/icons-food";

interface Props {
  setIcon: React.Dispatch<any>;
  icon: string;
}
export default function PopoverFoods({ setIcon, icon }: Props) {
  return (
    <Popover className="relative">
      {!icon ? (
        <Popover.Button className="flex items-center px-4 py-2 bg-cardbg text-theme-4 rounded-lgrounded-lg lg:text-xl h-fit gap-2">
          <CaretUp size={16} />
          Icone
        </Popover.Button>
      ) : (
        <Popover.Button className="flex items-center w-12 h-12">
          <Image src={`/food/${icon}.png`} width={50} height={50} alt={""} />
        </Popover.Button>
      )}

      <Popover.Panel className="absolute z-10 -bottom-20 md:bottom-9 md:right-0 -translate-x-[6.5rem] md:-translate-x-0 w-[300px] md:w-[500px]">
        {({ close }) => (
          <div className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5 shadow-custom w-[300px] md:w-[500px]  ">
            <div className="relative bg-theme-5 p-7 flex flex-wrap gap-2 justify-center w-full">
              {mockIcons.map((iconName) => (
                <div key={iconName} className="">
                  <div
                    className="flex shrink-0 items-center justify-center cursor-pointer"
                    onClick={() => {
                      setIcon(iconName);
                      close();
                    }}
                  >
                    <Image
                      src={`/food/${iconName}.png`}
                      width={50}
                      height={50}
                      alt={""}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}
