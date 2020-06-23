/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.4/firebase-messaging.js"
);

const FBconfig = {
  apiKey: "AIzaSyBrwnRDZOugtuSbVfaR6VKL1p1ukg4hys4",
  authDomain: "dsmbamboo.firebaseapp.com",
  databaseURL: "https://dsmbamboo.firebaseio.com",
  projectId: "dsmbamboo",
  storageBucket: "dsmbamboo.appspot.com",
  messagingSenderId: "856446302621",
  appId: "1:856446302621:web:0735ed38491159b7309774",
  measurementId: "G-Y39C2L178F",
};

firebase.initializeApp(FBconfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const title = payload.data.title;
  const options = {
    body: payload.data.body,
    icon: "./logo192.png",
    badge: "./logo192.png",
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function (event) {
  const currentURL = "http://localhost:3000";
  event.notification.close();

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.split("/")[2] === currentURL.split("/")[2]) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(currentURL);
      }
    });

  event.waitUntil(promiseChain);
});
