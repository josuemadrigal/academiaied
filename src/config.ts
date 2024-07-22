// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "firebase/remote-config";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCFDXB34S7W5gwAGSa8XPD_8oa3KwBIlIQ",
  authDomain: "academiaied.firebaseapp.com",
  projectId: "academiaied",
  storageBucket: "academiaied.appspot.com",
  messagingSenderId: "109940078570",
  appId: "1:109940078570:web:274e8c7f50e99aa2d1a493",
  measurementId: "G-E4CGXVLYVR",
};
// Inicializa Firebase y Remote Config
const app = initializeApp(firebaseConfig);
const remoteConfigInstance = getRemoteConfig(app);

// Configuración de Remote Config
remoteConfigInstance.settings = {
  fetchTimeoutMillis: 60000, // Tiempo de espera de obtención en milisegundos (1 minuto)
  minimumFetchIntervalMillis: 3600000, // Intervalo mínimo de obtención en milisegundos (1 hora)
};

// Hook personalizado para Remote Config
const useFirebaseRemoteConfig = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        await fetchAndActivate(remoteConfigInstance);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const getConfigValue = <T>(key: string): T | null => {
    const value = getValue(remoteConfigInstance, key).asString();
    return value ? (JSON.parse(value) as T) : null;
  };

  return { loading, error, getConfigValue };
};

export default useFirebaseRemoteConfig;
