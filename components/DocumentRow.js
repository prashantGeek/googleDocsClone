import ArticleIcon from "@mui/icons-material/Article";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const { data: session } = useSession();
  const formattedDate = date ? date.toDate().toLocaleDateString() : "";
  const deleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, "userDocs", session.user.email, "docs", docId));
      console.log("deleted");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <ArticleIcon className="text-blue-600" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm ">{formattedDate}</p>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" size="sm">
            <MoreVertIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          onAction={(key) => deleteDocument(key)}
        >
          <DropdownItem
            key={id}
            className="text-danger"
            color="danger"
            textValue="delete button"
          >
            <div className="flex items-center gap-2">
              <DeleteForeverIcon />
              Delete file
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DocumentRow;
