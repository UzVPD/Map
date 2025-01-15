'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { governmentBuildings, GovernmentBuilding } from '../data/government-buildings'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function GovernmentBuildingLocator() {
  const [searchTerm, setSearchTerm] = useState('')
  const mapRef = useRef<{ zoomToBuilding: (lat: number, lng: number) => void } | null>(null)

  const filteredBuildings = governmentBuildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBuildingClick = (building: GovernmentBuilding) => {
    setSearchTerm(building.name)
    if (mapRef.current) {
      mapRef.current.zoomToBuilding(building.lat, building.lng)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-slate-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Поиск</h1>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Найти здание правительства..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow text-black"
          />
          <Button variant="secondary">Найти</Button>
        </div>
        {searchTerm && (
          <ul className="bg-white text-black rounded shadow-md max-h-40 overflow-y-auto mt-2">
            {filteredBuildings.map((building) => (
              <li
                key={building.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleBuildingClick(building)}
              >
                {building.name}
              </li>
            ))}
          </ul>
        )}
      </header>
      <main className="flex-grow relative">
        <Map ref={mapRef} buildings={filteredBuildings} />
      </main>
    </div>
  )
}

/* eslint-enable @typescript-eslint/no-unused-vars */