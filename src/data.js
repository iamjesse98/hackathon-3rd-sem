import Firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBZ0XZpoj0MueG80CBGFJDuvkFngye_Qps",
  authDomain: "hackathon-360c4.firebaseapp.com",
  databaseURL: "https://hackathon-360c4.firebaseio.com",
  projectId: "hackathon-360c4",
  storageBucket: "hackathon-360c4.appspot.com",
  messagingSenderId: "892606723799"
}

let app = Firebase.initializeApp(config)

const db = app.database()
const values = db.ref().child('user')

export default function() {
    return values
}