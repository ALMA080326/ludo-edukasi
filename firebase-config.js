/* =====================================================================
   KONFIGURASI FIREBASE — GANTI ISI DI BAWAH INI
   Ambil dari: Firebase Console → Project settings (⚙️) → Your apps → Web app → Config
   File ini boleh di-upload ke GitHub. Ini BUKAN password; keamanan data
   diatur oleh "Rules" Realtime Database (lihat FIREBASE-SETUP.txt).
   ===================================================================== */
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

window.FAMILY100_FIREBASE_CONFIG = firebaseConfig;
