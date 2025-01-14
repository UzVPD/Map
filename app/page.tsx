'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { governmentBuildings, GovernmentBuilding } from '../data/government-buildings'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function GovernmentBuildingLocator() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBuilding, setSelectedBuilding] = useState<GovernmentBuilding | null>(null)

  const filteredBuildings = governmentBuildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-slate-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Поиск</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Найти здание правительства..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button variant="secondary">Найти</Button>
        </div>
      </header>
      <main className="flex-grow relative">
        <Map buildings={filteredBuildings} onBuildingSelect={setSelectedBuilding} />
      </main>
      {selectedBuilding && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-semibold">{selectedBuilding.name}</h2>
          <p className="text-sm text-gray-600">{selectedBuilding.address}</p>
          <p className="mt-2"><strong>Department:</strong> {selectedBuilding.department}</p>
          <div className="mt-2">
            <strong>Services:</strong>
            <ul className="list-disc list-inside">
              {selectedBuilding.services.map((service, index) => (
                <li key={index} className="text-sm">{service}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

/* eslint-enable @typescript-eslint/no-unused-vars */