export { }


export type Roles = "admin" | "psychologist" | "patient"

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean,
      role?: Roles,
    }
  }
}

