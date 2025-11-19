import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Note = {
  id: string;
  title: string;
  content: string;
  summary?: string | null;
  created_at: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    const newNote = await res.json();
    setNotes((prev) => [newNote, ...prev]);
    setLoading(false);
    setTitle("");
    setContent("");
  };

  const summarize = async (note: Note) => {
    setSummarizingId(note.id);
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: note.content })
    });
    const data = await res.json();

    await supabase.from("notes").update({ summary: data.summary }).eq("id", note.id);
    fetchNotes();
    setSummarizingId(null);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Vamsi's AI Notes</h1>

      <form onSubmit={createNote} className="p-4 bg-white rounded shadow mb-6">
        <input
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
        <textarea
          className="border p-2 w-full mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Note"}
        </button>
      </form>

      {notes.map((note) => (
        <div key={note.id} className="p-4 bg-white rounded shadow mb-4">
          <h2 className="font-semibold text-xl">{note.title}</h2>
          <p className="mt-2 text-gray-700">{note.content}</p>

          {note.summary && <p className="mt-2 italic text-gray-500">AI Summary: {note.summary}</p>}

          <button
            onClick={() => summarize(note)}
            className="mt-3 border px-3 py-1 rounded"
          >
            {summarizingId === note.id ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>
      ))}
    </div>
  );
}
