"use client"

import { useQuery } from "@tanstack/react-query";
import { getContactInfo, getPatientTicket } from "../actions/users";

export function usePatient(patientId: number) {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getPatientTicket(patientId),
    enabled: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
}

export function useContactInfo(id: number) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContactInfo(id),
    enabled: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
}