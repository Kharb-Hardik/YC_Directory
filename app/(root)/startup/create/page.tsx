import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <div className="bg-pink-500">
        <section className="pink_container !min-h-[230px]">
          <h1 className="heading">Submit Your Startup</h1>
        </section>
      </div>

      <StartupForm />
    </>
  );
};

export default Page;