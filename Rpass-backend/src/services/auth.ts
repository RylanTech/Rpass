import bcrypt from 'bcrypt';
import { user } from '../models/user';
import speakeasy from 'speakeasy';

export const hashPassword = async (plainTextPassword: string) => {
  const saltRound = 12;
  const hash = await bcrypt.hash(plainTextPassword, saltRound);
  return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const verifyTwoFactor = async (token: string, userId: number) => {
  try {
    const usr = await user.findByPk(userId)
    if (usr) {
      const secret = JSON.parse(usr.twoFactorKey).base32

      const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token
      })

      if (verified) {
        return true
      } else {
        return false
      }
    }
  } catch (error) {
    return error
  }
}