import { api } from "@/lib/api/axios";

const AUTH_SESSION_EVENT = "polyglot-auth-session-change";
let cachedSessionValue: string | null | undefined;
let cachedSession: AuthSession | null = null;

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  name: string;
};

export type AuthSession = {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
  data?: AuthSession;
};

function extractSession(response: AuthSession) {
  const payload = response.data ?? response;

  if (!payload.accessToken) {
    throw new Error("API không trả về access token.");
  }

  return payload;
}

export async function login(credentials: AuthCredentials) {
  const response = await api.post<AuthSession>("/auth/login", credentials);
  return extractSession(response.data);
}

export async function register(credentials: RegisterCredentials) {
  const response = await api.post<AuthSession>("/auth/register", credentials);
  return extractSession(response.data);
}

export function saveAuthSession(session: AuthSession) {
  window.localStorage.setItem("polyglot-access-token", session.accessToken);
  window.localStorage.setItem("polyglot-token-type", session.tokenType);
  window.localStorage.setItem("polyglot-auth-session", JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function subscribeToAuthSession(callback: () => void) {
  window.addEventListener(AUTH_SESSION_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_SESSION_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getStoredAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const rawSession = window.localStorage.getItem("polyglot-auth-session");
    if (rawSession === cachedSessionValue) {
      if (cachedSession && Date.parse(cachedSession.expiresAt) <= Date.now()) cachedSession = null;
      return cachedSession;
    }

    cachedSessionValue = rawSession;
    if (!rawSession) {
      cachedSession = null;
      return null;
    }

    const session = JSON.parse(rawSession) as AuthSession;
    if (!session.accessToken || !session.user?.displayName || Number.isNaN(Date.parse(session.expiresAt)) || Date.parse(session.expiresAt) <= Date.now()) {
      cachedSession = null;
      return null;
    }

    cachedSession = session;
    return cachedSession;
  } catch {
    cachedSession = null;
    return null;
  }
}
