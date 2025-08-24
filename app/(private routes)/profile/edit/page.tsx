/* app/(private-routes)/profile/edit/page.tsx */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUserProfile } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/sign-in');
      return;
    }
    setFormData({
      username: user.username || '',
      email: user.email || '',
    });
    setIsLoading(false);
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: { username?: string } = {};
    if (formData.username.trim() && formData.username !== user?.username) {
      payload.username = formData.username.trim();
    }

    if (Object.keys(payload).length === 0) {
      setError('No changes to save');
      return;
    }

    try {
      const updatedUser = await updateUserProfile(payload);
      if (updatedUser) {
        setUser(updatedUser);
        router.push('/profile');
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: string }).message === 'string'
          ? (err as { message?: string }).message!
          : 'Failed to update profile';
      setError(message);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const avatarSrc: string =
    user.avatar ?? 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={css.input}
            />
          </div>
          <div className={css.usernameWrapper}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className={css.input}
              readOnly
            />
          </div>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className={css.avatarBlock}>
          <Image
            src={avatarSrc}
            alt="Avatar"
            className={css.avatar}
            width={64}
            height={64}
            priority
          />
        </div>
      </div>
    </main>
  );
}
