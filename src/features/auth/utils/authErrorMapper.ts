import { AuthError } from "@supabase/supabase-js";

export const mapAuthError = (error: AuthError) => {
  if (!error?.message) {
    return "Terjadi kesalahan. Silahkan coba lagi."
  }

  switch (error.message) {
    case 'Invalid login credentials':
      return 'Email atau password salah.'

    case 'Email not confirmed':
      return 'Email belum diverifikasi. Silakan cek email.'

    case 'User not found':
      return 'Akun tidak ditemukan.'

    case 'Too many requests':
      return 'Terlalu banyak percobaan login. Coba lagi nanti.'

    default:
      return 'Login gagal. Silakan coba kembali.'
  }
}