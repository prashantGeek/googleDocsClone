import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="/assets/docs_logo.png"
        height={200}
        width={300}
        priority={true}
        alt="icon"
        style={{ width: "auto", height: "auto" }}
      />
      <h2></h2>
      <Button
        className="w-44 mt-7"
        color="blue"
        variant="filled"
        onClick={() => signIn()}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
