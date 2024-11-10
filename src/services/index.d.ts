// src/services/index.d.ts
declare module "src/services" {
    export const Auth: {
      signUp: (email: string, password: string, fullname: string) => Promise<string | void>;
      signIn: (email: string, password: string) => Promise<void>;
      signOut: () => Promise<void>;
      signInWithGoogle: () => Promise<void>;
    };
  }
  