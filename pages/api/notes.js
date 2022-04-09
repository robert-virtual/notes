// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import nc from "next-connect";
import { connectToDatabase } from "../../libs/db";
const router = nc({});

router.post(async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.json({ error: "Acceso denegado" });
  }
  const db = await connectToDatabase();
  db.collection("notes");
  res.json({ body: req.body });
});

export default router;
