import firebase from 'firebase'

class Fire {
  constructor() {
    this.init()
    this.checkAuth()
  }

  init = () => {
    if(!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBNTu8bk3mkgXTFKXMfxfoMlt1AWFLLV7w",
        authDomain: "rn-chat-app-d3fdc.firebaseapp.com",
        databaseURL: "https://rn-chat-app-d3fdc.firebaseio.com",
        projectId: "rn-chat-app-d3fdc",
        storageBucket: "rn-chat-app-d3fdc.appspot.com",
        messagingSenderId: "477916456298",
        appId: "1:477916456298:web:bf2410287ac1a128fc3113",
        measurementId: "G-TVF777NR71"
      })
    }
  }
  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user: ', user);
      if(!user){
        firebase.auth().signInAnonymously()
      }
    })
  }

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      this.db.push(message)
    })
  }

  parse = message => {
    const {user, text, timestamp} = message.val()
    const {key: _id} = message
    const createdAt = new Date(timestamp)
    return {
      _id,
      createdAt,
      text,
      user
    }
  }

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
  }

  off() {
    this.db.off()
  }

  get db() {
    return firebase.database().ref('messages')
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }
}

export default new Fire()