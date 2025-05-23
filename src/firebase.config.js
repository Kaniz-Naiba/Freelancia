

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArtKomyKpi0IKuNI5SOKU-TY2E1m7Z7WI",
  authDomain: "freelancer-marketplace-a6ef9.firebaseapp.com",
  projectId: "freelancer-marketplace-a6ef9",
  storageBucket: "freelancer-marketplace-a6ef9.appspot.com", // ✅ fix: use firebaseapp.com not storage.app
  messagingSenderId: "762063400712",
  appId: "1:762063400712:web:dd7f8ed2fc766ffc3006bd",
  measurementId: "G-FRY6GC41BJ",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ FIX: export `app`
export default app;
