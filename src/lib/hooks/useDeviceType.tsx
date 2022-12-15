import { useEffect, useState } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<
    "Desktop" | "Tablet" | "Phone" | null
  >(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDeviceType("Phone");
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      setDeviceType("Tablet");
    } else if (window.innerWidth > 1024) {
      setDeviceType("Desktop");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setDeviceType("Phone");
      } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
        setDeviceType("Tablet");
      } else if (window.innerWidth > 1024) {
        setDeviceType("Desktop");
      }
    });
  }, [deviceType]);

  return deviceType;
};

export default useDeviceType;
