'use client';

import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  PHOENIX_MAP_CENTER,
  RESOURCE_NODES,
  RESOURCE_TYPE_META,
} from '@/lib/resource-nodes/locations';

/**
 * Interactive Phoenix metro map for /resource-nodes.
 *
 * Uses Leaflet + CARTO Voyager tiles (a free, OSM-derived daytime style
 * with clean typography). Pins are CircleMarkers colored by resource
 * category so the map reads cleanly at any zoom level.
 *
 * Pure client component — dynamically imported in page.tsx with
 * `ssr: false` because Leaflet pokes at `window` on mount.
 */
export default function ResourceMap() {
  return (
    <MapContainer
      center={[PHOENIX_MAP_CENTER.lat, PHOENIX_MAP_CENTER.lng]}
      zoom={PHOENIX_MAP_CENTER.zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', background: '#0a1628' }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains={['a', 'b', 'c', 'd']}
        maxZoom={19}
        crossOrigin
      />

      {RESOURCE_NODES.map((node) => {
        const meta = RESOURCE_TYPE_META[node.type];
        return (
          <CircleMarker
            key={node.id}
            center={[node.lat, node.lng]}
            radius={9}
            pathOptions={{
              color: '#02070d',
              weight: 2,
              fillColor: meta.color,
              fillOpacity: 0.92,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
              <div style={{ fontFamily: 'system-ui, sans-serif', minWidth: 180 }}>
                <strong style={{ display: 'block', color: '#0b1c2e', fontSize: 13 }}>
                  {node.name}
                </strong>
                <span style={{ color: '#6b7280', fontSize: 11 }}>
                  {meta.label.replace(/s$/, '')} · {node.district}
                </span>
              </div>
            </Tooltip>
            <Popup>
              <div style={{ fontFamily: 'system-ui, sans-serif', minWidth: 220 }}>
                <strong style={{ display: 'block', color: '#0b1c2e', fontSize: 14, marginBottom: 4 }}>
                  {node.name}
                </strong>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: meta.color, fontWeight: 700, marginBottom: 6 }}>
                  {meta.label.replace(/s$/, '')}
                </div>
                <div style={{ color: '#374151', fontSize: 12, lineHeight: 1.45 }}>
                  <div><strong>District:</strong> {node.district}</div>
                  <div><strong>Hours:</strong> {node.hours}</div>
                  <div><strong>Status:</strong> {node.status}</div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
