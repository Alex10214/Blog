export interface User {
  email: string
  password: string
  returnSecureToken?: boolean // согласно документации farebase, у админа должно быть данное поле в положении true.
    // 'returnSecureToken' указывает время жизни токена.
}

export interface FireBaseAuthResponse { //респонс
  idToken: string // айди токена.
  expiresIn: string // время жизни токена.
}

export interface Post {
  title: string
  text: string
  author: string
  id?: any
  date: Date
}

export interface FbCreateResponse {
  name: string // fireBase оказывается присваивает и возвращает айдишник созданого поста...
}

