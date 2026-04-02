import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Check, ChevronRight, Settings, Zap, Shield, Truck, Star } from 'lucide-react'
import { elevatorQuotes, calculatePrice, type ElevatorQuote, type QuoteOption } from '../data/elevatorQuote'

export default function QuotationPage() {
  const [selectedQuote] = useState<ElevatorQuote>(elevatorQuotes[0])
  const [selections, setSelections] = useState<Record<string, any>>({
    load: selectedQuote.configOptions.loadOptions[0].name,
    speed: selectedQuote.configOptions.speedOptions[1].name,
    floors: selectedQuote.configOptions.floorOptions[2].name,
    mainPower: selectedQuote.mainPowerList.options[0].name,
    elecController: selectedQuote.elecControllerList.options[0].name,
    doorController: selectedQuote.doorControllerList.options[0].name,
    doorType: selectedQuote.doorTypeOptions[0].name,
    doorMaterial: selectedQuote.doorMaterialOptions[0].name,
    optionals: [],
  })
  const [showQuote, setShowQuote] = useState(false)

  const totalPrice = calculatePrice(selectedQuote, selections)

  const toggleOptional = (name: string) => {
    setSelections(prev => {
      const optionals = prev.optionals || []
      if (optionals.includes(name)) {
        return { ...prev, optionals: optionals.filter((n: string) => n !== name) }
      } else {
        return { ...prev, optionals: [...optionals, name] }
      }
    })
  }

  const SelectButton = ({ option, selected, onClick }: { option: QuoteOption; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
        selected
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-gray-200 hover:border-gray-300 text-gray-700'
      }`}
    >
      <div>{option.name}</div>
      {option.price > 0 && (
        <div className="text-xs text-gray-500">+${option.price.toLocaleString()}</div>
      )}
    </button>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Elevator Quotation</h1>
          <p className="text-gray-300">Configure your elevator and get an instant quote</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Config */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings size={20} className="text-blue-600" />
                Basic Configuration
              </h2>
              
              {/* Load */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Load Capacity (载重)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.configOptions.loadOptions.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.load === opt.name}
                      onClick={() => setSelections(s => ({ ...s, load: opt.name }))}
                    />
                  ))}
                </div>
              </div>

              {/* Speed */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Speed (速度)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.configOptions.speedOptions.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.speed === opt.name}
                      onClick={() => setSelections(s => ({ ...s, speed: opt.name }))}
                    />
                  ))}
                </div>
              </div>

              {/* Floors */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Number of Floors (层数)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.configOptions.floorOptions.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.floors === opt.name}
                      onClick={() => setSelections(s => ({ ...s, floors: opt.name }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Brand Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                Brand Selection
              </h2>
              
              {/* Main Power */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">{selectedQuote.mainPowerList.groupName}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.mainPowerList.options.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.mainPower === opt.name}
                      onClick={() => setSelections(s => ({ ...s, mainPower: opt.name }))}
                    />
                  ))}
                </div>
              </div>

              {/* Electronic Controller */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">{selectedQuote.elecControllerList.groupName}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.elecControllerList.options.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.elecController === opt.name}
                      onClick={() => setSelections(s => ({ ...s, elecController: opt.name }))}
                    />
                  ))}
                </div>
              </div>

              {/* Door Controller */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">{selectedQuote.doorControllerList.groupName}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.doorControllerList.options.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.doorController === opt.name}
                      onClick={() => setSelections(s => ({ ...s, doorController: opt.name }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Door Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Door Options</h2>
              
              {/* Door Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Door Opening Type (开门方式)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.doorTypeOptions.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.doorType === opt.name}
                      onClick={() => setSelections(s => ({ ...s, doorType: opt.name }))}
                    />
                  ))}
                </div>
              </div>

              {/* Door Material */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Door Material (门板材质)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuote.doorMaterialOptions.map(opt => (
                    <SelectButton
                      key={opt.name}
                      option={opt}
                      selected={selections.doorMaterial === opt.name}
                      onClick={() => setSelections(s => ({ ...s, doorMaterial: opt.name }))}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Optional Items (选配)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedQuote.optionalItems.map(opt => {
                  const isSelected = (selections.optionals || []).includes(opt.name)
                  return (
                    <button
                      key={opt.name}
                      onClick={() => toggleOptional(opt.name)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{opt.name}</div>
                          <div className="text-xs text-gray-500">+${opt.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right - Quote Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator size={20} className="text-blue-600" />
                Quote Summary
              </h2>

              {/* Product Image */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img src={selectedQuote.image} alt={selectedQuote.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="font-bold text-gray-900 mb-1">{selectedQuote.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{selectedQuote.subtitle}</p>

              {/* Config Summary */}
              <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Load:</span>
                  <span className="font-medium">{selections.load}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Speed:</span>
                  <span className="font-medium">{selections.speed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floors:</span>
                  <span className="font-medium">{selections.floors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Door Type:</span>
                  <span className="font-medium">{selections.doorType}</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
                <div className="text-3xl font-bold text-blue-600">${totalPrice.toLocaleString()}</div>
                <div className="text-xs text-gray-500">*Final price may vary based on site conditions</div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowQuote(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                >
                  Get Detailed Quote
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-medium transition">
                  Contact Sales
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={18} className="text-green-600" />
                  <span>3 Years Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck size={18} className="text-green-600" />
                  <span>Global Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star size={18} className="text-green-600" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Quote</h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900">{selectedQuote.name}</h3>
                <p className="text-sm text-gray-500">{selectedQuote.subtitle}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-700 mb-2">Configuration:</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Load:</span><span>{selections.load}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span><span>{selections.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Floors:</span><span>{selections.floors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Main Power:</span><span>{selections.mainPower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Controller:</span><span>{selections.elecController}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Door:</span><span>{selections.doorType} - {selections.doorMaterial}</span>
                  </div>
                </div>
              </div>

              {(selections.optionals || []).length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Optional Items:</h4>
                  <div className="text-sm space-y-1">
                    {(selections.optionals || []).map((name: string) => {
                      const opt = selectedQuote.optionalItems.find(o => o.name === name)
                      return (
                        <div key={name} className="flex justify-between">
                          <span>{name}</span>
                          <span>+${opt?.price.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowQuote(false)}
                className="flex-1 border border-gray-300 py-3 rounded-lg font-medium"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                Submit Quote Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
