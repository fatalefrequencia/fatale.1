export const API_URL = "https://www.fatale.fm/"

export const endpoints = {
  auth: {
    signUp: `${API_URL}auth/signup`,
    signIn: `${API_URL}auth/signin`,
    signOut: `${API_URL}auth/signout`,
  },
  user: {
    profile: `${API_URL}user/profile`,
    update: `${API_URL}user/update`,
  },
  content: {
    list: `${API_URL}content`,
    create: `${API_URL}content/create`,
    update: `${API_URL}content/update`,
    delete: `${API_URL}content/delete`,
  },
  media: {
    upload: `${API_URL}media/upload`,
    delete: `${API_URL}media/delete`,
  }
}