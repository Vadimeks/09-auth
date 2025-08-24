// app/(private-routes)/profile/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub | Profile',
  description: 'Your user profile page in NoteHub.',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user.avatar ||
              'https://ac.goit.global/fullstack/react/default-avatar.jpg'
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
