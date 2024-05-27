// Firebase functions to store IP address, count unique IP addresses, and count page views
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, push, get, set } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "protected-url.firebaseapp.com",
  projectId: "protected-url",
  storageBucket: "protected-url.appspot.com",
  messagingSenderId: "414990228856",
  appId: "1:414990228856:web:9e90962fe495503f0e7c8d",
  databaseURL: "https://protected-url-default-rtdb.asia-southeast1.firebasedatabase.app" // Add this line
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get IP address using api.apify.org in JSON format
async function getIP() {
  const response = await fetch('https://api.apify.com/v2/browser-info');
  const data = await response.json();
  return data.clientIp;
}

// Store IP address in Firebase database
async function storeIP(ip) {
  const ipRef = ref(database, 'ip');
  push(ipRef, ip);
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
    const uniqueIps = new Set(Object.values(data));
    let size = uniqueIps.size;
    return formatNumber(size);
  } else {
    return "0";
  }
}

// Count page views
async function countPageViews() {
  const pageViewRef = ref(database, 'page-views');
  const snapshot = await get(pageViewRef);
  const data = snapshot.val();
  let datacount = data ? data.count : 0;
  set(ref(database, 'page-views/count'), datacount + 1);
  return formatNumber(datacount);
}

// Update page views
async function updatePageViews() {
  const [formattedSizee, formattedCountt] = await Promise.all([countIP(), countPageViews()]);
  document.getElementById('view-count').innerHTML = `<span class="tooltiptext"> ` + formattedSizee +` views | `+ formattedCountt +` visits</span><i class="fa-solid fa-eye"></i> ` + formattedSizee + " | " + formattedCountt;
}

// Store IP address in Firebase database only if it is not already stored
getIP().then(ip => {
  const ipRef = ref(database, 'ip');
  get(ipRef).then(snapshot => {
    const data = snapshot.val();
    const uniqueIps = data ? new Set(Object.values(data)) : new Set();
    if (!uniqueIps.has(ip)) {
      storeIP(ip);
    }
  });
});

// Display value of unique visitors
updatePageViews();
