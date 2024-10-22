export function calculateDate(date: string): string {
  const fechaDada = new Date(date);
  const ahora = new Date();
  const diferencia = fechaDada.getTime() - ahora.getTime();
  const esPasado = diferencia < 0;
  const diferenciaAbs = Math.abs(diferencia);

  // Convertir la diferencia a minutos, horas y días
  const minutos = Math.floor(diferenciaAbs / 60000);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  const prefijo = esPasado ? 'Hace' : 'En';

  if (dias > 0) {
    return `${prefijo} ${dias} ${dias === 1 ? 'día' : 'días'}`;
  } else if (horas > 0) {
    return `${prefijo} ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
  } else if (minutos > 0) {
    return `${prefijo} ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
  } else {
    return 'Ahora';
  }
}
