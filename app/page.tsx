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
  // const [selectedBuilding, setSelectedBuilding] = useState<GovernmentBuilding | null>(null)

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
        <Map buildings={filteredBuildings} />
      </main>
    </div>
  )
}

/* eslint-enable @typescript-eslint/no-unused-vars */