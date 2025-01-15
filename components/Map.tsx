/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GovernmentBuilding } from '../data/government-buildings'

interface MapProps {
  buildings: GovernmentBuilding[]
}

export default function Map({ buildings }: MapProps) {
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

    // Create a custom icon using a building SVG
    const customIcon = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M3 22v-2h18v2"></path><path d="M6 18V8h12v10"></path><path d="M9 22V12h6v10"></path><path d="M10 10h4"></path></svg>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    })

    // Add new markers with custom icon
    buildings.forEach(building => {
      const marker = L.marker([building.lat, building.lng], { icon: customIcon }).addTo(map)
      marker.bindTooltip(building.name)

      // Bind a popup to the marker
      marker.bindPopup(`
        <div>
          <h2 class="text-xl font-semibold">${building.name}</h2>
          <p class="text-sm text-gray-600">${building.address}</p>
          <p class="mt-2"><strong>Department:</strong> ${building.department}</p>
          <div class="mt-2">
            <strong>Services:</strong>
            <ul class="list-disc list-inside">
              ${building.services.map(service => `<li class="text-sm">${service}</li>`).join('')}
            </ul>
          </div>
        </div>
      `)

      // Show popup on click using an arrow function
      marker.on('click', () => {
        marker.openPopup()
      })
    })

    return () => {
      if (map) {
        map.remove()
        mapRef.current = null
      }
    }
  }, [buildings, mapReady])

  useEffect(() => {
    setMapReady(true)
  }, [])

  return <div id="map" className="w-full h-full" />
}
/* eslint-enable @typescript-eslint/no-unused-vars */
 