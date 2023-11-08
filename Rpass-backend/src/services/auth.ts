import bcrypt from 'bcrypt';

export const hashPassword = async (plainTextPassword: string) => {
  const saltRound = 12;
  const hash = await bcrypt.hash(plainTextPassword, saltRound);
  return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
}