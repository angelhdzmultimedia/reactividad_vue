export function esperar(segundos) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), segundos);
  });
}
