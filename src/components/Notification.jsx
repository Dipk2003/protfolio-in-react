import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Notification = ({ message, type, onClose }) => {
  useGSAP(() => {
    gsap.fromTo(
      ".notification",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(".notification", {
        x: 300,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: onClose
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-400';
      case 'error':
        return 'bg-red-500 border-red-400';
      default:
        return 'bg-blue-500 border-blue-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`notification fixed top-4 right-4 z-50 p-4 rounded-lg border ${getNotificationStyles()} text-white shadow-lg max-w-sm`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{getIcon()}</span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={() => {
            gsap.to(".notification", {
              x: 300,
              opacity: 0,
              duration: 0.3,
              onComplete: onClose
            });
          }}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;
