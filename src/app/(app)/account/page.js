import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import cloneDeep from "clone-deep";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams.desiredUsername;
  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  if (page) {
    const leanPage = cloneDeep(page.toJSON());

    leanPage._id = leanPage._id.toString();
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        {/* <PageButtonsForm page={leanPage} user={session.user} /> */}
        <PageLinksForm page={leanPage} user={session.user} />
      </>
    );
  }
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
