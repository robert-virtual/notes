import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Notes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex fixed w-full p-4 shadow-md top-0 justify-between">
        <span>Nice Notes</span>
        <button
          onClick={signIn}
          className="text-white bg-blue-500 p-2 rounded-sm"
        >
          Login
        </button>
      </nav>
      <main className="flex flex-col items-center justify-center w-full px-20 text-center">
        {!session ? (
          <h1 className="text-6xl font-bold">
            Welcome to{" "}
            <a className="text-blue-600" href="#">
              Notes App
            </a>
          </h1>
        ) : (
          <h1 className="text-6xl font-bold">
            Welcome{" "}
            <a className="text-blue-600" href="#">
              {session.user.name}
            </a>
          </h1>
        )}
      </main>
    </div>
  );
}
