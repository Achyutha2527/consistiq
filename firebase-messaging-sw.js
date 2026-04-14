importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCpKJjRpTm01Z3iGo0R88dnDcscsEwp8Cs",
  authDomain: "consistiq-55fa6.firebaseapp.com",
  projectId: "consistiq-55fa6",
  storageBucket: "consistiq-55fa6.appspot.com", // ✅ FIXED
  messagingSenderId: "485736181262",
  appId: "1:485736181262:web:beb4d0ae9fdbdec38a965f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("📩 Background message:", payload);

  if (payload.notification) {
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
    });
  }
});