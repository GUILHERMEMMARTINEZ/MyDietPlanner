"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      {!user ? (
        <button
          onClick={gitHubSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with GitHub
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            onClick={firebaseSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Logout
          </button>
          <div>
            <Link href="/user-page/user-recipes">
              <span className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                Go to User Page
              </span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
