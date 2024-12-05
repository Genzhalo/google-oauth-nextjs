"use client";
import React from "react";
import { GoogleDriveIcon } from "../icons/GoogleDriveIcon";

export function GoogleDriveButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      style={{
        cursor: "pointer",
        display: "flex",
        gap: "5px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleDriveIcon />
      <span>Google Drive</span>
    </button>
  );
}
