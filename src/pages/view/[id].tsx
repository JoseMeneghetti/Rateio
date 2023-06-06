import { PrismaClient } from "@prisma/client";
import Resultado from "../resultado";
import { decodeBase64 } from "../../lib/utils/base64";
import pako from "pako";
import SearchModal from "../../components/Modal/SearchModal";
import { useState } from "react";
import { House, MagnifyingGlass } from "phosphor-react";
import { useRouter } from "next/router";

export const ViewPage = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl text-white">Nenhum Rateio encontrado!</h1>
        <div className="flex gap-8 justify-center">
          <button
            className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
            onClick={() => router.push("/")}
          >
            Inicio
            <House size={24} weight="bold" />
          </button>
          <button
            className="px-4 py-2 bg-theme-5 hover:bg-theme-2 text-theme-6 rounded-lg text-3xl h-fit flex items-center gap-3 text-theme-4"
            onClick={() => setIsOpen(true)}
          >
            Buscar Rateio
            <MagnifyingGlass size={24} weight="bold" />
          </button>
        </div>
        <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  }

  return (
    <div>
      <Resultado data={data} isView={true} />
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const prisma = new PrismaClient();

  // Fetch data from external API
  const res = await prisma.rateio.findUnique({
    where: { id: parseInt(params.id.toString()) },
    select: {
      id: true,
      rateio: true,
    },
  });

  if (res) {
    const data = {
      result: JSON.parse(
        pako.inflate(decodeBase64(res?.rateio), { to: "string" })
      ),
      id: res?.id,
    };
    return { props: { data } };
  }
  return { props: { data: null } };
  // Pass data to the page via props
}

export default ViewPage;
