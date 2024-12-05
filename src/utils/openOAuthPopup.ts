type Result = Promise<[string, null] | [null, Error]>;

export async function openGoogleAuthPopup(): Result {
  try {
    const res = await new Promise<string>((resolve, reject) => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const redirectUri = window.location.origin + "/oauth/callback"; // Update for production
      const scope = "https://www.googleapis.com/auth/drive.file";
      const responseType = "code";

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

      const popup = window.open(
        authUrl,
        "google-auth",
        `width=${800},height=${600},left=${window.screen.width / 2 - 400},top=${
          window.screen.height / 2 - 300
        }`
      );

      if (!popup) {
        reject("Popup blocked! Please allow popups for this site.");
        return;
      }

      const checkPopupClosed = () => {
        if (!popup) {
          reject("Popup was closed before completing the flow.");
          return;
        }
        requestAnimationFrame(checkPopupClosed);
      };

      requestAnimationFrame(checkPopupClosed);

      const messageHandler = (event: any) => {
        if (
          event.origin !== window.location.origin ||
          event.data.type != "google-auth"
        )
          return;
        const { success, accessToken, error } = event.data;
        if (success) {
          resolve(accessToken);
        } else {
          reject(error);
        }

        window.removeEventListener("message", messageHandler);
      };

      window.addEventListener("message", messageHandler);
    });
    return [res, null];
  } catch (e: any) {
    return [null, new Error(e)];
  }
}
