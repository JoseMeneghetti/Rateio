import { PrismaClient } from "@prisma/client";
import Resultado from "../resultado";
import { decodeBase64 } from "../../lib/utils/base64";
import pako from "pako";

export const ViewPage = ({ data }: any) => {
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
  });

  const data = {
    result: JSON.parse(
      pako.inflate(decodeBase64(res?.rateio), { to: "string" })
    ),
    id: res?.id,
  };

  // Pass data to the page via props
  return { props: { data } };
}

export default ViewPage;
