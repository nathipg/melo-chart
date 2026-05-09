import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCrUUG-1lrbf5iZXLtswHQTa9H-7wb8bho',
  authDomain: 'melo-chart.firebaseapp.com',
  projectId: 'melo-chart',
  storageBucket: 'melo-chart.firebasestorage.app',
  messagingSenderId: '218674893122',
  appId: '1:218674893122:web:5669423f50d704d8ad38db',
};

const app = initializeApp(firebaseConfig);

export { app };
