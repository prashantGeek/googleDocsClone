import { Button } from "@material-tailwind/react";
import ArticleIcon from "@mui/icons-material/Article";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const formattedDate = date ? date.toDate().toLocaleDateString() : "";
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <ArticleIcon className="text-blue-600" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm ">{formattedDate}</p>
      <Button color="gray" variant="text" className="border-0 py-0 px-0 m-0">
        <MoreVertIcon />
      </Button>
    </div>
  );
}

export default DocumentRow;
