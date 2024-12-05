"use client";
import { GoogleDriveIcon } from "@/components/general/icons/GoogleDriveIcon";
import { openGoogleAuthPopup } from "@/utils/openOAuthPopup";

interface Props {
  onSuccess(_: string): void;
  onError(error: Error): void;
}

export function GoogleDriveButton({ onSuccess, onError }: Props) {
  const login = async () => {
    const [token, error] = await openGoogleAuthPopup();

    if (error) {
      onError(error);
    } else {
      onSuccess(token);
    }
  };

  return (
    <>
      <button
        onClick={login}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GoogleDriveIcon />
        <span>Google Drive</span>
      </button>
    </>
  );
}
