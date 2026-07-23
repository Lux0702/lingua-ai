import { api } from "@/lib/api/axios";

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
}
