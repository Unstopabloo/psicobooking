"use client"

import { useQuery } from "@tanstack/react-query";
import { getClinicalHistory, getContactInfo, getPatientTicket, getUpcomingAppointmentsData, getUpcomingAppointmentsDataPatient, getUpcommingAppointments, getUpcommingAppointmentsPatient } from "../actions/users";
import { getPsychologistById, getPsychologists } from "../actions/psychologist";

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

export function useUpcomingAppointmentsDataPatient(date_from: string) {
  return useQuery({
    queryKey: ['upcoming-appointments-patient', date_from],
    queryFn: () => getUpcomingAppointmentsDataPatient(date_from),
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingAppointments(date_from: string) {
  return useQuery({
    queryKey: ['upcoming-appointments', date_from],
    queryFn: () => getUpcommingAppointments(date_from),
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingAppointmentsPatient(date_from: string) {
  return useQuery({
    queryKey: ['upcoming-appointments-patient', date_from],
    queryFn: () => getUpcommingAppointmentsPatient(date_from),
    refetchOnMount: true,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePsychologists(search: string) {
  return useQuery({
    queryKey: ['psychologists', search],
    queryFn: () => getPsychologists({ search }),
  });
}

export function usePsychologistById(id: number) {
  return useQuery({
    queryKey: ['psychologist', id],
    queryFn: () => getPsychologistById(id),
  });
}