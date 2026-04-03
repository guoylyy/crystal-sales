import { useState } from 'react'
import { Calculator, Check, Settings, Zap, Shield, Truck, Star, ChevronDown, AlertTriangle } from 'lucide-react'
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
  DISPLAY_OPTIONS,
  CALLBOX_STYLE_OPTIONS,
  OPTIONAL_ITEMS,
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
    const newImages: string[] = []
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
      {/* 自定义需求警告 */}
      {hasCustom && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700">
          <AlertTriangle size={14} className="text-orange-500 flex-shrink-0" />
          <span>您填写了备注或上传了参考图片，请确认最终价格以业务员回复为准</span>
        </div>
      )}

      {/* 备注 */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          {moduleName}备注（选填，如有特殊需求请在此描述）
        </label>
        <textarea
          value={remarks}
          onChange={e => onRemarksChange(e.target.value)}
          placeholder={`如：${moduleName}需要特殊颜色、特殊材质、特殊尺寸等...`}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* 参考图片 */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          参考图片（选填，帮助业务员理解您的需求）
        </label>
        <div className="flex flex-wrap gap-2 items-start">
          {/* 已上传图片 */}
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
          {/* 上传按钮 */}
          <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer flex items-center justify-center text-gray-400 hover:text-blue-500 transition">
            <span className="text-xl">+</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 图片网格选择器（用于轿厢/吊顶/地板/门厅）
// ============================================================
function ImageSelector<T extends { id: string; image: string; label: string; price: number }>({
  title,
  items,
  selectedId,
  onSelect,
  groupBy,
}: {
  title: string
  items: T[]
  selectedId: string
  onSelect: (id: string) => void
  groupBy?: (item: T) => string  // 可选分组
}) {
  const groups = groupBy
    ? [...new Set(items.map(groupBy))].map(g => ({
        label: g,
        items: items.filter(i => groupBy(i) === g),
      }))
    : [{ label: title, items }]

  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      {groups.map(group => (
        <div key={group.label} className="mb-3">
          {groups.length > 1 && (
            <div className="text-xs text-gray-400 font-medium mb-1.5">{group.label}</div>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {group.items.map(item => {
              const selected = item.id === selectedId
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
                    selected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      onError={e => {
                        ;(e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect fill='%23e5e7eb' width='100' height='100'/><text x='50' y='55' text-anchor='middle' fill='%239ca3af' font-size='10'>${item.label}</text></svg>`
                      }}
                    />
                  </div>
                  <div className="p-1.5 text-center">
                    <div className="text-xs font-medium text-gray-700 leading-tight">{item.label.split('-').pop()}</div>
                    {item.price > 0 && (
                      <div className="text-xs text-orange-500">+¥{item.price.toLocaleString()}</div>
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
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 开门方式（动态显示每层总价）
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
                selected
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="text-xs">{opt.name}</div>
              {opt.basePrice > 0 && (
                <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                  ¥{total.toLocaleString()}
                  {opt.perFloorPrice > 0 && <span className="text-gray-400"> (¥{opt.basePrice}+¥{opt.perFloorPrice}×{otherFloors})</span>}
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
// 主页面
// ============================================================
export default function QuotationPage() {
  const [selections, setSelections] = useState<QuoteSelections>(DEFAULT_SELECTIONS)
  const [showQuote, setShowQuote] = useState(false)
  const [showAllFloors, setShowAllFloors] = useState(false)

  const breakdown = calculatePrice(selections)
  const floorCount = parseInt(selections.floors.match(/\d+/)?.[0] || '10')
  const otherFloors = Math.max(0, floorCount - 1)
  const floorOptions = showAllFloors ? FLOOR_OPTIONS : FLOOR_OPTIONS.slice(0, 9)

  const update = <K extends keyof QuoteSelections>(key: K, value: QuoteSelections[K]) => {
    setSelections(prev => ({ ...prev, [key]: value }))
  }

  const toggleOptional = (name: string) => {
    const current = selections.optionals || []
    if (current.includes(name)) {
      update('optionals', current.filter(n => n !== name))
    } else {
      update('optionals', [...current, name])
    }
  }

  // 获取当前选中的预设信息（用于右侧汇总显示）
  const cabinPreset = CABIN_PRESETS.find(p => p.id === selections.cabinPresetId)
  const ceilingPreset = CEILING_PRESETS.find(p => p.id === selections.ceilingPresetId)
  const floorPreset = FLOOR_PRESETS.find(p => p.id === selections.floorPresetId)
  const doorPreset = DOOR_PRESETS.find(p => p.id === selections.doorPresetId)

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
              <SelectButton
                label="载重"
                options={LOAD_OPTIONS}
                value={selections.load}
                onChange={v => update('load', v)}
              />
              <SelectButton
                label="速度"
                options={SPEED_OPTIONS}
                value={selections.speed}
                onChange={v => update('speed', v)}
              />
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
              <SelectButton
                label={TRACTION_OPTIONS.groupName}
                options={TRACTION_OPTIONS.options}
                value={selections.traction}
                onChange={v => update('traction', v)}
              />
              <SelectButton
                label={CONTROLLER_OPTIONS.groupName}
                options={CONTROLLER_OPTIONS.options}
                value={selections.controller}
                onChange={v => update('controller', v)}
              />
              <SelectButton
                label={DOOR_MACHINE_OPTIONS.groupName}
                options={DOOR_MACHINE_OPTIONS.options}
                value={selections.doorMachine}
                onChange={v => update('doorMachine', v)}
              />
            </SectionCard>

            {/* 开门方式 */}
            <SectionCard title="开门方式" icon={Settings}>
              <DoorOpeningSelector
                value={selections.doorOpening}
                onChange={v => update('doorOpening', v)}
                floorCount={floorCount}
              />
            </SectionCard>

            {/* ========== 轿厢 ========== */}
            <SectionCard title="轿厢" icon={Star}>
              {/* 风格选择 */}
              <ImageSelector
                title="轿厢风格（选择后自动填充四壁和轿门）"
                items={CABIN_PRESETS}
                selectedId={selections.cabinPresetId}
                onSelect={id => update('cabinPresetId', id)}
                groupBy={item => item.level}
              />
              {cabinPreset && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4 text-xs">
                  <div className="font-semibold text-blue-700 mb-1">已选：{cabinPreset.label}</div>
                  <div className="text-blue-600 grid grid-cols-2 gap-x-4 gap-y-0.5">
                    <span>后壁：{cabinPreset.wallBack}</span>
                    <span>左侧壁：{cabinPreset.wallLeft}</span>
                    <span>右侧壁：{cabinPreset.wallRight}</span>
                    <span>前壁：{cabinPreset.wallFront}</span>
                    <span>轿门：{cabinPreset.carDoor}</span>
                    {cabinPreset.price > 0 && <span className="text-orange-600 font-medium">+¥{cabinPreset.price.toLocaleString()}</span>}
                  </div>
                </div>
              )}
              {/* 吊顶 */}
              <ImageSelector
                title="吊顶"
                items={CEILING_PRESETS}
                selectedId={selections.ceilingPresetId}
                onSelect={id => update('ceilingPresetId', id)}
              />
              {/* 地板 */}
              <ImageSelector
                title="地板"
                items={FLOOR_PRESETS}
                selectedId={selections.floorPresetId}
                onSelect={id => update('floorPresetId', id)}
              />

              {/* 备注 + 参考图片 */}
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
                title="门厅风格（选择后自动填充厅门和小门套）"
                items={DOOR_PRESETS}
                selectedId={selections.doorPresetId}
                onSelect={id => update('doorPresetId', id)}
              />
              {doorPreset && (
                <div className="bg-blue-50 rounded-lg p-3 text-xs">
                  <div className="font-semibold text-blue-700 mb-1">已选：{doorPreset.label}</div>
                  <div className="text-blue-600 grid grid-cols-2 gap-x-4 gap-y-0.5">
                    <span>厅门(基站)：{doorPreset.hallDoorBase}</span>
                    <span>厅门(其余层)：{doorPreset.hallDoorOther}</span>
                    <span>小门套(基站)：{doorPreset.doorFrameBase}</span>
                    <span>小门套(其余层)：{doorPreset.doorFrameOther}</span>
                    {doorPreset.price > 0 && <span className="text-orange-600 font-medium">+¥{doorPreset.price.toLocaleString()}</span>}
                  </div>
                </div>
              )}

              {/* 备注 + 参考图片 */}
              <DecorationModuleFooter
                remarks={selections.doorRemarks}
                images={selections.doorRefImages}
                onRemarksChange={v => update('doorRemarks', v)}
                onImagesChange={v => update('doorRefImages', v)}
                moduleName="门厅"
              />
            </SectionCard>

            {/* 显示与召唤 */}
            <SectionCard title="显示与召唤" icon={Star}>
              <SelectButton
                label="显示板"
                options={DISPLAY_OPTIONS}
                value={selections.display}
                onChange={v => update('display', v)}
              />
              <SelectButton
                label="召唤盒"
                options={CALLBOX_STYLE_OPTIONS}
                value={selections.callBoxStyle}
                onChange={v => update('callBoxStyle', v)}
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
                placeholder="填写客户特殊需求..."
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

              {/* 配置摘要 */}
              <div className="space-y-1.5 mb-4 pb-4 border-b border-gray-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">载重：</span>
                  <span className="font-medium">{selections.load}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">速度：</span>
                  <span className="font-medium">{selections.speed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">层站：</span>
                  <span className="font-medium">{selections.floors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">开门方式：</span>
                  <span className="font-medium">{selections.doorOpening}</span>
                </div>
                {cabinPreset && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">轿厢：</span>
                    <span className="font-medium text-blue-600">{cabinPreset.label}</span>
                  </div>
                )}
                {ceilingPreset && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">吊顶：</span>
                    <span className="font-medium">{ceilingPreset.label}</span>
                  </div>
                )}
                {floorPreset && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">地板：</span>
                    <span className="font-medium">{floorPreset.label}</span>
                  </div>
                )}
                {doorPreset && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">门厅：</span>
                    <span className="font-medium text-blue-600">{doorPreset.label}</span>
                  </div>
                )}
              </div>

              {/* 价格明细 */}
              <div className="space-y-1.5 mb-4 pb-4 border-b border-gray-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">基准价（630/1.0/10层）</span>
                  <span>¥{BASE_PRICE.toLocaleString()}</span>
                </div>
                {breakdown.loadPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">载重</span>
                    <span className={breakdown.loadPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.loadPrice > 0 ? '+' : ''}¥{breakdown.loadPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.speedPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">速度</span>
                    <span className={breakdown.speedPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.speedPrice > 0 ? '+' : ''}¥{breakdown.speedPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.floorPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">层站</span>
                    <span className={breakdown.floorPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.floorPrice > 0 ? '+' : ''}¥{breakdown.floorPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.doorOpeningPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">开门方式</span>
                    <span className="text-orange-600">+¥{breakdown.doorOpeningPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.cabinPresetPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">轿厢</span>
                    <span className="text-orange-600">+¥{breakdown.cabinPresetPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.ceilingPresetPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">吊顶</span>
                    <span className="text-orange-600">+¥{breakdown.ceilingPresetPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.floorPresetPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">地板</span>
                    <span className="text-orange-600">+¥{breakdown.floorPresetPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.doorPresetPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">门厅</span>
                    <span className="text-orange-600">+¥{breakdown.doorPresetPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.displayPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">显示板</span>
                    <span className="text-orange-600">+¥{breakdown.displayPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.optionalPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">选配功能</span>
                    <span className="text-orange-600">+¥{breakdown.optionalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* 总价 */}
              <div className="mb-5">
                <div className="text-xs text-gray-500 mb-0.5">预估价格</div>
                <div className="text-3xl font-bold text-blue-600">¥{breakdown.total.toLocaleString()}</div>
                {breakdown.hasCustomDecoration ? (
                  <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
                    <AlertTriangle size={12} />
                    <span>含自定义装潢，需确认价格</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">*最终价格以实际方案为准</div>
                )}
              </div>

              {/* 操作 */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowQuote(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition text-sm"
                >
                  查看详细报价
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 rounded-lg font-medium transition text-sm">
                  联系销售
                </button>
              </div>

              {/* 优势 */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                {[
                  { icon: Shield, text: '3年质保' },
                  { icon: Truck, text: '全国发货' },
                  { icon: Star, text: 'ISO认证' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon size={14} className="text-green-600" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== 报价单弹窗 ========== */}
      {showQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">详细报价单</h2>

            <div className="space-y-3 mb-6">
              {/* 基础配置 */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">基础配置</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span>载重：</span><span>{selections.load}</span></div>
                  <div className="flex justify-between"><span>速度：</span><span>{selections.speed}</span></div>
                  <div className="flex justify-between"><span>层站：</span><span>{selections.floors}</span></div>
                  <div className="flex justify-between"><span>曳引机：</span><span>{selections.traction}</span></div>
                  <div className="flex justify-between"><span>控制系统：</span><span>{selections.controller}</span></div>
                  <div className="flex justify-between"><span>门机：</span><span>{selections.doorMachine}</span></div>
                  <div className="flex justify-between">
                    <span>开门方式：</span>
                    <span>{selections.doorOpening}
                      {breakdown.doorOpeningPrice > 0 && ` (+¥${breakdown.doorOpeningPrice.toLocaleString()})`}
                    </span>
                  </div>
                </div>
              </div>

              {/* 轿厢 */}
              {cabinPreset && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">轿厢 - {cabinPreset.label}</div>
                  <div className="text-sm space-y-1 text-gray-600">
                    <div>后壁：{cabinPreset.wallBack}</div>
                    <div>左侧壁：{cabinPreset.wallLeft}</div>
                    <div>右侧壁：{cabinPreset.wallRight}</div>
                    <div>前壁：{cabinPreset.wallFront}</div>
                    <div>轿门：{cabinPreset.carDoor}</div>
                    {cabinPreset.price > 0 && (
                      <div className="text-orange-600 font-medium">+¥{cabinPreset.price.toLocaleString()}</div>
                    )}
                  </div>
                </div>
              )}

              {/* 吊顶 */}
              {ceilingPreset && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">吊顶：{ceilingPreset.label}</span>
                    {ceilingPreset.price > 0 && <span className="text-orange-600">+¥{ceilingPreset.price}</span>}
                  </div>
                </div>
              )}

              {/* 地板 */}
              {floorPreset && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">地板：{floorPreset.label}</span>
                    {floorPreset.price > 0 && <span className="text-orange-600">+¥{floorPreset.price}</span>}
                  </div>
                </div>
              )}

              {/* 轿厢备注/图片 */}
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

              {/* 门厅 */}
              {doorPreset && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">门厅 - {doorPreset.label}</div>
                  <div className="text-sm space-y-1 text-gray-600">
                    <div>厅门(基站层)：{doorPreset.hallDoorBase}</div>
                    <div>厅门(其余{Math.max(0, floorCount - 1)}层)：{doorPreset.hallDoorOther}</div>
                    <div>小门套(基站层)：{doorPreset.doorFrameBase}</div>
                    <div>小门套(其余{Math.max(0, floorCount - 1)}层)：{doorPreset.doorFrameOther}</div>
                    {doorPreset.price > 0 && (
                      <div className="text-orange-600 font-medium">+¥{doorPreset.price.toLocaleString()}</div>
                    )}
                  </div>
                </div>
              )}

              {/* 门厅备注/图片 */}
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
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowQuote(false)}
                className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium text-sm"
              >
                关闭
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium text-sm">
                提交询价
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
