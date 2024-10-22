"use client"

import { useQuery } from "@tanstack/react-query";
import { getClinicalHistory, getContactInfo, getPatientTicket, getUpcomingAppointmentsData, getUpcommingAppointments } from "../actions/users";

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

export function useClinicalHistory(id: number | null) {
  return useQuery({
    queryKey: ['clinical-history', id],
    queryFn: () => id ? getClinicalHistory(id) : null,
    enabled: id !== null,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingAppointmentData(date_from: string) {
  return useQuery({
    queryKey: ['upcoming-appointment', date_from],
    queryFn: () => getUpcomingAppointmentsData(date_from),
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingAppointments(date_from: string) {
  return useQuery({
    queryKey: ['upcoming-appointments', date_from],
    queryFn: () => getUpcommingAppointments(date_from),
    refetchOnMount: false,
  });
}