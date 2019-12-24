import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDlW_qFCSo5IraymhYzkOnnb68FcXx7u2s',
  authDomain: 'mcguirehomes-mh.firebaseapp.com',
  databaseURL: 'https://mcguirehomes-mh.firebaseio.com',
  projectId: 'mcguirehomes-mh',
  storageBucket: 'mcguirehomes-mh.appspot.com',
  messagingSenderId: '584112697700',
  appId: '1:584112697700:web:056ba7ea09191a4f738a71',
  measurementId: 'G-MTEJ8B6LQM'
})

export const db = firebase.firestore()

export const storageRef = firebase.storage().ref()

export default app
