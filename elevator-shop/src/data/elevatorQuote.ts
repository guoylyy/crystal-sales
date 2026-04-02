// Elevator Quotation Configuration

export interface QuoteOption {
  name: string
  nameEn: string
  price: number
  description?: string
}

export interface QuoteGroup {
  groupName: string
  nameEn: string
  options: QuoteOption[]
}

export interface ElevatorQuote {
  id: string
  name: string
  nameEn: string
  subtitle: string
  subtitleEn: string
  category: string
  categoryEn: string
  model: string
  image: string
  basePrice: number
  configOptions: {
    loadOptions: QuoteOption[]
    speedOptions: QuoteOption[]
    floorOptions: QuoteOption[]
  }
  mainPowerList: QuoteGroup
  elecControllerList: QuoteGroup
  doorControllerList: QuoteGroup
  doorTypeOptions: QuoteOption[]
  doorMaterialOptions: QuoteOption[]
  optionalItems: QuoteOption[]
  logicOptionalGroups: {
    groupName: string
    nameEn: string
    options: QuoteOption[]
  }[]
}

export const elevatorQuotes: ElevatorQuote[] = [
  {
    id: 'classic',
    name: '豪华乘客电梯·经典系列',
    nameEn: 'Luxury Passenger Elevator · Classic Series',
    subtitle: '平稳静音，适合酒店及写字楼',
    subtitleEn: 'Smooth & quiet, ideal for hotels & office buildings',
    category: '乘客梯',
    categoryEn: 'Passenger Elevator',
    model: 'LH-P01',
    image: '/img/elevator-promo.jpg',
    basePrice: 49000,
    configOptions: {
      loadOptions: [
        { name: '630kg', nameEn: '630kg', price: 0 },
        { name: '800kg', nameEn: '800kg', price: 3000 },
        { name: '1000kg', nameEn: '1000kg', price: 5000 },
        { name: '1150kg', nameEn: '1150kg', price: 7000 },
        { name: '1350kg', nameEn: '1350kg', price: 9000 },
      ],
      speedOptions: [
        { name: '1.0m/s', nameEn: '1.0m/s', price: 0 },
        { name: '1.5m/s', nameEn: '1.5m/s', price: 2000 },
        { name: '1.75m/s', nameEn: '1.75m/s', price: 4000 },
        { name: '2.0m/s', nameEn: '2.0m/s', price: 6000 },
      ],
      floorOptions: [
        { name: '3层', nameEn: '3 Floors', price: 0 },
        { name: '4层', nameEn: '4 Floors', price: 4000 },
        { name: '5层', nameEn: '5 Floors', price: 8000 },
        { name: '6层', nameEn: '6 Floors', price: 12000 },
        { name: '7层', nameEn: '7 Floors', price: 16000 },
        { name: '8层', nameEn: '8 Floors', price: 20000 },
      ],
    },
    mainPowerList: {
      groupName: '主机品牌',
      nameEn: 'Main Power Brand',
      options: [
        { name: '蒙特纳利', nameEn: 'Montanari', price: 0 },
        { name: '通润', nameEn: 'Tongrun', price: 0 },
        { name: '西子富沃德', nameEn: 'XiziFwoode', price: 0 },
      ],
    },
    elecControllerList: {
      groupName: '电梯控制系统',
      nameEn: 'Electronic Controller',
      options: [
        { name: '默纳克', nameEn: 'Monaike', price: 0 },
        { name: '新时达', nameEn: 'Xinshidai', price: 0 },
        { name: '科纳沃川', nameEn: 'Kenawoc', price: 0 },
      ],
    },
    doorControllerList: {
      groupName: '门机品牌',
      nameEn: 'Door Controller Brand',
      options: [
        { name: '宁波欧菱', nameEn: 'Ningbo Oulin', price: 0 },
        { name: '宁波申菱', nameEn: 'Ningbo Shenling', price: 0 },
      ],
    },
    doorTypeOptions: [
      { name: '中分', nameEn: 'Centre Open', price: 0 },
      { name: '旁开', nameEn: 'Side Open', price: 350 },
      { name: '中分双折', nameEn: '2-Speed Centre', price: 750 },
    ],
    doorMaterialOptions: [
      { name: '门板喷涂钢板', nameEn: 'Painted Steel', price: 0 },
      { name: '发纹不锈钢304 1.2MM', nameEn: 'SS304 1.2MM', price: 400 },
      { name: '发纹不锈钢304 1.5MM', nameEn: 'SS304 1.5MM', price: 500 },
      { name: '镜面蚀刻不锈钢304', nameEn: 'Mirror Etched SS304', price: 800 },
      { name: '镀色不锈钢304', nameEn: 'Color SS304', price: 600 },
    ],
    optionalItems: [
      { name: '停电应急装置 ARD', nameEn: 'ARD', price: 1000 },
      { name: '稳压器 AVR', nameEn: 'AVR', price: 2200 },
      { name: '地震仪', nameEn: 'Seismic Sensor', price: 4000 },
      { name: 'IC卡', nameEn: 'IC Card', price: 800 },
      { name: '轿厢监控 CCTV', nameEn: 'CCTV', price: 800 },
      { name: '图像显示器', nameEn: 'Picture Display', price: 500 },
      { name: '视频显示器', nameEn: 'Video Display', price: 1000 },
      { name: '到站灯', nameEn: 'Arrival Lantern', price: 300 },
    ],
    logicOptionalGroups: [
      {
        groupName: '门机开门方式',
        nameEn: 'Door Opening Type',
        options: [
          { name: '中分', nameEn: 'Centre Open', price: 0 },
          { name: '旁开', nameEn: 'Side Open', price: 750 },
          { name: '中分双折', nameEn: '2-Speed Centre', price: 1500 },
        ],
      },
    ],
  },
]

// Calculate total price
export function calculatePrice(quote: ElevatorQuote, selections: Record<string, any>): number {
  let total = quote.basePrice
  
  // Add config prices
  if (selections.load) {
    const loadOpt = quote.configOptions.loadOptions.find(o => o.name === selections.load)
    if (loadOpt) total += loadOpt.price
  }
  if (selections.speed) {
    const speedOpt = quote.configOptions.speedOptions.find(o => o.name === selections.speed)
    if (speedOpt) total += speedOpt.price
  }
  if (selections.floors) {
    const floorOpt = quote.configOptions.floorOptions.find(o => o.name === selections.floors)
    if (floorOpt) total += floorOpt.price
  }
  
  // Add optional prices
  if (selections.mainPower) {
    const opt = quote.mainPowerList.options.find(o => o.name === selections.mainPower)
    if (opt) total += opt.price
  }
  if (selections.elecController) {
    const opt = quote.elecControllerList.options.find(o => o.name === selections.elecController)
    if (opt) total += opt.price
  }
  if (selections.doorController) {
    const opt = quote.doorControllerList.options.find(o => o.name === selections.doorController)
    if (opt) total += opt.price
  }
  if (selections.doorType) {
    const opt = quote.doorTypeOptions.find(o => o.name === selections.doorType)
    if (opt) total += opt.price
  }
  if (selections.doorMaterial) {
    const opt = quote.doorMaterialOptions.find(o => o.name === selections.doorMaterial)
    if (opt) total += opt.price
  }
  
  // Add selected optional items
  if (selections.optionals && Array.isArray(selections.optionals)) {
    for (const itemName of selections.optionals) {
      const opt = quote.optionalItems.find(o => o.name === itemName)
      if (opt) total += opt.price
    }
  }
  
  return total
}
