import { Button } from "@material-tailwind/react";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Header() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        variant="text"
        className="h-10 w-10 border-0 flex justify-center items-center bg-transparent outline-none"
      >
        <MenuIcon className="text-gray-700 text-2xl" />
      </Button>
      <DescriptionIcon className="text-blue-600 text-4xl " />
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="flex flex-grow items-center m-4 px-5 py-2 bg-gray-100 text-grey-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <SearchIcon className="text-3xl text-gray-700" />
        <input
          type="text"
          placeholder="Search"
          className="px-5 text-base bg-transparent outline-none flex-grow"
        />
      </div>
      <Button
        variant="text"
        className=" py-0 px-0 m-0  flex justify-center items-center"
      >
        <AppsIcon className="m-2 text-gray-700 text-4xl" />
      </Button>
      <Image
        src={session?.user?.image}
        alt="icon"
        width={40}
        height={40}
        className="hidden md:inline-flex cursor-pointer rounded-full ml-2"
        onClick={signOut}
      />
    </header>
  );
}

export default Header;
