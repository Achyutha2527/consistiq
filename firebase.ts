import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCpKJjRpTm01Z3iGo0R88dnDcscsEwp8Cs",
  authDomain: "consistiq-55fa6.firebaseapp.com",
  projectId: "consistiq-55fa6",
  storageBucket: "consistiq-55fa6.appspot.com", // ✅ FIXED
  messagingSenderId: "485736181262",
  appId: "1:485736181262:web:beb4d0ae9fdbdec38a965f",
};

// ✅ Prevent duplicate app error
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const messaging = getMessaging(app);

// 🔔 Ask permission + get token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BJ2JusZWt2WgMYEgSWhb8I_JR321piLnLnkVb2SyS3LpB8OWCZE_bJoSnYFw871nA0P3C42SR7SD07mdW0ldPFU",
      });

      console.log("🔥 TOKEN:", token);
      return token;
    } else {
      console.log("❌ Permission denied");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

// 📩 Foreground messages
export const onForegroundMessage = (callback: any) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};