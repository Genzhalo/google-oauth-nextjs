"use client";
import React, { useState } from "react";
import { GoogleDriveButton } from "../buttons/GoogleDrive";
import { loadGooglePickerApi } from "@/utils/loadGooglePickerApi";
import { EmbedFile } from "@/components/general/files/EmbedFile";

export function GoogleDriveFiles() {
  const [, setError] = useState<Error | undefined>();
  const [file, setFile] = useState<string | undefined>();

  const onSuccess = async (token: string) => {
    setError(undefined);
    await loadGooglePickerApi();

    const google = window.google;
    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS)
      .setOAuthToken(token)
      .setAppId(process.env.NEXT_PUBLIC_GOOGLE_API_ID!)
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const file = data.docs[0];
          setFile(file.embedUrl);
        }
      })
      .build();

    picker.setVisible(true);
  };

  return (
    <>
      <GoogleDriveButton onSuccess={onSuccess} onError={setError} />

      {file && <EmbedFile key={file} src={file} />}
    </>
  );
}
