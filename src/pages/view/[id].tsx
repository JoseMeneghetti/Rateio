import { PrismaClient } from "@prisma/client";
import Resultado from "../resultado";
import { decodeBase64 } from "../../lib/utils/base64";
import pako from "pako";
import SearchModal from "../../components/Modal/SearchModal";
import { useEffect, useState } from "react";
import { House, MagnifyingGlass } from "phosphor-react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner/Spinner";

export const ViewPage = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!data && loading) {
      setLoading(false);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-20 w-full h-full flex justify-center items-center bg-rateio bg-opacity-90 top-0 left-0">
        <Spinner customClass="fill-black" size="h-20 w-20" />
      </div>
    );
  }

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
        <SearchModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setLoading={setLoading}
        />
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
