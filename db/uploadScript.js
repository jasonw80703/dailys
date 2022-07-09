import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import database from '../db/database.json' assert {type: "json"};

const firebaseConfig = {
  apiKey: 'AIzaSyCcKbYwHfAZ_ZrzNJzfWAJ6U2Cr0-N2Xd4',
  authDomain: 'dailys-a7adf.firebaseapp.com',
  projectId: 'dailys-a7adf',
  storageBucket: 'dailys-a7adf.appspot.com',
  messagingSenderId: '404782791310',
  appId: '1:404782791310:web:a93550f6fc876dee9927df',
  measurementId: 'G-3F6EB65DB4',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

database.forEach((obj) => {
  // console.log(obj);
  console.log('>>>>>>>>>>>>>>>>>>>START')
  console.log('Upserting for date: ' + obj.date)

  setDoc(doc(db, 'dailys', obj.date), {
    prompt1: obj.prompt1,
    prompt2: obj.prompt2,
    prompt3: obj.prompt3
  });

  console.log('>>>>>>>>>>>>>>>>>>>END')
});

process.exit();
