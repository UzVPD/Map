/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GovernmentBuilding } from '../data/government-buildings'

interface MapProps {
  buildings: GovernmentBuilding[]
  onBuildingSelect: (building: GovernmentBuilding) => void
}

export default function Map({ buildings, onBuildingSelect }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!mapReady) return

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([42.808226, 74.583031], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
    }

    const map = mapRef.current

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // Create a custom icon using Lucide React Flag icon
    const customIcon = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    })

    // Add new markers with custom icon
    buildings.forEach(building => {
      const marker = L.marker([building.lat, building.lng], { icon: customIcon }).addTo(map)
      marker.bindTooltip(building.name)
      marker.on('click', () => onBuildingSelect(building))
    })

    return () => {
      if (map) {
        map.remove()
        mapRef.current = null
      }
    }
  }, [buildings, onBuildingSelect, mapReady])

  useEffect(() => {
    setMapReady(true)
  }, [])

  return <div id="map" className="w-full h-full" />
}
/* eslint-enable @typescript-eslint/no-unused-vars */
