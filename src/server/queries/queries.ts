"use client"

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../db/users";
import { User } from "../users";

export function usePatient(patientId: number) {
  return useQuery<{ user: User | undefined, error?: Error }, Error>({
    queryKey: ['patient', patientId],
    queryFn: () => getUserById(patientId),
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });
}
