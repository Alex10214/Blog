export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean; /*documentation*/

}

export interface FireBaseAuthResponse { /*respons*/
  idToken: string;  /*ID token*/
  expiresIn: string;  /*token life time*/
}

export interface Post {
  title: string;
  text: string;
  author: string;
  id?: any;
  date: Date;
}

export interface FbCreateResponseId {
  name: string;  /*fireBase return token ID*/
}

