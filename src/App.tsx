import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Socials from "src/socials";
import Calculator from "src/calculator";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Socials />
      <Calculator />
    </ThemeProvider>
  );
}

export default App;
