import { auth } from "@/auth";
import Home from "@/components/Home";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Home />
    </>
  );
};

export default page;
