export function isValidCPF(cpf: string): boolean {
  const cpfStr = cpf.padStart(11, "0");

  if (!/^\d{11}$/.test(cpfStr)) return false;

  if (/^(\d)\\1{10}$/.test(cpfStr)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpfStr.charAt(i)) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;

  if (Number.parseInt(cpfStr.charAt(9)) !== firstDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpfStr.charAt(i)) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;

  return Number.parseInt(cpfStr.charAt(10)) === secondDigit;
}
