import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const useKakaoMapScript = (appKey: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 이미 스크립트 있으면 바로 loaded 처리
    if (window.kakao) {
      setLoaded(true);
      return;
    }

    const appKey = "dfad19e266ab892aaa6536786f60df51";
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      setLoaded(true);
      console.log("Kakao Maps SDK loaded");
    };

    script.onerror = () => {
      console.error("Failed to load Kakao Maps SDK");
    };

    // cleanup
    return () => {
      // script 제거 필요하면 여기에
    };
  }, [appKey]);

  return loaded;
};

const KakaoMap = () => {
  const loaded = useKakaoMapScript("dfad19e266ab892aaa6536786f60df51");

  useEffect(() => {
    if (!loaded || !window.kakao) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };

      new window.kakao.maps.Map(container, options);
    });
  }, [loaded]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        backgroundColor: "#eee",
      }}
    />
  );
};

export default KakaoMap;
