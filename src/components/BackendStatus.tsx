import { useEffect } from "react";
import { Wifi, WifiOff, CheckCircle, AlertCircle } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { checkBackendHealth } from "../services/fontIdentification";

export const BackendStatus = () => {
  const { backendConnected, setBackendConnected } = useAppStore();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const isHealthy = await checkBackendHealth();
        setBackendConnected(isHealthy);
      } catch (error) {
        setBackendConnected(false);
      }
    };

    // Check immediately
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, [setBackendConnected]);

  if (backendConnected) {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Backend Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-red-600">
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm font-medium">Backend Disconnected</span>
    </div>
  );
};
