"use client";

import Header from "@/components/Header";
import DocumentRow from "@/components/DocumentRow";
import {
  ThemeProvider,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
export { ThemeProvider, Button };
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import Login from "@/components/Login";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

export default function Home() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const [snapshot] = useCollectionOnce(
    session?.user?.email
      ? query(
          collection(db, "userDocs", session.user.email, "docs"),
          orderBy("timestamp", "desc")
        )
      : null
  );
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) return <Login />;

  const createDocument = async () => {
    if (!input) return;
    const userEmail = session.user.email;

    const userDocsCollectionRef = collection(db, "userDocs", userEmail, "docs");

    const docRef = await addDoc(userDocsCollectionRef, {
      fileName: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Dialog size="xs" open={showModal} handler={() => setShowModal(false)}>
      <DialogBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </DialogBody>
      <DialogFooter className=" flex gap-5">
        <Button
          variant="text"
          onClick={(e) => setShowModal(false)}
          className="text-blue-700"
        >
          Cancel
        </Button>
        <Button
          color="blue"
          variant="filled"
          onClick={() => {
            createDocument();
          }}
        >
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div>
      <Header />
      {modal}
      <section className="bg-[#F8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button variant="text" className="border-0">
              <MoreVertIcon className="text-gray-700" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My document</h2>
            <p className="mr-12">Date Created</p>
            <FolderIcon className="text-gray-600" />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export const GetServerSideProps = async () => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
