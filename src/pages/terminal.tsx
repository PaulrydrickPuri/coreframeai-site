// mentalOS/pages/terminal.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const modes = ["Builder", "Creator", "Learner", "Strategist"]

export default function MentalOSTerminal() {
  const [mode, setMode] = useState("Builder")
  const [confirmed, setConfirmed] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const handleBoot = (selectedMode: string) => {
    setMode(selectedMode)
    setConfirmed(false)
    setLog((prev) => [...prev, `> boot ${selectedMode}`])
  }

  const handleConfirm = () => {
    setConfirmed(true)
    setLog((prev) => [...prev, `> confirm ✅`, `Booting into ${mode} mode...`])
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-6">
      <Card className="bg-[#1c2b4a] text-white w-full max-w-2xl shadow-xl rounded-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">mentalOS Terminal</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {modes.map((m) => (
              <Button
                key={m}
                variant={mode === m ? "default" : "outline"}
                onClick={() => handleBoot(m)}
              >
                {m}
              </Button>
            ))}
          </div>

          {!confirmed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-sm text-gray-400 mb-2">{`> mentalOS boot ${mode}`}</p>
              <Button className="w-full" onClick={handleConfirm}>
                &gt; confirm ✅
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-300 mt-4 text-center"
            >
              <p className="text-sm">Booting into <strong>{mode}</strong> mode complete.</p>
            </motion.div>
          )}

          <div className="mt-6 bg-black text-green-400 font-mono p-4 rounded-md max-h-64 overflow-y-auto text-sm">
            {log.map((entry, i) => (
              <p key={i}>{entry}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="mt-4 text-xs text-gray-400 italic text-center">
        mentalOSv1@CoreframeAI · boot sequence complete ✅
      </p>
    </div>
  )
}
