"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSession, signOut } from "next-auth/react";
import Login from "@/components/Login";
import DescriptionIcon from "@mui/icons-material/Description";
import { collection, doc } from "firebase/firestore";
import PeopleIcon from "@mui/icons-material/People";
import Image from "next/image";
import TextEditor from "@/components/TextEditor";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const page = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = params.id;
  const [snapshot, loading] = useDocument(
    session?.user?.email
      ? doc(collection(db, "userDocs", session?.user?.email, "docs"), id)
      : null
  );
  if (status === "loading") {
    return <LoadingSkeleton />;
  }
  if (!loading && !snapshot?.data()?.fileName) {
    router.replace("/");
  }
  if (!session) return <Login />;
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <DescriptionIcon
            style={{ fontSize: "2.5rem" }}
            className="text-blue-600"
          />
        </span>

        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">view</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          color="light-blue"
          variant="filled"
          size="md"
          className="hidden md:!inline-flex h-10 items-center"
        >
          <PeopleIcon fontSize="medium" />
          <span className="ml-1">Share</span>
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="profile"
              className="rounded-full ml-2 cursor-pointer"
              priority={true}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" onClick={() => signOut()}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
      <TextEditor id={params.id} />
    </div>
  );
};

export default page;

// export async function GetServerSideProps(context) {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// }
