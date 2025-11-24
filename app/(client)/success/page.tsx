import { redirect } from "next/navigation";
import SuccessClient from "@/components/SuccessClient";

interface Props {
  searchParams: Promise<{
    orderNumber?: string;
    session_id?: string;
  }>;
}

const SuccessPage = async ({ searchParams }: Props) => {
  const { orderNumber, session_id } = await searchParams;

  if (!orderNumber?.trim() || !session_id?.trim()) {
    redirect("/");
  }

  return <SuccessClient orderNumber={orderNumber} sessionId={session_id} />;
};

export default SuccessPage;
