export { }


export type Roles = 'admin' | 'psicologo' | 'paciente'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean,
      role?: Roles,
    }
  }
}