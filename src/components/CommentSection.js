"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faComments } from "@fortawesome/free-solid-svg-icons";

export default function CommentSection({ postId, initialComments }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, body: text }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments((c) => [...c, data.comment]);
        setText("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10">
      <h2 className="flex items-center gap-2 font-display text-2xl text-parchment">
        <FontAwesomeIcon icon={faComments} className="text-goblin-bright" />
        Yorumlar ({comments.length})
      </h2>

      <div className="mt-5 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="workshop-panel flex gap-3 rounded-xl p-4">
            <Image
              src={c.user_avatar}
              alt={c.user_name}
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full"
            />
            <div>
              <p className="text-sm font-bold text-ink-text">{c.user_name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-text">{c.body}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-text">Henüz yorum yok — ilk yorumu sen bırak.</p>
        )}
      </div>

      {status === "authenticated" ? (
        <form onSubmit={submit} className="mt-6 flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Bir şeyler yaz..."
            maxLength={1000}
            className="flex-1 rounded-xl border border-surface-line bg-surface px-4 py-2.5 text-sm text-ink-text placeholder:text-muted-text focus:border-brass focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="flex items-center gap-2 rounded-xl bg-brass px-4 py-2.5 text-sm font-bold text-ink hover:bg-brass-bright disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            Gönder
          </button>
        </form>
      ) : (
        <p className="mt-6 text-sm text-muted-text">
          Yorum yapmak için{" "}
          <Link href="/login" className="font-bold text-brass-bright">
            giriş yapmalısın
          </Link>
          .
        </p>
      )}
    </div>
  );
}
