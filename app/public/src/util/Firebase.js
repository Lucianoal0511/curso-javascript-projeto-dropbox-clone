// const firebase = require('firebase');

// export class Firebase {

//     constructor(){

//         this.init();

//     }

//     init(){

//         var firebaseConfig = {
//             apiKey: "AIzaSyDlbKFdjog2deG_r2rZZrLosCMSKSVzrhI",
//             authDomain: "dropbox-clone-d266c.firebaseapp.com",
//             databaseURL: "https://dropbox-clone-d266c-default-rtdb.firebaseio.com",
//             projectId: "dropbox-clone-d266c",
//             storageBucket: "dropbox-clone-d266c.appspot.com",
//             messagingSenderId: "1033770015978",
//             appId: "1:1033770015978:web:bfb3072192ad0401728b93",
//             measurementId: "G-PZ7TBMLYEJ"
//         };

//         if (!this._initialized){

//             firebase.initializeApp(firebaseConfig);
//             firebase.database().set({
//                 timestampsInSnapshots: true
//             })
//             this._initialized = true;

//         }
        
//     }

//     static db(){

//         return firebase.database();

//     }
// }