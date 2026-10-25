export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

const SCRIPT_ID = 'google-gsi';
const SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

export interface GsiButtonOptions {
  type: 'standard' | 'icon';
  theme: 'outline' | 'filled_blue' | 'filled_black';
  size: 'small' | 'medium' | 'large';
  text: 'signin_with' | 'signup_with' | 'continue_with';
  shape: 'rectangular' | 'pill';
  logo_alignment?: 'left' | 'center';
  width?: number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            use_fedcm_for_prompt?: boolean;
            itp_support?: boolean;
          }) => void;
          renderButton: (parent: HTMLElement, options: GsiButtonOptions) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export const loadGoogleIdentity = (onReady: () => void) => {
  if (window.google) {
    onReady();
    return;
  }

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    existing.addEventListener('load', onReady, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.addEventListener('load', onReady, { once: true });
  document.body.appendChild(script);
};
