import { useEffect, useRef, useState } from "react";
import type { Map } from "leaflet";

const AVAILABLE_CARS = [
  { id: 1, lat: 55.7558, lng: 37.6173, name: "Tesla Model 3", class: "Электро", price: "4.5", charge: 92, status: "free" },
  { id: 2, lat: 55.7620, lng: 37.6050, name: "BMW i4", class: "Бизнес", price: "6.2", charge: 87, status: "free" },
  { id: 3, lat: 55.7480, lng: 37.6320, name: "Kia EV6", class: "Комфорт", price: "3.8", charge: 74, status: "free" },
  { id: 4, lat: 55.7700, lng: 37.6250, name: "Hyundai IONIQ 5", class: "Семейный", price: "4.1", charge: 95, status: "free" },
  { id: 5, lat: 55.7540, lng: 37.5900, name: "Tesla Model Y", class: "Электро", price: "5.1", charge: 61, status: "busy" },
  { id: 6, lat: 55.7380, lng: 37.6080, name: "Kia EV6", class: "Комфорт", price: "3.8", charge: 88, status: "free" },
  { id: 7, lat: 55.7650, lng: 37.6500, name: "BMW i4", class: "Бизнес", price: "6.2", charge: 79, status: "free" },
];

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} м` : `${km.toFixed(1)} км`;
}

type GeoStatus = "idle" | "loading" | "granted" | "denied";

interface CarWithDist {
  id: number;
  lat: number;
  lng: number;
  name: string;
  class: string;
  price: string;
  charge: number;
  status: string;
  dist?: number;
}

interface CarMapProps {
  onNearbyCars?: (cars: CarWithDist[]) => void;
}

export default function CarMap({ onNearbyCars }: CarMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyCars, setNearbyCars] = useState<CarWithDist[]>([]);

  function locateUser() {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserPos({ lat, lng });
        setGeoStatus("granted");

        const withDist: CarWithDist[] = AVAILABLE_CARS.map((car) => ({
          ...car,
          dist: getDistanceKm(lat, lng, car.lat, car.lng),
        })).sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0));

        const nearby = withDist.filter((c) => c.status === "free").slice(0, 3);
        setNearbyCars(nearby);
        onNearbyCars?.(nearby);

        import("leaflet").then((L) => {
          const map = mapInstanceRef.current;
          if (!map) return;

          map.setView([lat, lng], 14);

          const pulsingIcon = L.divIcon({
            html: `
              <div style="position:relative;width:44px;height:44px;display:flex;align-items:center;justify-content:center;">
                <div style="
                  position:absolute;width:44px;height:44px;border-radius:50%;
                  background:rgba(0,245,255,0.12);
                  animation:geo-pulse 2s ease-out infinite;
                "></div>
                <div style="
                  width:16px;height:16px;border-radius:50%;
                  background:#00f5ff;
                  box-shadow:0 0 12px rgba(0,245,255,0.9);
                  z-index:1;
                "></div>
              </div>
            `,
            className: "",
            iconSize: [44, 44],
            iconAnchor: [22, 22],
          });

          L.marker([lat, lng], { icon: pulsingIcon })
            .addTo(map)
            .bindPopup(
              `<div style="background:#0d1420;border:1px solid rgba(0,245,255,0.3);border-radius:10px;padding:10px 14px;font-family:'IBM Plex Sans',sans-serif;color:#fff;font-size:13px;">
                <b style="color:#00f5ff;">Вы здесь</b>
              </div>`,
              { closeButton: false, className: "drive-popup" }
            );

          // accuracy circle
          L.circle([lat, lng], {
            radius: pos.coords.accuracy,
            color: "#00f5ff",
            fillColor: "#00f5ff",
            fillOpacity: 0.04,
            weight: 1,
            opacity: 0.3,
          }).addTo(map);
        });
      },
      () => setGeoStatus("denied")
    );
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [55.758, 37.615],
        zoom: 13,
        zoomControl: false,
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      AVAILABLE_CARS.forEach((car) => {
        const isFree = car.status === "free";
        const iconHtml = `
          <div style="
            width:40px;height:40px;
            background:${isFree ? "rgba(0,245,255,0.15)" : "rgba(139,92,246,0.15)"};
            border:2px solid ${isFree ? "#00f5ff" : "#8b5cf6"};
            border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 0 12px ${isFree ? "rgba(0,245,255,0.6)" : "rgba(139,92,246,0.4)"};
            cursor:pointer;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isFree ? "#00f5ff" : "#8b5cf6"}" stroke-width="2">
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
              <circle cx="9" cy="20" r="2"/><circle cx="19" cy="20" r="2"/>
            </svg>
          </div>`;

        const icon = L.divIcon({ html: iconHtml, className: "", iconSize: [40, 40], iconAnchor: [20, 20] });

        const popupHtml = `
          <div style="background:#0d1420;border:1px solid rgba(0,245,255,0.3);border-radius:12px;padding:14px;min-width:200px;font-family:'IBM Plex Sans',sans-serif;color:#fff;">
            <div style="font-family:'Exo 2',sans-serif;font-weight:900;font-size:15px;margin-bottom:6px;">${car.name}</div>
            <div style="display:flex;gap:8px;margin-bottom:10px;">
              <span style="background:rgba(0,245,255,0.1);border:1px solid rgba(0,245,255,0.3);color:#00f5ff;font-family:'IBM Plex Mono',monospace;font-size:10px;padding:2px 8px;border-radius:20px;letter-spacing:1px;">${car.class}</span>
              <span style="background:${isFree ? "rgba(0,245,255,0.1)" : "rgba(139,92,246,0.1)"};border:1px solid ${isFree ? "rgba(0,245,255,0.3)" : "rgba(139,92,246,0.3)"};color:${isFree ? "#00f5ff" : "#8b5cf6"};font-family:'IBM Plex Mono',monospace;font-size:10px;padding:2px 8px;border-radius:20px;letter-spacing:1px;">${isFree ? "СВОБОДЕН" : "ЗАНЯТ"}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4b5563;margin-bottom:2px;">ЗАРЯД</div>
                <div style="font-size:13px;font-weight:600;color:${car.charge > 70 ? "#00f5ff" : car.charge > 40 ? "#f59e0b" : "#ef4444"}">${car.charge}%</div>
              </div>
              <div style="text-align:right;">
                <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4b5563;margin-bottom:2px;">ТАРИФ</div>
                <div style="font-family:'Exo 2',sans-serif;font-weight:900;font-size:16px;color:#00f5ff;">${car.price} ₽<span style="font-size:11px;color:#6b7280;font-weight:400;">/мин</span></div>
              </div>
            </div>
            ${isFree ? `<button onclick="alert('Бронирование!')" style="width:100%;background:#00f5ff;color:#080c14;border:none;border-radius:8px;padding:8px;font-family:'Exo 2',sans-serif;font-weight:900;font-size:12px;letter-spacing:2px;cursor:pointer;">ЗАБРОНИРОВАТЬ</button>` : ""}
          </div>`;

        L.marker([car.lat, car.lng], { icon })
          .addTo(map)
          .bindPopup(popupHtml, { closeButton: false, className: "drive-popup" });
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden neon-border">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>{`
        @keyframes geo-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        .drive-popup .leaflet-popup-content-wrapper { background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important; }
        .drive-popup .leaflet-popup-tip-container { display:none; }
        .drive-popup .leaflet-popup-content { margin:0!important; }
        .leaflet-control-zoom a { background:#0d1420!important;color:#00f5ff!important;border-color:rgba(0,245,255,0.3)!important; }
        .leaflet-control-zoom a:hover { background:rgba(0,245,255,0.15)!important; }
        .leaflet-control-attribution { background:rgba(8,12,20,0.8)!important;color:#374151!important;font-size:10px!important; }
        .leaflet-control-attribution a { color:#4b5563!important; }
      `}</style>

      <div ref={mapRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="glass-card rounded-xl px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-400 tracking-wider">
            {AVAILABLE_CARS.filter((c) => c.status === "free").length} авто доступно
          </span>
        </div>
        <div className="glass-card rounded-xl px-3 py-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-cyan-400" style={{ boxShadow: "0 0 6px rgba(0,245,255,0.6)" }} />
            <span className="font-mono text-xs text-gray-400">Свободен</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-purple-500" style={{ boxShadow: "0 0 6px rgba(139,92,246,0.4)" }} />
            <span className="font-mono text-xs text-gray-400">Занят</span>
          </div>
        </div>
      </div>

      {/* Geo button */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        {geoStatus === "denied" && (
          <div className="glass-card rounded-xl px-3 py-2 mb-2">
            <span className="font-mono text-xs text-red-400">Геолокация недоступна</span>
          </div>
        )}
        {geoStatus === "granted" && userPos && nearbyCars.length > 0 && (
          <div className="glass-card rounded-xl p-3 mb-2 max-w-[220px]">
            <div className="font-mono text-xs text-cyan-400 tracking-wider mb-2">БЛИЖАЙШИЕ</div>
            <div className="space-y-1.5">
              {nearbyCars.map((car) => (
                <div key={car.id} className="flex items-center justify-between gap-3">
                  <span className="font-sans text-xs text-white truncate">{car.name}</span>
                  <span className="font-mono text-xs text-cyan-400 whitespace-nowrap flex-shrink-0">
                    {formatDist(car.dist ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={locateUser}
          disabled={geoStatus === "loading"}
          className="neon-btn px-4 py-2.5 rounded-xl font-mono text-xs tracking-widest uppercase flex items-center gap-2 disabled:opacity-50"
        >
          {geoStatus === "loading" ? (
            <>
              <div className="w-3 h-3 border border-cyan-400 border-t-transparent rounded-full animate-spin" />
              Определяю...
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
              {geoStatus === "granted" ? "Обновить" : "Моё место"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}