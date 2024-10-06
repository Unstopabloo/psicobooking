"use client"

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../db/users";

export function usePatient(patientId: number) {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getUserById(patientId),
    enabled: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
}
