/**
 * Mock for solid-oidc in test environment.
 * The real module imports jose from https://esm.sh which Node can't resolve.
 */
export class Session extends EventTarget {
  isActive = false
  webId: string | null = null

  async login(_idp: string, _redirectUri: string): Promise<void> {}
  async handleRedirectFromLogin(): Promise<void> {}
  async restore(): Promise<void> {}
  async logout(): Promise<void> {}
  async authFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, init)
  }
}

export class SessionDatabase {
  constructor(_name?: string) {}
}
