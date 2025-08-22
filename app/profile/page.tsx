// app/profile/page.tsx
"use client";

export default function ProfilePage() {
  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {userEmail ? <p>Email: {userEmail}</p> : <p>You are not logged in.</p>}
    </div>
  );
}
