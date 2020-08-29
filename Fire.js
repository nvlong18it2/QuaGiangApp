
require("firebase/firestore");
import firebase from './config'
const database = firebase.firestore()
class Fire {

    creaeUser= async ({name, phone, email, password, city})=>{
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        let db = database.collection("users").doc(this.uid)
        db.set({
            uid: this.uid,
            name: name,
            phone: phone,
            city: city,
            email: email,
            
        })
       
    } catch (error) {
        console.log(error)
        alert("Error: ", error);
    }
    }
     
    addPost= async({from,to, date, time, money ,findcar,note, localUri})=>{
        const remoteUri = await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}.jpg`)
        return new Promise((res, rej)=>{
        database.collection("users").doc(this.uid).update({
                from: from,
                to: to,
                findcar: findcar,
                date: date,
                time:  time,
                note: note,
                money: money,
                book: "Book Now",
                posted: true,
                timestamp: this.timestamp,
                image: remoteUri,
            })
            .then(ref=>{
                res(ref)
            })
            .catch(error =>{
                rej(error);
            })
        })
    }
        updateProfile= async({name, phone, city, localUri})=>{
        const remoteUri = await this.uploadPhotoAsync(localUri,`avatar/${this.uid}/${Date.now()}.jpg`)
        return new Promise((res, rej)=>{
         database.collection("users").doc(this.uid).update({
               name: name,
               phone: phone,
               city: city,
               avatar: remoteUri,
            })
            .then(ref=>{
                res(ref)
            })
            .catch(error =>{
                rej(error);
            })
        })
    }
    uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
        const response = await fetch(uri)
        const file = await response.blob();
        let upload = firebase
              .storage()
              .ref(filename)
              .put(file);
        upload.on(
            "state_changed",
            snapshop => {},
            err => {
                rej(err);
            },
            async()=> {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
    );
    
       
        }
    );
};
  
send = messages => {
    messages.forEach(item => {
        const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user : item.user
        };
        this.db.push(message)
    });
};
parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createAt = new Date(timestamp);
    return {
        _id,
        createAt,
        text,
        user
    }
}
   get = callback => {
       this.db.on("child_added", snapshot => callback(this.parse(snapshot)))
   };
   off(){
       this.db.off()
   }
    get uid(){
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp(){
        return Date.now();
    }
    get db(){
        return firebase.database().ref("messages");
    }

}


Fire.shared = new Fire();
export default Fire;                