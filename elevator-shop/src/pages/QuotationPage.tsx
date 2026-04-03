import { useState } from 'react'
import { Calculator, Check, Settings, Zap, Shield, Truck, Star, ChevronDown, AlertTriangle } from 'lucide-react'
import {
  calculatePrice,
  type QuoteSelections,
  type PriceBreakdown,
  DEFAULT_SELECTIONS,
  LOAD_OPTIONS,
  SPEED_OPTIONS,
  FLOOR_OPTIONS,
  TRACTION_OPTIONS,
  CONTROLLER_OPTIONS,
  DOOR_MACHINE_OPTIONS,
  DOOR_OPENING_OPTIONS,
  DECORATION_MATERIALS,
  CAR_BOTTOM_OPTIONS,
  CEILING_OPTIONS,
  HANDRAIL_OPTIONS,
  DISPLAY_OPTIONS,
  CALLBOX_STYLE_OPTIONS,
  OPTIONAL_ITEMS,
  BASE_PRICE,
} from '../data/elevatorQuote'
import DecorationSelect from '../components/DecorationSelect'

function SelectButton({
  label,
  options,
  value,
  onChange,
  unit = '¥',
  showPrice = true,
}: {
  label: string
  options: { name: string; nameEn: string; price: number }[]
  value: string
  onChange: (v: string) => void
  unit?: string
  showPrice?: boolean
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
              {showPrice && opt.price !== 0 && (
                <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                  {opt.price > 0 ? '+' : ''}{unit}{opt.price.toLocaleString()}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

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

function CustomInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-500 mb-1">
        自定义 {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`输入自定义${label}...`}
        className="w-full px-3 py-1.5 border border-dashed border-orange-400 rounded-lg text-sm bg-orange-50 focus:outline-none focus:border-orange-500"
      />
      <div className="flex items-center gap-1 mt-1">
        <AlertTriangle size={10} className="text-orange-500" />
        <span className="text-xs text-orange-600">价格需业务员确认</span>
      </div>
    </div>
  )
}

export default function QuotationPage() {
  const [selections, setSelections] = useState<QuoteSelections>(DEFAULT_SELECTIONS)
  const [showQuote, setShowQuote] = useState(false)
  const [showAllFloors, setShowAllFloors] = useState(false)
  const [submitWarning, setSubmitWarning] = useState(false)

  const breakdown = calculatePrice(selections)

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

  const floorCount = parseInt(selections.floors.match(/\d+/)?.[0] || '10')
  const otherFloors = Math.max(0, floorCount - 1)
  const floorOptions = showAllFloors ? FLOOR_OPTIONS : FLOOR_OPTIONS.slice(0, 9)

  const handleSubmitQuote = () => {
    if (breakdown.decorationHasCustom) {
      setSubmitWarning(true)
      return
    }
    setShowQuote(true)
  }

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
          {/* Left - Configuration */}
          <div className="lg:col-span-2 space-y-5">

            {/* 基础配置 */}
            <SectionCard title="基础配置" icon={Settings}>
              <SelectButton
                label="载重 (Load)"
                options={LOAD_OPTIONS}
                value={selections.load}
                onChange={v => update('load', v)}
              />
              <SelectButton
                label="速度 (Speed)"
                options={SPEED_OPTIONS}
                value={selections.speed}
                onChange={v => update('speed', v)}
              />
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">层站数 (Floors)</h3>
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
                      <ChevronDown size={14} /> 更多层站
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
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">开门方式 (Door Opening)</h3>
                <div className="flex flex-wrap gap-2">
                  {DOOR_OPENING_OPTIONS.map(opt => {
                    const selected = selections.doorOpening === opt.name
                    const totalPrice = opt.basePrice + opt.perFloorPrice * otherFloors
                    return (
                      <button
                        key={opt.name}
                        onClick={() => update('doorOpening', opt.name)}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          selected
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <div className="text-xs">{opt.name}</div>
                        {opt.basePrice > 0 && (
                          <div className={`text-xs mt-0.5 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
                            +¥{opt.basePrice}
                            {opt.perFloorPrice > 0 && ` + ¥${opt.perFloorPrice}×${otherFloors}层`}
                          </div>
                        )}
                        {selected && opt.perFloorPrice > 0 && (
                          <div className="text-xs text-blue-400">=¥{totalPrice.toLocaleString()}</div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-50 rounded px-3 py-2">
                注：旁开门机 +¥750/层+¥350， 三折门机 +¥1500/层+¥800
              </div>
            </SectionCard>

            {/* 轿厢装潢 */}
            <SectionCard title="轿厢装潢" icon={Star}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <DecorationSelect
                    label="后壁"
                    value={selections.wallBack}
                    onChange={v => update('wallBack', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="后壁" value={selections.wallBackCustom} onChange={v => update('wallBackCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label="左侧壁"
                    value={selections.wallLeft}
                    onChange={v => update('wallLeft', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="左侧壁" value={selections.wallLeftCustom} onChange={v => update('wallLeftCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label="右侧壁"
                    value={selections.wallRight}
                    onChange={v => update('wallRight', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="右侧壁" value={selections.wallRightCustom} onChange={v => update('wallRightCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label="前壁"
                    value={selections.wallFront}
                    onChange={v => update('wallFront', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="前壁" value={selections.wallFrontCustom} onChange={v => update('wallFrontCustom', v)} />
                </div>
              </div>

              <SelectButton label="轿底材质" options={CAR_BOTTOM_OPTIONS} value={selections.carBottom} onChange={v => update('carBottom', v)} />

              <SelectButton label="吊顶" options={CEILING_OPTIONS} value={selections.ceiling} onChange={v => update('ceiling', v)} />

              <SelectButton label="扶手" options={HANDRAIL_OPTIONS} value={selections.handrail} onChange={v => update('handrail', v)} />
            </SectionCard>

            {/* 门装饰 */}
            <SectionCard title="门装饰" icon={Star}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <DecorationSelect
                    label="轿门"
                    value={selections.carDoor}
                    onChange={v => update('carDoor', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="轿门" value={selections.carDoorCustom} onChange={v => update('carDoorCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label="厅门 - 基站层（第1层）"
                    value={selections.hallDoorBase}
                    onChange={v => update('hallDoorBase', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="厅门-基站层" value={selections.hallDoorBaseCustom} onChange={v => update('hallDoorBaseCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label={`厅门 - 其余层（第2~顶层，×${otherFloors}次）`}
                    value={selections.hallDoorOther}
                    onChange={v => update('hallDoorOther', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="厅门-其余层" value={selections.hallDoorOtherCustom} onChange={v => update('hallDoorOtherCustom', v)} />
                </div>
                <div>
                  <DecorationSelect
                    label="小门套 - 基站层"
                    value={selections.doorFrameBase}
                    onChange={v => update('doorFrameBase', v)}
                    materials={DECORATION_MATERIALS}
                  />
                  <CustomInput label="小门套-基站层" value={selections.doorFrameBaseCustom} onChange={v => update('doorFrameBaseCustom', v)} />
                </div>
              </div>
              <DecorationSelect
                label="小门套 - 其余层"
                value={selections.doorFrameOther}
                onChange={v => update('doorFrameOther', v)}
                materials={DECORATION_MATERIALS}
              />
              <CustomInput label="小门套-其余层" value={selections.doorFrameOtherCustom} onChange={v => update('doorFrameOtherCustom', v)} />
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
                label="召唤盒款式"
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
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
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
                placeholder="填写客户特殊需求、备注信息..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </SectionCard>
          </div>

          {/* Right - Summary */}
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
                <div className="flex justify-between">
                  <span className="text-gray-500">显示板：</span>
                  <span className="font-medium">{selections.display}</span>
                </div>
                {breakdown.decorationHasCustom && (
                  <div className="flex items-center gap-1 text-orange-600 text-xs mt-1">
                    <AlertTriangle size={12} />
                    <span>含自定义装潢，需确认价格</span>
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
                    <span className="text-gray-400">载重加价</span>
                    <span className={breakdown.loadPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.loadPrice > 0 ? '+' : ''}¥{breakdown.loadPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.speedPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">速度加价</span>
                    <span className={breakdown.speedPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.speedPrice > 0 ? '+' : ''}¥{breakdown.speedPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.floorPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">层站加价</span>
                    <span className={breakdown.floorPrice > 0 ? 'text-orange-600' : 'text-green-600'}>
                      {breakdown.floorPrice > 0 ? '+' : ''}¥{breakdown.floorPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {breakdown.doorOpeningPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">开门方式加价</span>
                    <span className="text-orange-600">+¥{breakdown.doorOpeningPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.decorationPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">装潢加价</span>
                    <span className="text-orange-600">+¥{breakdown.decorationPrice.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.displayPrice !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">显示板加价</span>
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
                {breakdown.decorationHasCustom && (
                  <div className="text-xs text-orange-500 mt-1">*含自定义装潢，价格需确认</div>
                )}
                {!breakdown.decorationHasCustom && (
                  <div className="text-xs text-gray-400">*最终价格以实际方案为准</div>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="space-y-2">
                <button
                  onClick={handleSubmitQuote}
                  className={`w-full py-2.5 rounded-lg font-medium transition text-sm ${
                    breakdown.decorationHasCustom
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  查看详细报价
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 rounded-lg font-medium transition text-sm">
                  联系销售
                </button>
              </div>

              {/* 优势 */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield size={14} className="text-green-600" />
                  <span>3年质保</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck size={14} className="text-green-600" />
                  <span>全国发货</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Star size={14} className="text-green-600" />
                  <span>ISO认证</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom decoration warning modal */}
      {submitWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">自定义装潢需确认</h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              您已填写自定义装潢内容，系统无法自动计算价格。
            </p>
            <p className="text-sm text-gray-600 mb-6">
              请确认后提交询价，业务员将与您联系确认最终价格。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSubmitWarning(false)}
                className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium text-sm"
              >
                返回修改
              </button>
              <button
                onClick={() => { setSubmitWarning(false); setShowQuote(true) }}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg font-medium text-sm"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {showQuote && !submitWarning && (
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

              {/* 装潢 */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">装潢配置</div>
                <div className="text-sm space-y-1">
                  {selections.wallBackCustom ? (
                    <div className="flex justify-between text-orange-600">
                      <span>后壁：</span><span>自定义: {selections.wallBackCustom} (需确认)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between"><span>后壁：</span><span>{selections.wallBack}</span></div>
                  )}
                  {selections.wallLeftCustom ? (
                    <div className="flex justify-between text-orange-600">
                      <span>左侧壁：</span><span>自定义: {selections.wallLeftCustom} (需确认)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between"><span>左侧壁：</span><span>{selections.wallLeft}</span></div>
                  )}
                  {selections.wallRightCustom ? (
                    <div className="flex justify-between text-orange-600">
                      <span>右侧壁：</span><span>自定义: {selections.wallRightCustom} (需确认)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between"><span>右侧壁：</span><span>{selections.wallRight}</span></div>
                  )}
                  {selections.wallFrontCustom ? (
                    <div className="flex justify-between text-orange-600">
                      <span>前壁：</span><span>自定义: {selections.wallFrontCustom} (需确认)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between"><span>前壁：</span><span>{selections.wallFront}</span></div>
                  )}
                  <div className="flex justify-between"><span>轿底：</span><span>{selections.carBottom}</span></div>
                  <div className="flex justify-between"><span>吊顶：</span><span>{selections.ceiling}</span></div>
                  <div className="flex justify-between"><span>扶手：</span><span>{selections.handrail}</span></div>
                  {selections.carDoorCustom ? (
                    <div className="flex justify-between text-orange-600"><span>轿门：</span><span>自定义: {selections.carDoorCustom} (需确认)</span></div>
                  ) : (
                    <div className="flex justify-between"><span>轿门：</span><span>{selections.carDoor}</span></div>
                  )}
                  {selections.hallDoorBaseCustom ? (
                    <div className="flex justify-between text-orange-600"><span>厅门(基站)：</span><span>自定义 (需确认)</span></div>
                  ) : (
                    <div className="flex justify-between"><span>厅门(基站)：</span><span>{selections.hallDoorBase}</span></div>
                  )}
                  {selections.hallDoorOtherCustom ? (
                    <div className="flex justify-between text-orange-600"><span>厅门(其余层)：</span><span>自定义 (需确认)</span></div>
                  ) : (
                    <div className="flex justify-between"><span>厅门(其余层)：</span><span>{selections.hallDoorOther}</span></div>
                  )}
                  <div className="flex justify-between"><span>显示板：</span><span>{selections.display}</span></div>
                </div>
              </div>

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

              {/* 价格 */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>总计：</span>
                  <span className="text-blue-600">¥{breakdown.total.toLocaleString()}</span>
                </div>
                {breakdown.decorationHasCustom && (
                  <div className="text-xs text-orange-500 mt-1 text-right">*含自定义装潢，价格以最终确认结果为准</div>
                )}
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
