import HeroCardDemo from "@/components/cards/HeroCardDemo";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className="flex pt-32">
        <div>
          <div className="max-w-md mb-8">
            <h1 className="text-4xl font-bold">
              Your Single Link to Access Everything
            </h1>
            <h2 className="text-gray-500 text-xl mt-6">
              Consolidate Your Links, Social Profiles, Contact Information, and
              More on a Single Page
            </h2>
          </div>
          <HeroForm user={session?.user} />
        </div>
        <div className="flex grow justify-center">
          <HeroCardDemo />
          {/* <div
            className="relative flex justify-center h-[400px] w-[200px] border border-4 border-blue rounded-2xl bg-gray-50"
            style={{ boxShadow: "5px 5px 2.5px 6px rgb(209, 218, 218)" }}
          >
            <span className="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>

            <span className="absolute -right-2 top-14 border border-4 border-black h-7 rounded-md"></span>
            <span className="absolute -right-2 bottom-36 border border-4 border-black h-10 rounded-md"></span>
          </div> */}
        </div>
      </section>
    </main>
  );
}
