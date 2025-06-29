'use client'
// components/TrackUser.tsx

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function TrackUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const sendUserToBackend = async () => {
      if (user && isSignedIn) {
        await fetch("https://blogbackend-production-8b57.up.railway.app/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.fullName,
            image_url: user.imageUrl,
          }),
        });
      }
    };

    sendUserToBackend();
  }, [user, isSignedIn]);

  return null; // this component doesn’t render anything
}
