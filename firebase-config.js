/* =====================================================================
   KONFIGURASI FIREBASE — GANTI ISI DI BAWAH INI
   Ambil dari: Firebase Console → Project settings (⚙️) → Your apps → Web app → Config
   File ini boleh di-upload ke GitHub. Ini BUKAN password; keamanan data
   diatur oleh "Rules" Realtime Database (lihat FIREBASE-SETUP.txt).
   ===================================================================== */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Silakan salin API Key Anda dari Firebase Console
  authDomain: "family100-online-fa8e0.firebaseapp.com",
  databaseURL: "https://family100-online-fa8e0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "family100-online-fa8e0",
  storageBucket: "family100-online-fa8e0.firebasestorage.app",
  messagingSenderId: "965235375216",
  appId: "YOUR_APP_ID" // Silakan salin App ID Anda dari Firebase Console
};

window.FAMILY100_FIREBASE_CONFIG = firebaseConfig;
