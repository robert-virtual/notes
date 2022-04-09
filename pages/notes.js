import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { connectToDatabase } from "../libs/db";

export default function Notes() {
  const { data: session } = useSession();
  const router = useRouter();
  const { values, setValues } = useForm({ content: "" });
  async function addNote() {
    console.log(values);
    const body = JSON.stringify({ content: values.content });
    const res = await fetch("/api/notes", {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(await res.json());
  }

  useEffect(() => {
    console.log(session);
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  if (session) {
    return (
      <div className="p-4">
        <h1>Notes</h1>
        <input
          className="border-solid border-2 border-blue-400"
          type="text"
          placeholder="content..."
          value={values.content}
          name="content"
          onChange={setValues}
        />
        <button onClick={addNote}>add</button>
      </div>
    );
  }
  return (
    <>
      <p>cargando...</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("session: ", session);
  const db = await connectToDatabase();
  //   db.collection("notes")
  return {
    props: {
      session,
    },
  };
}
