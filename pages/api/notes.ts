import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { title, content } = req.body;
      if (!title || !content) return res.status(400).json({ error: "Missing fields" });

      const { data, error } = await supabase.from("notes").insert({ title, content }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
