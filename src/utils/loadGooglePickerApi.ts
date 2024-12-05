export const loadGooglePickerApi = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.google && window.google.picker) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi.load("picker", { callback: resolve });
      };
      script.onerror = reject;
      document.body.appendChild(script);
    }
  });
};
