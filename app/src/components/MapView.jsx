import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getServiceIcon, getServiceLabel } from './mapIcons.js';
import Button from './Button.jsx';

// Corrige os caminhos dos ícones padrão do Leaflet em bundlers como o Vite.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapRecenter({ center }) {
  const map = useMap();
  const previousCenter = useRef(center);

  useEffect(() => {
    if (!center || !map) {
      return;
    }

    const [lat, lng] = center;
    const [prevLat, prevLng] = previousCenter.current ?? [];

    if (lat === prevLat && lng === prevLng) {
      return;
    }

    map.flyTo(center, map.getZoom(), {
      duration: 0.6,
    });

    previousCenter.current = center;
  }, [center, map]);

  return null;
}

function ServiceMarker({ marker, isActive, onClick }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    } else if (!isActive && markerRef.current) {
      markerRef.current.closePopup();
    }
  }, [isActive]);

  const categoryLabel = marker.categoryLabel ?? getServiceLabel(marker.category);

  return (
    <Marker
      ref={markerRef}
      position={marker.position}
      icon={getServiceIcon(marker.category)}
      eventHandlers={{
        click: () => onClick?.(marker),
      }}
    >
      <Popup className="map-popup">
        <div className="map-popup__title">{marker.title}</div>
        {marker.address && <p className="map-popup__subtitle">{marker.address}</p>}
        {marker.description && <p className="map-popup__description">{marker.description}</p>}
        {(marker.distance || categoryLabel) && (
          <p className="map-popup__meta">
            {marker.distance ? `${marker.distance.toFixed(1)} km` : null}
            {marker.distance && categoryLabel ? ' • ' : null}
            {categoryLabel}
          </p>
        )}
      </Popup>
    </Marker>
  );
}

export default function MapView({
  center,
  zoom = 13,
  markers = [],
  onReady,
  onMarkerClick,
  activeMarkerId,
  children,
}) {
  const [mapInstance, setMapInstance] = useState(null);
  const [hasTileError, setHasTileError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  // Garante que o Leaflet recalcule o tamanho do container após montagem e em redimensionamentos
  useEffect(() => {
    if (!mapInstance) return;

    const invalidate = () => {
      try {
        mapInstance.invalidateSize({ animate: false });
      } catch {}
    };

    requestAnimationFrame(invalidate);
    const timeoutId = setTimeout(invalidate, 120);

    window.addEventListener('resize', invalidate);
    return () => {
      window.removeEventListener('resize', invalidate);
      clearTimeout(timeoutId);
    };
  }, [mapInstance]);

  const overlays = useMemo(() => {
    if (typeof children === 'function') {
      return children(mapInstance);
    }
    return children;
  }, [children, mapInstance]);

  const handleMapReady = (map) => {
    setMapInstance(map);
    onReady?.(map);
  };

  const handleTileError = useCallback(() => {
    setHasTileError(true);
  }, []);

  const handleRetry = () => {
    setHasTileError(false);
    setMapInstance(null);
    onReady?.(null);
    setReloadToken((token) => token + 1);
  };

  return (
    <div className="map-view">
      <MapContainer
        key={reloadToken}
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="map-view__container"
        style={{ width: '100%', height: '100%' }}
        whenCreated={handleMapReady}
        preferCanvas
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
          eventHandlers={{ tileerror: handleTileError }}
        />
        {center && <MapRecenter center={center} />}
        {markers.map((marker) => (
          <ServiceMarker
            key={marker.id}
            marker={marker}
            isActive={marker.id === activeMarkerId}
            onClick={onMarkerClick}
          />
        ))}
      </MapContainer>
      {hasTileError ? (
        <div className="map-view__fallback" role="alert" aria-live="assertive">
          <div className="map-view__fallback-card">
            <span className="material-symbols-outlined" aria-hidden="true">
              map_off
            </span>
            <h2>Mapa temporariamente indisponível</h2>
            <p>
              Não conseguimos carregar os tiles do mapa agora. Verifique sua conexão ou tente
              novamente em instantes.
            </p>
            <Button onClick={handleRetry} variant="primary">
              Tentar novamente
            </Button>
          </div>
        </div>
      ) : null}
      {overlays ? <div className="map-view__overlays">{overlays}</div> : null}
    </div>
  );
}

