import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { DecorationMaterial } from '../data/elevatorQuote'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  materials: DecorationMaterial[]
}

// 按材质分类分组
function groupMaterials(materials: DecorationMaterial[]) {
  const groups: Record<string, DecorationMaterial[]> = {}
  const categoryNames: Record<string, string> = {
    steel: '钢板类',
    ss201: '201不锈钢',
    ss304: '304不锈钢',
    ss443: '443不锈钢',
    ss316: '316不锈钢',
    combo: '组合类',
  }
  for (const m of materials) {
    const cat = m.category || 'other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(m)
  }
  // 按优先级排序
  const order = ['steel', 'ss201', 'ss304', 'ss443', 'ss316', 'combo']
  return order
    .filter(k => groups[k])
    .map(k => ({ label: categoryNames[k] || k, items: groups[k] }))
}

export default function DecorationSelect({ label, value, onChange, materials }: Props) {
  const [open, setOpen] = useState(false)
  const groups = groupMaterials(materials)

  const selected = materials.find(m => m.name === value)

  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm hover:border-gray-400 transition"
        >
          <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
            {selected ? selected.name : '请选择'}
          </span>
          <div className="flex items-center gap-2">
            {selected && selected.price > 0 && (
              <span className="text-xs text-orange-500">+¥{selected.price.toLocaleString()}</span>
            )}
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
              {groups.map(group => (
                <div key={group.label}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-gray-50 border-b border-gray-100 sticky top-0">
                    {group.label}
                  </div>
                  {group.items.map(m => {
                    const isSelected = m.name === value
                    return (
                      <button
                        key={m.id}
                        onClick={() => { onChange(m.name); setOpen(false) }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-sm hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                      >
                        <span className={isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}>{m.name}</span>
                        <span className={`text-xs ${m.price > 0 ? 'text-orange-500' : 'text-gray-300'}`}>
                          {m.price > 0 ? `+¥${m.price.toLocaleString()}` : '—'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
