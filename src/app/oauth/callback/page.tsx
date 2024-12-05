"use client";

import { useEffect } from "react";

export default function OAuthCallback() {
  useEffect(() => {
    (async function handleOAuthCallback() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        window.opener.postMessage(
          { success: false, error: "Missing Authorization Code" },
          "*"
        );
        window.close();
        return;
      }

      try {
        const response = await fetch(`/api/auth/callback?code=${code}`);
        const data = await response.json();
        if (data.success) {
          window.opener.postMessage(
            {
              success: true,
              accessToken: data.accessToken,
              type: "google-auth",
            },
            "*"
          );
        } else {
          window.opener.postMessage(
            { success: false, error: data.error, type: "google-auth" },
            "*"
          );
        }
      } catch (error) {
        window.opener.postMessage(
          {
            success: false,
            error: "Internal Server Error",
            type: "google-auth",
          },
          "*"
        );
      }

      window.close();
    })();
  }, []);

  return <h1>Processing OAuth...</h1>;
}
