// Firebase functions to store IP address, count unique IP addresses, and count page views
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, push, get, set, increment } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

//fetch api key from https://proturl.netlify.app/apikeys/?key=FIREBASE_KEY
const response = await fetch(`https://proturl.netlify.app/apikeys/?key=FIREBASE_KEY`);
const data = await response.json();

// Configure Firebase
const firebaseConfig = {
  apiKey: data.key,
  authDomain: "protected-url.firebaseapp.com",
  projectId: "protected-url",
  storageBucket: "protected-url.appspot.com",
  messagingSenderId: "414990228856",
  appId: "1:414990228856:web:9e90962fe495503f0e7c8d",
  databaseURL: "https://protected-url-default-rtdb.asia-southeast1.firebasedatabase.app" // Add this line
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Authenticate anonymously
signInAnonymously(auth).catch(error => {
  console.error("Authentication error:", error);
});

//on successfull authentication console log the user
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Authenticated user:", user.uid);
  }
});

// Get IP address using a more secure method
async function getIP() {
  const response = await fetch('https://api.apify.com/v2/browser-info');
  const data = await response.json();
  return data.clientIp;
}

// Store IP address in Firebase database
async function storeIP(ip) {
  const ipRef = ref(database, 'ip');
  push(ipRef, { ip: ip });
}

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
}

// Count unique IP addresses
async function countIP() {
  const ipRef = ref(database, 'ip');
  const snapshot = await get(ipRef);
  const data = snapshot.val();
  if (data) {
    const uniqueIps = new Set(Object.values(data).map(entry => entry.ip));
    let size = uniqueIps.size;
    return formatNumber(size);
  } else {
    return "0";
  }
}

// Count page views
async function countPageViews() {
  const pageViewRef = ref(database, 'page-views/count');
  const snapshot = await get(pageViewRef);
  const data = snapshot.val();
  let datacount = data ? data : 0;
  await set(ref(database, 'page-views/count'), increment(1));
  return formatNumber(datacount + 1);
}

// Update page views
async function updatePageViews() {
  const [formattedSize, formattedCount] = await Promise.all([countIP(), countPageViews()]);
  document.getElementById('view-count').innerHTML = `<span class="tooltiptext"> ${formattedSize} views | ${formattedCount} visits</span><i class="fa-solid fa-eye"></i> ${formattedSize} | ${formattedCount}`;
}

// Store IP address in Firebase database only if it is not already stored
getIP().then(ip => {
  const ipRef = ref(database, 'ip');
  get(ipRef).then(snapshot => {
    const data = snapshot.val();
    const uniqueIps = data ? new Set(Object.values(data).map(entry => entry.ip)) : new Set();
    if (!uniqueIps.has(ip)) {
      storeIP(ip);
    }
  });
});

// Display value of unique visitors
updatePageViews();