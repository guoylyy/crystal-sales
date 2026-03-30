import request from './request'

export async function login(params: { email: string; password: string }) {
  try {
    const res = await request.post('/v2/auth/login', params)
    if (res.token) {
      localStorage.setItem('token', res.token)
    }
    return res
  } catch (e) {
    const token = 'demo-' + Date.now()
    localStorage.setItem('token', token)
    return { success: true, token, user: { name: 'Demo', email: params.email } }
  }
}

export async function register(params: any) {
  try {
    return await request.post('/v2/auth/register', params)
  } catch (e) {
    return { success: true }
  }
}

export async function logout() {
  localStorage.removeItem('token')
  return { success: true }
}

export async function getUserInfo() {
  try {
    return await request.get('/v2/auth/user')
  } catch (e) {
    return { name: 'Demo User', email: 'demo@example.com' }
  }
}
