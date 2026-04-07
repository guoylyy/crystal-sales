import { useState, useRef, useEffect } from 'react'
import { Calculator, Check, Settings, Zap, Shield, Truck, Star, ChevronDown, AlertTriangle, X, ZoomIn } from 'lucide-react'
import {
  calculatePrice,
  type QuoteSelections,
  DEFAULT_SELECTIONS,
  LOAD_OPTIONS,
  SPEED_OPTIONS,
  FLOOR_OPTIONS,
  TRACTION_OPTIONS,
  CONTROLLER_OPTIONS,
  DOOR_MACHINE_OPTIONS,
  DOOR_OPENING_OPTIONS,
  CABIN_PRESETS,
  CEILING_PRESETS,
  FLOOR_PRESETS,
  DOOR_PRESETS,
  COP_PRESETS,
  LOP_PRESETS,
  DISPLAY_OPTIONS,
  CALLBOX_STYLE_OPTIONS,
  OPTIONAL_ITEMS,
  DECORATION_MATERIALS,
  BASE_PRICE,
} from '../data/elevatorQuote'

// ============================================================
// 公共组件
// ============================================================

function SectionCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Icon size={18} className="text-blue-600" />
        {title}
      </h2>
      {children}
    </div>
  )
}

function SelectButton({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { name: string; nameEn: string; price: number }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const selected = value === opt.name
          return (
            <button
              key={opt.name}
              onClick={() => onChange(opt.name)}
              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                selected
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="text-xs">{opt.name}</div>
              {opt.price !== 0 && (
                <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                  {opt.price > 0 ? '+' : ''}¥{opt.price.toLocaleString()}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// 图片放大弹窗
// ============================================================
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
        >
          <X size={28} />
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-xl"
          style={{ maxHeight: '85vh' }}
          onError={e => {
            ;(e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect fill='%23e5e7eb' width='400' height='400'/><text x='200' y='210' text-anchor='middle' fill='%239ca3af' font-size='20'>${alt}</text></svg>`
          }}
        />
        <div className="text-center text-white text-sm mt-3 opacity-75">{alt}</div>
      </div>
    </div>
  )
}

// ============================================================
// 左侧滚动列表 + 主图 图片选择器（右侧可放额外内容）
// ============================================================
function ImageSelector<T extends { id: string; image: string; label: string; price?: number }>({
  title,
  items,
  selectedId,
  onSelect,
  sideContent,
}: {
  title: string
  items: T[]
  selectedId: string
  onSelect: (id: string) => void
  sideContent?: React.ReactNode
}) {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null)

  const selectedItem = items.find(i => i.id === selectedId) ?? items[0]

  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex gap-3">
        {/* 左侧：可滚动缩略图列表（仅纵向滚动，禁止横向） */}
        <div
          className="flex flex-col gap-2 flex-shrink-0"
          style={{ maxHeight: 340, width: 120, overflowY: 'auto', overflowX: 'hidden' }}
        >
          {items.map(item => {
            const selected = item.id === selectedId
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`relative w-full rounded-lg overflow-hidden border-2 transition-all text-left flex-shrink-0 ${
                  selected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="w-full bg-gray-100" style={{ height: 100 }}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    onError={e => {
                      ;(e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect fill='%23e5e7eb' width='100' height='100'/><text x='50' y='55' text-anchor='middle' fill='%239ca3af' font-size='9'>${item.label}</text></svg>`
                    }}
                  />
                </div>
                <div className="px-1 py-0.5 text-center bg-white">
                  <div className="text-xs font-medium text-gray-700 leading-tight truncate">{item.label}</div>
                  {(item.price ?? 0) > 0 && (
                    <div className="text-xs text-orange-500">+¥{(item.price ?? 0).toLocaleString()}</div>
                  )}
                </div>
                {selected && (
                  <div className="absolute top-1 right-1 bg-blue-600 rounded-full p-0.5">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* 中间：主图 */}
        <div className="flex-shrink-0" style={{ width: 280 }}>
          {selectedItem && (
            <div className="relative rounded-xl overflow-hidden border-2 border-blue-200 bg-gray-100 group cursor-pointer"
              style={{ width: 280, height: 280 }}
              onClick={() => setLightboxImg({ src: selectedItem.image, alt: selectedItem.label })}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.label}
                className="w-full h-full object-cover"
                onError={e => {
                  ;(e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><rect fill='%23e5e7eb' width='280' height='280'/><text x='140' y='145' text-anchor='middle' fill='%239ca3af' font-size='16'>${selectedItem.label}</text></svg>`
                }}
              />
              {/* 放大提示遮罩 */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={40} className="text-white" />
              </div>
            </div>
          )}
          {selectedItem && (
            <div className="text-center mt-1.5">
              <div className="text-sm font-semibold text-blue-600 truncate">{selectedItem.label}</div>
              {(selectedItem.price ?? 0) > 0 && (
                <div className="text-xs text-orange-500">+¥{(selectedItem.price ?? 0).toLocaleString()}</div>
              )}
              <div className="text-xs text-gray-400 mt-0.5">点击可放大查看</div>
            </div>
          )}
        </div>

        {/* 右侧：额外内容（如配置选项），限制最大宽度避免过宽 */}
        {sideContent && (
          <div className="flex-1 min-w-0" style={{ maxWidth: 260 }}>
            {sideContent}
          </div>
        )}
      </div>

      {/* 放大弹窗 */}
      {lightboxImg && (
        <ImageLightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          onClose={() => setLightboxImg(null)}
        />
      )}
    </div>
  )
}

// ============================================================
// 装潢模块底部：备注 + 参考图片上传
// ============================================================
function DecorationModuleFooter({
  remarks,
  images,
  onRemarksChange,
  onImagesChange,
  moduleName,
}: {
  remarks: string
  images: string[]
  onRemarksChange: (v: string) => void
  onImagesChange: (v: string[]) => void
  moduleName: string
}) {
  const hasCustom = remarks.trim() !== '' || images.length > 0

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        if (ev.target?.result) {
          onImagesChange([...images, ev.target.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      {hasCustom && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700">
          <AlertTriangle size={14} className="text-orange-500 flex-shrink-0" />
          <span>您填写了备注或上传了参考图片，请确认最终价格以业务员回复为准</span>
        </div>
      )}

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {moduleName}备注（选填）
        </label>
        <textarea
          value={remarks}
          onChange={e => onRemarksChange(e.target.value)}
          placeholder="特殊颜色、材质、尺寸需求..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">参考图片（选填）</label>
        <div className="flex flex-wrap gap-2 items-start">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
              <img src={img} alt={`ref-${idx}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
          <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer flex items-center justify-center text-gray-400 hover:text-blue-500 transition">
            <span className="text-xl">+</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 开门方式
// ============================================================
function DoorOpeningSelector({
  value,
  onChange,
  floorCount,
}: {
  value: string
  onChange: (v: string) => void
  floorCount: number
}) {
  const otherFloors = Math.max(0, floorCount - 1)
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">开门方式</h3>
      <div className="flex flex-wrap gap-2">
        {DOOR_OPENING_OPTIONS.map(opt => {
          const selected = value === opt.name
          const total = opt.basePrice + opt.perFloorPrice * otherFloors
          return (
            <button
              key={opt.name}
              onClick={() => onChange(opt.name)}
              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                selected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="text-xs">{opt.name}</div>
              {opt.basePrice > 0 && (
                <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                  ¥{total.toLocaleString()}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// 可搜索下拉选择框
// ============================================================
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: { name: string; price: number }[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
        setKeyword('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 打开下拉时聚焦搜索框
  const handleOpen = () => {
    setOpen(true)
    setKeyword('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // 过滤选项（按中文名或英文名关键词匹配）
  const filtered = keyword.trim()
    ? options.filter(opt =>
        opt.name.toLowerCase().includes(keyword.trim().toLowerCase())
      )
    : options

  const handleSelect = (name: string) => {
    onChange(name)
    setOpen(false)
    setKeyword('')
  }

  return (
    <div ref={wrapperRef} className="relative flex-1 min-w-0">
      {/* 触发按钮：显示当前选中值 */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center justify-between px-2 py-1 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-blue-500 bg-white hover:border-gray-400 transition-colors text-left"
      >
        <span className="truncate text-gray-800">{value || placeholder || '请选择'}</span>
        <ChevronDown
          size={12}
          className={`flex-shrink-0 ml-1 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 下拉面板 */}
      {open && (
        <div className="absolute z-50 left-0 top-full mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* 搜索框 */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="输入关键词搜索..."
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 选项列表 */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-xs text-gray-400 text-center">无匹配选项</div>
            ) : (
              filtered.map(opt => {
                const selected = value === opt.name
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => handleSelect(opt.name)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                      selected
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{opt.name}</span>
                    <span className={`flex-shrink-0 ml-2 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                      {opt.price > 0 ? `+¥${opt.price.toLocaleString()}` : opt.price < 0 ? `-¥${Math.abs(opt.price).toLocaleString()}` : ''}
                      {selected && <Check size={10} className="inline ml-1" />}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// 主页面
// ============================================================
export default function QuotationPage() {
  const [selections, setSelections] = useState<QuoteSelections>(DEFAULT_SELECTIONS)
  const [showQuote, setShowQuote] = useState(false)
  const [showAllFloors, setShowAllFloors] = useState(false)
  const [cabinLevel, setCabinLevel] = useState<'普通' | '高级' | '豪华'>('普通')

  // 墙面/轿门下拉相关
  const wallOptions = DECORATION_MATERIALS.map(m => ({ name: m.name, nameEn: m.nameEn, price: m.price }))

  const breakdown = calculatePrice(selections)
  const floorCount = parseInt(selections.floors.match(/\d+/)?.[0] || '10')
  const otherFloors = Math.max(0, floorCount - 1)
  const floorOptions = showAllFloors ? FLOOR_OPTIONS : FLOOR_OPTIONS.slice(0, 9)

  const update = <K extends keyof QuoteSelections>(key: K, value: QuoteSelections[K]) => {
    setSelections(prev => ({ ...prev, [key]: value }))
  }

  const handleCabinLevelChange = (level: '普通' | '高级' | '豪华') => {
    setCabinLevel(level)
    const first = CABIN_PRESETS.find(p => p.level === level)
    if (first) {
      setSelections(prev => ({
        ...prev,
        cabinPresetId: first.id,
        wallBack: first.wallBack,
        wallLeft: first.wallLeft,
        wallRight: first.wallRight,
        wallFront: first.wallFront,
        carDoor: first.carDoor,
      }))
    }
  }

  const handleCabinSelect = (id: string) => {
    const preset = CABIN_PRESETS.find(p => p.id === id)
    if (!preset) return
    setSelections(prev => ({
      ...prev,
      cabinPresetId: id,
      wallBack: preset.wallBack,
      wallLeft: preset.wallLeft,
      wallRight: preset.wallRight,
      wallFront: preset.wallFront,
      carDoor: preset.carDoor,
    }))
  }

  // QuoteSelections 需要加 wallBack/wallLeft/wallRight/wallFront/carDoor 字段
  // 已经在数据层添加了，这里用类型断言处理
  const wallBack = selections.wallBack
  const wallLeft = selections.wallLeft
  const wallRight = selections.wallRight
  const wallFront = selections.wallFront
  const carDoor = selections.carDoor

  const setWall = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value } as any))
  }

  const toggleOptional = (name: string) => {
    const current = selections.optionals || []
    if (current.includes(name)) {
      update('optionals', current.filter(n => n !== name))
    } else {
      update('optionals', [...current, name])
    }
  }

  const cabinLevelPresets = CABIN_PRESETS.filter(p => p.level === cabinLevel)
  const cabinPreset = CABIN_PRESETS.find(p => p.id === selections.cabinPresetId)
  const ceilingPreset = CEILING_PRESETS.find(p => p.id === selections.ceilingPresetId)
  const floorPreset = FLOOR_PRESETS.find(p => p.id === selections.floorPresetId)
  const doorPreset = DOOR_PRESETS.find(p => p.id === selections.doorPresetId)
  const copPreset = COP_PRESETS.find(p => p.id === selections.copPresetId)
  const lopPreset = LOP_PRESETS.find(p => p.id === selections.lopPresetId)

  // 轿厢四壁+轿门下拉（放在主图右侧）
  const cabinWallSideContent = (
    <div>
      <div className="text-xs font-semibold text-gray-500 mb-2">四壁 &amp; 轿门（自动填充，可手动调整）</div>
      <div className="grid grid-cols-1 gap-2">
        {[
          { key: 'wallBack', label: '后壁', value: wallBack },
          { key: 'wallLeft', label: '左侧壁', value: wallLeft },
          { key: 'wallRight', label: '右侧壁', value: wallRight },
          { key: 'wallFront', label: '前壁', value: wallFront },
          { key: 'carDoor', label: '轿门', value: carDoor },
        ].map(({ key, label, value }) => (
          <div key={key} className="flex items-center gap-1.5">
            <label className="text-xs font-semibold text-gray-600 w-14 flex-shrink-0">{label}</label>
            <SearchableSelect
              options={wallOptions}
              value={value}
              onChange={v => setWall(key, v)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  // 吊顶右侧内容（显示当前选择信息）
  const ceilingSideContent = (
    <div className="flex flex-col justify-center h-full pt-2">
      <div className="text-xs font-semibold text-gray-500 mb-2">当前选择</div>
      <div className="text-sm text-blue-600 font-medium">
        {selections.ceilingPresetId
          ? CEILING_PRESETS.find(p => p.id === selections.ceilingPresetId)?.label
          : '跟随轿厢默认（不加价）'}
      </div>
      <div className="text-xs text-gray-400 mt-1">如需定制请选择，不选择则跟随轿厢默认</div>
    </div>
  )

  // 地板右侧内容
  const floorSideContent = (
    <div className="flex flex-col justify-center h-full pt-2">
      <div className="text-xs font-semibold text-gray-500 mb-2">当前选择</div>
      <div className="text-sm text-blue-600 font-medium">
        {selections.floorPresetId
          ? FLOOR_PRESETS.find(p => p.id === selections.floorPresetId)?.label
          : '跟随轿厢默认（不加价）'}
      </div>
      <div className="text-xs text-gray-400 mt-1">如需定制请选择，不选择则跟随轿厢默认</div>
      <div className="mt-3">
        <label className="block text-xs font-semibold text-gray-600 mb-1">地板备注</label>
        <textarea
          value={selections.floorRemarks ?? ''}
          onChange={e => update('floorRemarks' as any, e.target.value)}
          placeholder="地板备注..."
          rows={2}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  )

  // COP 右侧内容
  const copSideContent = (
    <div className="flex flex-col justify-center h-full pt-2">
      <div className="text-xs font-semibold text-gray-500 mb-2">当前选择</div>
      <div className="text-sm text-blue-600 font-medium">
        {selections.copPresetId
          ? COP_PRESETS.find(p => p.id === selections.copPresetId)?.label
          : '未选择'}
      </div>
    </div>
  )

  // LOP 右侧内容
  const lopSideContent = (
    <div className="flex flex-col justify-center h-full pt-2">
      <div className="text-xs font-semibold text-gray-500 mb-2">当前选择</div>
      <div className="text-sm text-blue-600 font-medium">
        {selections.lopPresetId
          ? LOP_PRESETS.find(p => p.id === selections.lopPresetId)?.label
          : '未选择'}
      </div>
      {/* 显示器和召唤盒放在 LOP 右侧 */}
      <div className="mt-3 space-y-3">
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1">显示器</div>
          <div className="flex flex-wrap gap-1.5">
            {DISPLAY_OPTIONS.map(opt => {
              const selected = selections.display === opt.name
              return (
                <button
                  key={opt.name}
                  onClick={() => update('display', opt.name)}
                  className={`px-2 py-1 rounded-lg border-2 text-xs font-medium transition-all ${
                    selected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {opt.name}
                  {opt.price !== 0 && (
                    <span className={`ml-1 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                      {opt.price > 0 ? '+' : ''}¥{opt.price.toLocaleString()}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1">召唤盒款式</div>
          <div className="flex flex-wrap gap-1.5">
            {CALLBOX_STYLE_OPTIONS.map(opt => {
              const selected = selections.callBoxStyle === opt.name
              return (
                <button
                  key={opt.name}
                  onClick={() => update('callBoxStyle', opt.name)}
                  className={`px-2 py-1 rounded-lg border-2 text-xs font-medium transition-all ${
                    selected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {opt.name}
                  {opt.price !== 0 && (
                    <span className={`ml-1 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                      {opt.price > 0 ? '+' : ''}¥{opt.price.toLocaleString()}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-1">电梯报价系统</h1>
          <p className="text-gray-300 text-sm">Elevator Quotation System</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ========== 左侧配置区 ========== */}
          <div className="lg:col-span-2 space-y-5">

            {/* 基础配置 */}
            <SectionCard title="基础配置" icon={Settings}>
              <SelectButton label="载重" options={LOAD_OPTIONS} value={selections.load} onChange={v => update('load', v)} />
              <SelectButton label="速度" options={SPEED_OPTIONS} value={selections.speed} onChange={v => update('speed', v)} />
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">层站</h3>
                <div className="flex flex-wrap gap-2">
                  {floorOptions.map(opt => {
                    const selected = selections.floors === opt.name
                    return (
                      <button
                        key={opt.name}
                        onClick={() => update('floors', opt.name)}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          selected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <div className="text-xs">{opt.name}</div>
                        {opt.price !== 0 && (
                          <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                            {opt.price > 0 ? '+' : ''}¥{opt.price.toLocaleString()}
                          </div>
                        )}
                      </button>
                    )
                  })}
                  {!showAllFloors && (
                    <button
                      onClick={() => setShowAllFloors(true)}
                      className="px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 flex items-center gap-1"
                    >
                      <ChevronDown size={14} /> 更多
                    </button>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* 品牌选择 */}
            <SectionCard title="品牌选择" icon={Zap}>
              <SelectButton label={TRACTION_OPTIONS.groupName} options={TRACTION_OPTIONS.options} value={selections.traction} onChange={v => update('traction', v)} />
              <SelectButton label={CONTROLLER_OPTIONS.groupName} options={CONTROLLER_OPTIONS.options} value={selections.controller} onChange={v => update('controller', v)} />
              <SelectButton label={DOOR_MACHINE_OPTIONS.groupName} options={DOOR_MACHINE_OPTIONS.options} value={selections.doorMachine} onChange={v => update('doorMachine', v)} />
            </SectionCard>

            {/* 开门方式 */}
            <SectionCard title="开门方式" icon={Settings}>
              <DoorOpeningSelector value={selections.doorOpening} onChange={v => update('doorOpening', v)} floorCount={floorCount} />
              <div className="bg-gray-50 rounded px-3 py-2 text-xs text-gray-500 leading-relaxed">
                <div className="font-semibold text-gray-600 mb-1">计价说明：</div>
                <div>• 中分门：<span className="text-green-600">不加价</span></div>
                <div>• 旁开/旁开双折/中分双折：<span className="text-orange-600">¥750 + ¥350×(层数-1)</span></div>
                <div>• 旁开三折：<span className="text-orange-600">¥1500 + ¥800×(层数-1)</span></div>
              </div>
            </SectionCard>

            {/* ========== 轿厢 ========== */}
            <SectionCard title="轿厢" icon={Star}>
              {/* 1. 版本标签切换 */}
              <div className="flex gap-2 mb-4">
                {(['普通', '高级', '豪华'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => handleCabinLevelChange(level)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                      cabinLevel === level ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* 2. 左侧滚动列表 + 主图 + 右侧四壁轿门配置 */}
              <ImageSelector
                title="选择款式（选择后四壁和轿门将自动填充，也可手动调整）"
                items={cabinLevelPresets}
                selectedId={selections.cabinPresetId}
                onSelect={handleCabinSelect}
                sideContent={cabinWallSideContent}
              />

              {/* 3. 吊顶 */}
              <ImageSelector
                title="吊顶（如需定制请选择，不选择则跟随轿厢默认）"
                items={CEILING_PRESETS}
                selectedId={selections.ceilingPresetId}
                onSelect={id => update('ceilingPresetId', id)}
                sideContent={ceilingSideContent}
              />

              {/* 4. 地板 */}
              <ImageSelector
                title="地板（如需定制请选择，不选择则跟随轿厢默认）"
                items={FLOOR_PRESETS}
                selectedId={selections.floorPresetId}
                onSelect={id => update('floorPresetId', id)}
                sideContent={floorSideContent}
              />

              {/* 轿厢备注+参考图片 */}
              <DecorationModuleFooter
                remarks={selections.cabinRemarks}
                images={selections.cabinRefImages}
                onRemarksChange={v => update('cabinRemarks', v)}
                onImagesChange={v => update('cabinRefImages', v)}
                moduleName="轿厢"
              />
            </SectionCard>

            {/* ========== 门厅 ========== */}
            <SectionCard title="门厅" icon={Star}>
              <ImageSelector
                title="门厅风格"
                items={DOOR_PRESETS}
                selectedId={selections.doorPresetId}
                onSelect={id => update('doorPresetId', id)}
              />

              <DecorationModuleFooter
                remarks={selections.doorRemarks}
                images={selections.doorRefImages}
                onRemarksChange={v => update('doorRemarks', v)}
                onImagesChange={v => update('doorRefImages', v)}
                moduleName="门厅"
              />
            </SectionCard>

            {/* ========== 显示与召唤 ========== */}
            <SectionCard title="显示与召唤" icon={Star}>
              {/* COP */}
              <ImageSelector
                title="COP（轿厢操作面板）"
                items={COP_PRESETS}
                selectedId={selections.copPresetId}
                onSelect={id => update('copPresetId', id)}
                sideContent={copSideContent}
              />
              {/* LOP + 显示器 + 召唤盒 */}
              <ImageSelector
                title="LOP（层站召唤盒）"
                items={LOP_PRESETS}
                selectedId={selections.lopPresetId}
                onSelect={id => update('lopPresetId', id)}
                sideContent={lopSideContent}
              />

              <DecorationModuleFooter
                remarks={selections.displayRemarks}
                images={selections.displayRefImages}
                onRemarksChange={v => update('displayRemarks', v)}
                onImagesChange={v => update('displayRefImages', v)}
                moduleName="显示与召唤"
              />
            </SectionCard>

            {/* 选配功能 */}
            <SectionCard title="选配功能" icon={Shield}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {OPTIONAL_ITEMS.map(opt => {
                  const isSelected = (selections.optionals || []).includes(opt.name)
                  return (
                    <button
                      key={opt.name}
                      onClick={() => toggleOptional(opt.name)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check size={10} className="text-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{opt.name}</div>
                          <div className="text-xs text-gray-500">+¥{opt.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </SectionCard>

            {/* 备注 */}
            <SectionCard title="备注" icon={Star}>
              <textarea
                value={selections.remarks}
                onChange={e => update('remarks', e.target.value)}
                placeholder="其他需求..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </SectionCard>
          </div>

          {/* ========== 右侧汇总 ========== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator size={18} className="text-blue-600" />
                报价汇总
              </h2>

              <div className="space-y-1.5 mb-4 pb-4 border-b border-gray-100 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">载重：</span><span className="font-medium">{selections.load}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">速度：</span><span className="font-medium">{selections.speed}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">层站：</span><span className="font-medium">{selections.floors}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">开门方式：</span><span className="font-medium">{selections.doorOpening}</span></div>
                {cabinPreset && <div className="flex justify-between"><span className="text-gray-500">轿厢：</span><span className="font-medium text-blue-600">{cabinPreset.level} {cabinPreset.label.split('-').pop()}</span></div>}
                {ceilingPreset && <div className="flex justify-between"><span className="text-gray-500">吊顶：</span><span className="font-medium">{ceilingPreset.label}</span></div>}
                {floorPreset && <div className="flex justify-between"><span className="text-gray-500">地板：</span><span className="font-medium">{floorPreset.label}</span></div>}
                {doorPreset && <div className="flex justify-between"><span className="text-gray-500">门厅：</span><span className="font-medium text-blue-600">{doorPreset.label}</span></div>}
                {copPreset && <div className="flex justify-between"><span className="text-gray-500">COP：</span><span className="font-medium">{copPreset.label}</span></div>}
                {lopPreset && <div className="flex justify-between"><span className="text-gray-500">LOP：</span><span className="font-medium">{lopPreset.label}</span></div>}
              </div>

              <div className="space-y-1.5 mb-4 pb-4 border-b border-gray-100 text-xs">
                <div className="flex justify-between"><span className="text-gray-400">基准价</span><span>¥{BASE_PRICE.toLocaleString()}</span></div>
                {breakdown.loadPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">载重</span><span className={breakdown.loadPrice > 0 ? 'text-orange-600' : 'text-green-600'}>{breakdown.loadPrice > 0 ? '+' : ''}¥{breakdown.loadPrice.toLocaleString()}</span></div>}
                {breakdown.speedPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">速度</span><span className={breakdown.speedPrice > 0 ? 'text-orange-600' : 'text-green-600'}>{breakdown.speedPrice > 0 ? '+' : ''}¥{breakdown.speedPrice.toLocaleString()}</span></div>}
                {breakdown.floorPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">层站</span><span className={breakdown.floorPrice > 0 ? 'text-orange-600' : 'text-green-600'}>{breakdown.floorPrice > 0 ? '+' : ''}¥{breakdown.floorPrice.toLocaleString()}</span></div>}
                {breakdown.doorOpeningPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">开门方式</span><span className="text-orange-600">+¥{breakdown.doorOpeningPrice.toLocaleString()}</span></div>}
                {breakdown.cabinPresetPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">轿厢</span><span className="text-orange-600">+¥{breakdown.cabinPresetPrice.toLocaleString()}</span></div>}
                {breakdown.wallCarDoorAdjustment !== 0 && <div className="flex justify-between"><span className="text-gray-400">墙板调整</span><span className={breakdown.wallCarDoorAdjustment > 0 ? 'text-orange-600' : 'text-green-600'}>{breakdown.wallCarDoorAdjustment > 0 ? '+' : ''}¥{breakdown.wallCarDoorAdjustment.toLocaleString()}</span></div>}
                {breakdown.ceilingPresetPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">吊顶</span><span className="text-orange-600">+¥{breakdown.ceilingPresetPrice.toLocaleString()}</span></div>}
                {breakdown.floorPresetPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">地板</span><span className="text-orange-600">+¥{breakdown.floorPresetPrice.toLocaleString()}</span></div>}
                {breakdown.doorPresetPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">门厅</span><span className="text-orange-600">+¥{breakdown.doorPresetPrice.toLocaleString()}</span></div>}
                {breakdown.displayPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">显示器</span><span className="text-orange-600">+¥{breakdown.displayPrice.toLocaleString()}</span></div>}
                {breakdown.optionalPrice !== 0 && <div className="flex justify-between"><span className="text-gray-400">选配功能</span><span className="text-orange-600">+¥{breakdown.optionalPrice.toLocaleString()}</span></div>}
              </div>

              <div className="mb-5">
                <div className="text-xs text-gray-500 mb-0.5">预估价格</div>
                <div className="text-3xl font-bold text-blue-600">¥{breakdown.total.toLocaleString()}</div>
                {breakdown.hasCustomDecoration ? (
                  <div className="flex items-center gap-1 text-xs text-orange-500 mt-1"><AlertTriangle size={12} /><span>含自定义装潢，需确认价格</span></div>
                ) : (
                  <div className="text-xs text-gray-400">*最终价格以实际方案为准</div>
                )}
              </div>

              <div className="space-y-2">
                <button onClick={() => setShowQuote(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition text-sm">查看详细报价</button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 rounded-lg font-medium transition text-sm">联系销售</button>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                {[{ icon: Shield, text: '3年质保' }, { icon: Truck, text: '全国发货' }, { icon: Star, text: 'ISO认证' }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-600"><Icon size={14} className="text-green-600" /><span>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 报价单弹窗 */}
      {showQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">详细报价单</h2>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">基础配置</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span>载重：</span><span>{selections.load}</span></div>
                  <div className="flex justify-between"><span>速度：</span><span>{selections.speed}</span></div>
                  <div className="flex justify-between"><span>层站：</span><span>{selections.floors}</span></div>
                  <div className="flex justify-between"><span>曳引机：</span><span>{selections.traction}</span></div>
                  <div className="flex justify-between"><span>控制系统：</span><span>{selections.controller}</span></div>
                  <div className="flex justify-between"><span>门机：</span><span>{selections.doorMachine}</span></div>
                  <div className="flex justify-between"><span>开门方式：</span><span>{selections.doorOpening}{breakdown.doorOpeningPrice > 0 && ` (+¥${breakdown.doorOpeningPrice.toLocaleString()})`}</span></div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">轿厢</div>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>款式：{cabinPreset?.level} {cabinPreset?.label.split('-').pop()}</div>
                  <div>后壁：{wallBack}</div>
                  <div>左侧壁：{wallLeft}</div>
                  <div>右侧壁：{wallRight}</div>
                  <div>前壁：{wallFront}</div>
                  <div>轿门：{carDoor}</div>
                  {cabinPreset && <div className="text-orange-600 font-medium">+¥{cabinPreset.price.toLocaleString()}</div>}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm space-y-1 text-gray-600">
                  <div>吊顶：{ceilingPreset?.label}</div>
                  <div>地板：{floorPreset?.label}</div>
                </div>
              </div>

              {/* 门厅 */}
              {doorPreset && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">门厅 - {doorPreset.label}</div>
                  <div className="text-sm space-y-1 text-gray-600">
                    <div>厅门(基站层)：{doorPreset.hallDoorBase}</div>
                    <div>厅门(其余{Math.max(0, floorCount - 1)}层)：{doorPreset.hallDoorOther}</div>
                    <div>小门套(基站层)：{doorPreset.doorFrameBase}</div>
                    <div>小门套(其余{Math.max(0, floorCount - 1)}层)：{doorPreset.doorFrameOther}</div>
                    <div className="text-orange-600 font-medium">+¥{doorPreset.price.toLocaleString()}</div>
                  </div>
                </div>
              )}

              {/* 轿厢自定义 */}
              {(selections.cabinRemarks || (selections.cabinRefImages?.length ?? 0) > 0) && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-semibold text-orange-700 text-sm mb-1">轿厢自定义需求</div>
                  {selections.cabinRemarks && <div className="text-sm text-gray-600 mb-1">{selections.cabinRemarks}</div>}
                  {selections.cabinRefImages && selections.cabinRefImages.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {selections.cabinRefImages.map((img, i) => (
                        <img key={i} src={img} alt="cabin-ref" className="w-12 h-12 object-cover rounded border border-orange-200" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 门厅自定义 */}
              {(selections.doorRemarks || (selections.doorRefImages?.length ?? 0) > 0) && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-semibold text-orange-700 text-sm mb-1">门厅自定义需求</div>
                  {selections.doorRemarks && <div className="text-sm text-gray-600 mb-1">{selections.doorRemarks}</div>}
                  {selections.doorRefImages && selections.doorRefImages.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {selections.doorRefImages.map((img, i) => (
                        <img key={i} src={img} alt="door-ref" className="w-12 h-12 object-cover rounded border border-orange-200" />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* COP/LOP */}
              {(copPreset || lopPreset) && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">操作与召唤</div>
                  <div className="text-sm space-y-1 text-gray-600">
                    {copPreset && <div>COP：{copPreset.label}</div>}
                    {lopPreset && <div>LOP：{lopPreset.label}</div>}
                    <div>显示器：{selections.display}</div>
                    <div>召唤盒：{selections.callBoxStyle}</div>
                  </div>
                </div>
              )}

              {/* 吊顶/地板/显示备注 */}
              {(selections.ceilingRemarks || selections.floorRemarks || (selections.displayRefImages?.length ?? 0) > 0) && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-semibold text-orange-700 text-sm mb-1">装潢补充需求</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {selections.ceilingRemarks && <div>【吊顶】{selections.ceilingRemarks}</div>}
                    {selections.floorRemarks && <div>【地板】{selections.floorRemarks}</div>}
                    {selections.displayRemarks && <div>【显示/召唤】{selections.displayRemarks}</div>}
                    {selections.displayRefImages && selections.displayRefImages.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-1">
                        {selections.displayRefImages.map((img, i) => (
                          <img key={i} src={img} alt="display-ref" className="w-12 h-12 object-cover rounded border border-orange-200" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 选配 */}
              {(selections.optionals || []).length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">选配功能</div>
                  <div className="text-sm space-y-1">
                    {(selections.optionals || []).map((name: string) => {
                      const opt = OPTIONAL_ITEMS.find(o => o.name === name)
                      return (
                        <div key={name} className="flex justify-between">
                          <span>{name}</span>
                          <span>+¥{opt?.price.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 备注 */}
              {selections.remarks && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">备注</div>
                  <div className="text-sm text-gray-600">{selections.remarks}</div>
                </div>
              )}

              {/* 总计 */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>总计：</span>
                  <span className="text-blue-600">¥{breakdown.total.toLocaleString()}</span>
                </div>
                {breakdown.hasCustomDecoration && (
                  <div className="text-xs text-orange-500 mt-1">*含自定义装潢，价格以最终确认结果为准</div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowQuote(false)} className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium text-sm">关闭</button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium text-sm">提交询价</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
