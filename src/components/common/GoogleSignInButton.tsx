import React from "react";
import { Loader2 } from "lucide-react";
import { authAPI } from "@/lib/api";
import { GOOGLE_CLIENT_ID, GsiButtonOptions } from "@/lib/googleIdentity";
import { useGooglePopupSignIn } from "@/hooks/useGooglePopupSignIn";
import GoogleMark from "./GoogleMark";

interface GoogleSignInButtonProps {
  label: string;
  text?: GsiButtonOptions["text"];
}

const FACE_CLASS =
  "w-full h-[46px] max-sm:h-[50px] flex items-center justify-center gap-3 rounded-[10px] max-sm:rounded-xl border border-border bg-card transition-colors text-foreground text-sm font-semibold";

const GooglePopupButton: React.FC<Required<GoogleSignInButtonProps>> = ({ label, text }) => {
  const { holder, busy } = useGooglePopupSignIn(text);

  return (
    <div className="group relative h-[46px] max-sm:h-[50px]">
      <div className={`${FACE_CLASS} pointer-events-none group-hover:bg-muted group-hover:border-input`} aria-hidden="true">
        {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleMark />}
        {label}
      </div>
      <div
        ref={holder}
        aria-label={label}
        className={`absolute inset-0 overflow-hidden opacity-0 [color-scheme:light] ${busy ? "pointer-events-none" : "cursor-pointer"}`}
      />
    </div>
  );
};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ label, text = "signin_with" }) => {
  if (GOOGLE_CLIENT_ID) return <GooglePopupButton label={label} text={text} />;

  return (
    <a href={authAPI.googleLoginUrl()} className={`${FACE_CLASS} hover:bg-muted`}>
      <GoogleMark />
      {label}
    </a>
  );
};

export default GoogleSignInButton;
