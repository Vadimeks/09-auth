import Image from "next/image";

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px #0001",
      }}
    >
      <h1 style={{ marginBottom: 16 }}>About NoteHub</h1>
      <p>
        <strong>NoteHub</strong> is a simple and efficient application designed
        for managing personal notes.
        <br />
        Keep your thoughts organized and accessible in one place, whether you
        are at home or on the go.
        <br />
        <br />
        The app provides a clean interface for writing, editing, and browsing
        notes.
        <br />
        With support for keyword search and structured organization, NoteHub
        offers a streamlined experience for anyone who values clarity and
        productivity.
      </p>
      <div style={{ margin: "32px 0", textAlign: "center" }}>
        <Image
          src="/screen.jpg"
          alt="NoteHub screenshot"
          width={480}
          height={320}
          style={{ borderRadius: 12, boxShadow: "0 2px 8px #0002" }}
        />
        <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>
          Example: All Notes page
        </div>
      </div>
    </main>
  );
}
