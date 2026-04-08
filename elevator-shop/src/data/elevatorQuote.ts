// ============================================================
// 电梯报价系统 - 核心数据与计算逻辑
// 基准：630KG / 1.0m/s / 10层 = ¥49,000
// ============================================================

export interface QuoteOption {
  name: string
  nameEn: string
  price: number
  description?: string
  tier?: number
}

export interface QuoteGroup {
  groupName: string
  nameEn: string
  options: QuoteOption[]
}

// ============================================================
// 基准价格
// ============================================================
export const BASE_PRICE = 49000

// ============================================================
// 基础配置 - 载重档位
// ============================================================
export const LOAD_OPTIONS: QuoteOption[] = [
  { name: '630kg',  nameEn: '630kg',  price: 0,     tier: 1 },
  { name: '800kg',  nameEn: '800kg',  price: 4000,  tier: 3 },
  { name: '1000kg', nameEn: '1000kg', price: 6000,  tier: 4 },
  { name: '1050kg', nameEn: '1050kg', price: 8000,  tier: 5 },
  { name: '1350kg', nameEn: '1350kg', price: 10000, tier: 6 },
]

// ============================================================
// 基础配置 - 速度档位
// ============================================================
export const SPEED_OPTIONS: QuoteOption[] = [
  { name: '1.0m/s',  nameEn: '1.0m/s',  price: 0,    tier: 1 },
  { name: '1.5m/s',  nameEn: '1.5m/s',  price: 2000, tier: 2 },
  { name: '1.75m/s', nameEn: '1.75m/s', price: 4000, tier: 3 },
  { name: '2.0m/s',  nameEn: '2.0m/s',  price: 6000, tier: 4 },
  { name: '2.5m/s',  nameEn: '2.5m/s',  price: 8000, tier: 5 },
]

// ============================================================
// 基础配置 - 层站
// ============================================================
export const FLOOR_OPTIONS: QuoteOption[] = [
  { name: '2层',  nameEn: '2 Floors',  price: -16000 },
  { name: '3层',  nameEn: '3 Floors',  price: -14000 },
  { name: '4层',  nameEn: '4 Floors',  price: -12000 },
  { name: '5层',  nameEn: '5 Floors',  price: -10000 },
  { name: '6层',  nameEn: '6 Floors',  price: -8000  },
  { name: '7层',  nameEn: '7 Floors',  price: -6000  },
  { name: '8层',  nameEn: '8 Floors',  price: -4000  },
  { name: '9层',  nameEn: '9 Floors',  price: -2000  },
  { name: '10层', nameEn: '10 Floors', price: 0      },
  { name: '11层', nameEn: '11 Floors', price: 2000   },
  { name: '12层', nameEn: '12 Floors', price: 4000   },
  { name: '13层', nameEn: '13 Floors', price: 6000   },
  { name: '14层', nameEn: '14 Floors', price: 8000   },
  { name: '15层', nameEn: '15 Floors', price: 10000  },
]

// ============================================================
// 品牌选择
// ============================================================
export const TRACTION_OPTIONS: QuoteGroup = {
  groupName: '曳引机品牌',
  nameEn: 'Traction Machine',
  options: [
    { name: '通润',        nameEn: 'Tongrun',      price: 0 },
    { name: '蒙特纳利',   nameEn: 'Montanari',    price: 0 },
    { name: '法西',        nameEn: 'Faxi',         price: 0 },
    { name: '西艾杰',      nameEn: 'SAJ',          price: 0 },
    { name: '蒙塔纳锐',    nameEn: 'Montanari',    price: 0 },
    { name: '西子富沃德',  nameEn: 'XiziFwoode',   price: 0 },
    { name: '弗尔德',      nameEn: 'Fulder',       price: 0 },
    { name: '欣达',        nameEn: 'Xinda',        price: 0 },
  ],
}

export const CONTROLLER_OPTIONS: QuoteGroup = {
  groupName: '电梯控制系统',
  nameEn: 'Control System',
  options: [
    { name: '默纳克',          nameEn: 'Monaike',         price: 0 },
    { name: '默纳克-富上协议', nameEn: 'Monaike-FS',      price: 0 },
    { name: '默纳克-三代柜',   nameEn: 'Monaike-3G',      price: 0 },
    { name: '默纳克3000+',     nameEn: 'Monaike-3000',    price: 0 },
    { name: '新时达',          nameEn: 'Xinshidai',        price: 0 },
    { name: '迷你柜',          nameEn: 'Mini Cabinet',    price: 0 },
    { name: '荣耀柜',          nameEn: 'Glory Cabinet',   price: 0 },
    { name: '深邦P8000',       nameEn: 'Shenbang-P8000',  price: 0 },
  ],
}

export const DOOR_MACHINE_OPTIONS: QuoteGroup = {
  groupName: '门机品牌',
  nameEn: 'Door Machine',
  options: [
    { name: '宁波欧菱',   nameEn: 'Ningbo Oulin',   price: 0 },
    { name: '宁波申菱',   nameEn: 'Ningbo Shenling', price: 0 },
    { name: '无锡展鹏',   nameEn: 'Wuxi Zhanpeng',   price: 0 },
    { name: '苏州易升',   nameEn: 'Suzhou Yisheng',  price: 0 },
    { name: '马尔默',     nameEn: 'Marmer',          price: 0 },
    { name: '西子优迈',   nameEn: 'Xizi Youmai',     price: 0 },
    { name: '佛马特',     nameEn: 'Formart',         price: 0 },
    { name: '新时达',     nameEn: 'Xinshidai',       price: 0 },
  ],
}

// ============================================================
// 开门方式
// ============================================================
export interface DoorOpeningOption extends QuoteOption {
  basePrice: number
  perFloorPrice: number
}

export const DOOR_OPENING_OPTIONS: DoorOpeningOption[] = [
  { name: '中分',           nameEn: 'Centre Open',       price: 0,    basePrice: 0,    perFloorPrice: 0    },
  { name: '旁开',           nameEn: 'Side Open',          price: 750,  basePrice: 750,  perFloorPrice: 350  },
  { name: '旁开双折-左开',  nameEn: 'Side 2-fold Left',  price: 750,  basePrice: 750,  perFloorPrice: 350  },
  { name: '旁开双折-右开',  nameEn: 'Side 2-fold Right', price: 750,  basePrice: 750,  perFloorPrice: 350  },
  { name: '中分双折',       nameEn: 'Centre 2-speed',     price: 750,  basePrice: 750,  perFloorPrice: 350  },
  { name: '旁开三折-左开',  nameEn: 'Side 3-fold Left',  price: 1500, basePrice: 1500, perFloorPrice: 800  },
  { name: '旁开三折-右开',  nameEn: 'Side 3-fold Right', price: 1500, basePrice: 1500, perFloorPrice: 800  },
]

// ============================================================
// 装潢材料（按材质系列分类，便于按加价计算）
// ============================================================
export interface DecorationMaterial {
  id: string
  name: string
  nameEn: string
  category: string
  finish: string
  price: number
}

export const DECORATION_MATERIALS: DecorationMaterial[] = [
  { id: 'steel-painted',    name: '钢板喷涂色',           nameEn: 'Painted Steel',    category: 'steel', finish: 'painted',  price: 0 },
  { id: '201-hairline',      name: '201发纹',             nameEn: 'SS201 Hairline',   category: 'ss201', finish: 'hairline', price: 0 },
  { id: '304-hairline',      name: '304发纹',             nameEn: 'SS304 Hairline',   category: 'ss304', finish: 'hairline', price: 400 },
  { id: '443-hairline',      name: '443发纹',             nameEn: 'SS443 Hairline',   category: 'ss443', finish: 'hairline', price: 300 },
  { id: '316-hairline',      name: '316发纹',             nameEn: 'SS316 Hairline',   category: 'ss316', finish: 'hairline', price: 800 },
  { id: '201-mirror',        name: '201镜面',             nameEn: 'SS201 Mirror',     category: 'ss201', finish: 'mirror',   price: 200 },
  { id: '304-mirror',        name: '304镜面',             nameEn: 'SS304 Mirror',     category: 'ss304', finish: 'mirror',   price: 600 },
  { id: '443-blackTi',       name: '443黑钛发纹',         nameEn: 'SS443 BlackTi',    category: 'ss443', finish: 'blackTi',  price: 500 },
  { id: '304-blackTi',       name: '304黑钛发纹',         nameEn: 'SS304 BlackTi',    category: 'ss304', finish: 'blackTi',  price: 600 },
  { id: '304-blackTi-m',     name: '304黑钛镜面',         nameEn: 'SS304 BlackTi Mir', category: 'ss304', finish: 'blackTi',  price: 800 },
  { id: '443-ti',            name: '443钛金发纹',         nameEn: 'SS443 Ti',         category: 'ss443', finish: 'titanium', price: 500 },
  { id: '304-ti',            name: '304钛金发纹',         nameEn: 'SS304 Ti',         category: 'ss304', finish: 'titanium', price: 600 },
  { id: '304-ti-m',          name: '304钛金镜面',         nameEn: 'SS304 Ti Mirror',  category: 'ss304', finish: 'titanium', price: 800 },
  { id: '443-rose',          name: '443玫瑰金发纹',       nameEn: 'SS443 Rose',       category: 'ss443', finish: 'roseGold', price: 500 },
  { id: '304-rose',          name: '304玫瑰金发纹',       nameEn: 'SS304 Rose',       category: 'ss304', finish: 'roseGold', price: 600 },
  { id: '304-rose-m',        name: '304玫瑰金镜面',       nameEn: 'SS304 Rose Mirror',category: 'ss304', finish: 'roseGold', price: 800 },
  { id: '443-champ',         name: '443香槟金发纹',       nameEn: 'SS443 Champagne',  category: 'ss443', finish: 'champagne', price: 500 },
  { id: '304-champ',         name: '304香槟金发纹',       nameEn: 'SS304 Champagne',  category: 'ss304', finish: 'champagne', price: 600 },
  { id: '304-champ-m',       name: '304香槟金镜面',       nameEn: 'SS304 Champagne M',category: 'ss304', finish: 'champagne', price: 800 },
  { id: '443-cu',            name: '443古铜发纹',         nameEn: 'SS443 AntiqueCu',  category: 'ss443', finish: 'antique',   price: 500 },
  { id: '304-cu',            name: '304古铜发纹',         nameEn: 'SS304 AntiqueCu',  category: 'ss304', finish: 'antique',   price: 600 },
  { id: '304-cu-m',          name: '304古铜镜面',         nameEn: 'SS304 AntiqueCuM',category: 'ss304', finish: 'antique',   price: 800 },
  { id: '443-red',           name: '443红铜发纹',         nameEn: 'SS443 RedCu',      category: 'ss443', finish: 'redCopper', price: 500 },
  { id: '304-red',           name: '304红铜发纹',         nameEn: 'SS304 RedCu',      category: 'ss304', finish: 'redCopper', price: 600 },
  { id: '304-red-m',         name: '304红铜镜面',         nameEn: 'SS304 RedCu Mirror',category: 'ss304', finish: 'redCopper', price: 800 },
  { id: '201-etch',          name: '201发纹蚀刻',         nameEn: 'SS201 Etched',     category: 'ss201', finish: 'etched',    price: 100 },
  { id: '304-etch',          name: '304发纹蚀刻',         nameEn: 'SS304 Etched',     category: 'ss304', finish: 'etched',    price: 500 },
  { id: '443-etch',          name: '443发纹蚀刻',         nameEn: 'SS443 Etched',     category: 'ss443', finish: 'etched',    price: 400 },
  { id: '316-etch',          name: '316发纹蚀刻',         nameEn: 'SS316 Etched',     category: 'ss316', finish: 'etched',    price: 900 },
  { id: '201-m-etch',        name: '201镜面蚀刻',         nameEn: 'SS201 Mir Etched', category: 'ss201', finish: 'etched',    price: 300 },
  { id: '304-m-etch',        name: '304镜面蚀刻',         nameEn: 'SS304 Mir Etched', category: 'ss304', finish: 'etched',    price: 700 },
  { id: 'combo-midrose',     name: '中间201玫瑰金镜面+两侧201玫瑰金镜面', nameEn: 'Combo Mid Rose', category: 'combo', finish: 'combo', price: 2000 },
  { id: 'combo-mid304',      name: '中间304镜面蚀刻+两侧304发纹',         nameEn: 'Combo Mid304',   category: 'combo', finish: 'combo', price: 2100 },
  { id: '201-rose',          name: '201玫瑰金镜面',       nameEn: 'SS201 Rose Mirror', category: 'ss201', finish: 'roseGold', price: 2000 },
  { id: '201-rose-etch',     name: '201玫瑰金镜面蚀刻',   nameEn: 'SS201 Rose Etched', category: 'ss201', finish: 'etched',    price: 2900 },
]

export const DECORATION_MATERIAL_MAP = new Map(DECORATION_MATERIALS.map(m => [m.name, m]))

// ============================================================
// 轿厢风格预设（对应 Cabin-selection 图片）
// 选择图片后自动填充：后壁/左侧壁/右侧壁/前壁/轿门
// ============================================================
export interface CabinPreset {
  id: string
  image: string
  level: '普通' | '高级' | '豪华'
  label: string
  wallBack: string    // 后壁材料
  wallLeft: string    // 左侧壁材料
  wallRight: string   // 右侧壁材料
  wallFront: string   // 前壁材料
  carDoor: string     // 轿门材料
  price: number
  defaultCeilingId: string   // 该款默认吊顶ID
  defaultFloorId: string      // 该款默认地板ID
}

export const CABIN_PRESETS: CabinPreset[] = [
  // 普通版
  {
    id: 'Basic-1', image: '/img/cabin/Basic-1.png', level: '普通', label: '普通版-款式1',
    wallBack: '201发纹', wallLeft: '201发纹', wallRight: '201发纹', wallFront: '201发纹', carDoor: '201发纹',
    price: 0, defaultCeilingId: 'top-1', defaultFloorId: 'grand-1',
  },
  {
    id: 'Basic-2', image: '/img/cabin/Basic-2.png', level: '普通', label: '普通版-款式2',
    wallBack: '304发纹', wallLeft: '304发纹', wallRight: '304发纹', wallFront: '304发纹', carDoor: '304发纹',
    price: 1600, defaultCeilingId: 'top-1', defaultFloorId: 'grand-1',
  },
  {
    id: 'Basic-3', image: '/img/cabin/Basic-3.png', level: '普通', label: '普通版-款式3',
    wallBack: '钢板喷涂色', wallLeft: '201发纹', wallRight: '201发纹', wallFront: '201发纹', carDoor: '201发纹',
    price: 0, defaultCeilingId: 'top-1', defaultFloorId: 'grand-1',
  },
  // 高级版
  {
    id: 'Deluxe-1', image: '/img/cabin/Deluxe-1.png', level: '高级', label: '高级版-款式1',
    wallBack: '304镜面', wallLeft: '304发纹', wallRight: '304发纹', wallFront: '304玫瑰金发纹', carDoor: '304发纹',
    price: 2200, defaultCeilingId: 'top-2', defaultFloorId: 'grand-2',
  },
  {
    id: 'Deluxe-2', image: '/img/cabin/Deluxe-2.png', level: '高级', label: '高级版-款式2',
    wallBack: '304钛金发纹', wallLeft: '304发纹', wallRight: '304发纹', wallFront: '304钛金发纹', carDoor: '304发纹',
    price: 2400, defaultCeilingId: 'top-2', defaultFloorId: 'grand-2',
  },
  {
    id: 'Deluxe-3', image: '/img/cabin/Deluxe-3.png', level: '高级', label: '高级版-款式3',
    wallBack: '304玫瑰金镜面', wallLeft: '304玫瑰金发纹', wallRight: '304玫瑰金发纹', wallFront: '304玫瑰金镜面', carDoor: '304玫瑰金发纹',
    price: 3200, defaultCeilingId: 'top-3', defaultFloorId: 'grand-3',
  },
  // 豪华版
  {
    id: 'Ultra-1', image: '/img/cabin/Ultra-1.png', level: '豪华', label: '豪华版-款式1',
    wallBack: '304玫瑰金镜面', wallLeft: '304玫瑰金发纹蚀刻', wallRight: '304玫瑰金发纹蚀刻', wallFront: '304玫瑰金镜面', carDoor: '304玫瑰金镜面',
    price: 3700, defaultCeilingId: 'top-4', defaultFloorId: 'grand-4',
  },
  {
    id: 'Ultra-2', image: '/img/cabin/Ultra-2.png', level: '豪华', label: '豪华版-款式2',
    wallBack: '304香槟金镜面', wallLeft: '304香槟金发纹蚀刻', wallRight: '304香槟金发纹蚀刻', wallFront: '304香槟金镜面', carDoor: '304香槟金镜面',
    price: 3700, defaultCeilingId: 'top-4', defaultFloorId: 'grand-4',
  },
  {
    id: 'Ultra-3', image: '/img/cabin/Ultra-3.png', level: '豪华', label: '豪华版-款式3',
    wallBack: '304黑钛镜面', wallLeft: '304黑钛发纹蚀刻', wallRight: '304黑钛发纹蚀刻', wallFront: '304黑钛镜面', carDoor: '304黑钛镜面',
    price: 4100, defaultCeilingId: 'top-4', defaultFloorId: 'grand-5',
  },
]

// ============================================================
// 吊顶预设（对应 Top-selection 图片）
// ============================================================
export interface CeilingPreset {
  id: string
  image: string
  label: string
  price: number
}

export const CEILING_PRESETS: CeilingPreset[] = [
  { id: 'top-1', image: '/img/cabin/top-1.png',  label: '吊顶款式1', price: 0 },
  { id: 'top-2', image: '/img/cabin/top-2.png',  label: '吊顶款式2', price: 0 },
  { id: 'top-3', image: '/img/cabin/top-3.png',  label: '吊顶款式3', price: 0 },
  { id: 'top-4', image: '/img/cabin/top-4.png',  label: '吊顶款式4', price: 0 },
]

// ============================================================
// 地板预设（对应 Grand-selection 图片）
// ============================================================
export interface FloorPreset {
  id: string
  image: string
  label: string
  price: number
}

export const FLOOR_PRESETS: FloorPreset[] = [
  { id: 'grand-1', image: '/img/cabin/grand-1.png', label: '地板款式1', price: 0 },
  { id: 'grand-2', image: '/img/cabin/grand-2.png', label: '地板款式2', price: 0 },
  { id: 'grand-3', image: '/img/cabin/grand-3.png', label: '地板款式3', price: 0 },
  { id: 'grand-4', image: '/img/cabin/grand-4.png', label: '地板款式4', price: 0 },
  { id: 'grand-5', image: '/img/cabin/grand-5.png', label: '地板款式5', price: 0 },
]

// ============================================================
// 门厅预设（对应 Door-selection 图片）
// 选择图片后自动填充：厅门基站层/厅门其余层/小门套基站层/小门套其余层
// ============================================================
export interface DoorPreset {
  id: string
  image: string
  label: string
  hallDoorBase: string    // 厅门-基站层
  hallDoorOther: string   // 厅门-其余层
  doorFrameBase: string   // 小门套-基站层
  doorFrameOther: string  // 小门套-其余层
  price: number
}

export const DOOR_PRESETS: DoorPreset[] = [
  {
    id: 'door-1',
    image: '/img/cabin/door-1.png',
    label: '门厅款式1',
    hallDoorBase: '201发纹',
    hallDoorOther: '201发纹',
    doorFrameBase: '201发纹',
    doorFrameOther: '201发纹',
    price: 0,
  },
  {
    id: 'door-2',
    image: '/img/cabin/door-2.png',
    label: '门厅款式2',
    hallDoorBase: '304发纹',
    hallDoorOther: '304发纹',
    doorFrameBase: '304发纹',
    doorFrameOther: '304发纹',
    price: 1200,
  },
  {
    id: 'door-3',
    image: '/img/cabin/door-3.png',
    label: '门厅款式3',
    hallDoorBase: '304玫瑰金发纹',
    hallDoorOther: '304玫瑰金发纹',
    doorFrameBase: '304玫瑰金发纹',
    doorFrameOther: '304玫瑰金发纹',
    price: 2400,
  },
  {
    id: 'door-4',
    image: '/img/cabin/door-4.png',
    label: '门厅款式4',
    hallDoorBase: '304玫瑰金镜面',
    hallDoorOther: '304玫瑰金镜面',
    doorFrameBase: '304玫瑰金镜面',
    doorFrameOther: '304玫瑰金镜面',
    price: 3200,
  },
]

// ============================================================
// 召唤盒（不加价）
// ============================================================
export const CALLBOX_STYLE_OPTIONS: QuoteOption[] = [
  { name: '挂壁式',   nameEn: 'Wall Mount',    price: 0 },
  { name: '无底盒',   nameEn: 'No Base Box',   price: 0 },
  { name: '有底盒',   nameEn: 'With Base Box', price: 0 },
  { name: '客户自理', nameEn: 'Customer Own',  price: 0 },
]

// ============================================================
// 显示板
// ============================================================
export const DISPLAY_OPTIONS: QuoteOption[] = [
  // 普通型
  { name: '6.4寸蓝底白字',     nameEn: '6.4 Blue BG White', price: 0 },
  { name: '6.4寸黑底白字',     nameEn: '6.4 Black BG White', price: 0 },
  { name: '4.3寸蓝底白字',     nameEn: '4.3 Blue BG White', price: 0 },
  { name: '4.3寸黑底白字',     nameEn: '4.3 Black BG White', price: 0 },
  { name: '6.4寸红色大点阵',   nameEn: '6.4 Red Dot Matrix', price: 0 },
  { name: '红色点阵',           nameEn: 'Red Dot Matrix',     price: 0 },
  // 视频型
  { name: '7寸图片机',         nameEn: '7 inch Image',        price: 1000 },
  { name: '8寸图片机-竖显',     nameEn: '8 inch Image Vert',  price: 1000 },
  { name: '8寸视频机',          nameEn: '8 inch Video',        price: 1000 },
  { name: '9.7寸视频机-横显',   nameEn: '9.7 inch Video',     price: 1000 },
  { name: '10.1寸图片机-横显',  nameEn: '10.1 inch Image',    price: 1000 },
  { name: '10.1寸触摸屏',       nameEn: '10.1 inch Touch',    price: 1000 },
  { name: '10.4寸视频机-横显',  nameEn: '10.4 inch Video',   price: 1000 },
]

// ============================================================
// 选配功能（每个 +¥2000）
// ============================================================
export const OPTIONAL_ITEMS: QuoteOption[] = [
  { name: '停电应急装置 ARD', nameEn: 'ARD',     price: 2000 },
  { name: '稳压器 AVR',       nameEn: 'AVR',     price: 2000 },
  { name: '地震仪',           nameEn: 'Seismic',  price: 2000 },
  { name: 'IC卡',             nameEn: 'IC Card',  price: 2000 },
  { name: '轿厢监控 CCTV',    nameEn: 'CCTV',    price: 2000 },
]

// ============================================================
// COP（轿厢操作盘）预设
// ============================================================
export interface COPPreset {
  id: string
  image: string
  label: string
  price: number
}

export const COP_PRESETS: COPPreset[] = [
  { id: 'COP-1', image: '/img/cabin/COP-1.png', label: 'COP款式1', price: 0 },
  { id: 'COP-2', image: '/img/cabin/COP-2.png', label: 'COP款式2', price: 0 },
  { id: 'COP-3', image: '/img/cabin/COP-3.png', label: 'COP款式3', price: 0 },
]

// ============================================================
// LOP（层站召唤盒）预设
// ============================================================
export interface LOPPreset {
  id: string
  image: string
  label: string
  price: number
}

export const LOP_PRESETS: LOPPreset[] = [
  { id: 'LOP-1', image: '/img/cabin/LOP-1.png', label: 'LOP款式1', price: 0 },
  { id: 'LOP-2', image: '/img/cabin/LOP-2.png', label: 'LOP款式2', price: 0 },
  { id: 'LOP-3', image: '/img/cabin/LOP-3.png', label: 'LOP款式3', price: 0 },
]

// ============================================================
// 扶手（不加价）
// ============================================================
export const HANDRAIL_OPTIONS: QuoteOption[] = [
  { name: '不发纹扶手', nameEn: 'Standard',    price: 0 },
  { name: '发纹扶手',   nameEn: 'Hairline',   price: 0 },
  { name: '不锈钢扶手', nameEn: 'SS Handrail', price: 0 },
]

// ============================================================
// 报价计算
// ============================================================

export interface QuoteSelections {
  // 基础配置
  load: string
  speed: string
  floors: string
  floorsCustom?: number
  traction: string
  controller: string
  doorMachine: string
  doorOpening: string

  // 轿厢（图片选择）
  cabinPresetId: string      // 轿厢风格预设
  cabinRemarks: string       // 轿厢备注
  cabinRefImages: string[]   // 轿厢参考图片（base64或URL）
  ceilingPresetId: string    // 吊顶预设
  floorPresetId: string      // 地板预设
  wallBack: string           // 后壁材料
  wallLeft: string           // 左侧壁材料
  wallRight: string          // 右侧壁材料
  wallFront: string          // 前壁材料
  carDoor: string            // 轿门材料

  // 门厅（图片选择）
  doorPresetId: string       // 门厅预设
  hallDoorMaterial: string   // 门板材料
  doorRemarks: string        // 门厅备注
  doorRefImages: string[]    // 门厅参考图片

  // 召唤
  display: string
  copPresetId: string
  lopPresetId: string
  callBoxStyle: string
  displayRemarks: string
  displayRefImages: string[]
  ceilingRemarks: string
  floorRemarks: string

  // 选配
  optionals: string[]

  // 备注
  remarks: string
}

export interface PriceBreakdown {
  basePrice: number
  loadPrice: number
  speedPrice: number
  floorPrice: number
  doorOpeningPrice: number
  cabinPresetPrice: number
  wallCarDoorAdjustment: number  // 四壁+轿门材料差价（用户修改后的材料费 - 预设材料费）
  ceilingPresetPrice: number
  floorPresetPrice: number
  doorPresetPrice: number
  copPrice: number
  lopPrice: number
  displayPrice: number
  optionalPrice: number
  hasCustomDecoration: boolean
  total: number
}

function getFloorCount(floors: string, customFloor?: number): number {
  if (floors === '自定义' && customFloor !== undefined) return customFloor
  const match = floors.match(/(\d+)/)
  return match ? parseInt(match[1]) : 10
}

export function calculatePrice(selections: QuoteSelections): PriceBreakdown {
  const basePrice = BASE_PRICE

  const loadOpt = LOAD_OPTIONS.find(o => o.name === selections.load)
  const loadPrice = loadOpt?.price ?? 0

  const speedOpt = SPEED_OPTIONS.find(o => o.name === selections.speed)
  const speedPrice = speedOpt?.price ?? 0

  const floorCount = getFloorCount(selections.floors, selections.floorsCustom)
  const floorOpt = FLOOR_OPTIONS.find(o => o.name === `${floorCount}层`)
  let floorPrice = floorOpt?.price ?? 0
  if (!floorOpt && floorCount > 10) {
    floorPrice = (floorCount - 10) * 2000
  }

  // 开门方式
  const doorOpt = DOOR_OPENING_OPTIONS.find(o => o.name === selections.doorOpening)
  const doorOpeningPrice = (doorOpt?.basePrice ?? 0) + (doorOpt?.perFloorPrice ?? 0) * Math.max(0, floorCount - 1)

  // 轿厢预设
  const cabinPreset = CABIN_PRESETS.find(p => p.id === selections.cabinPresetId)
  const cabinPresetPrice = cabinPreset?.price ?? 0

  // 四壁+轿门材料差价 = (当前材料总价) - (预设材料总价)
  // 预设墙板材料费
  const presetWallCarDoorPrice =
    (DECORATION_MATERIAL_MAP.get(cabinPreset?.wallBack ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(cabinPreset?.wallLeft ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(cabinPreset?.wallRight ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(cabinPreset?.wallFront ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(cabinPreset?.carDoor ?? '')?.price ?? 0)
  // 用户选择墙板材料费
  const selectedWallCarDoorPrice =
    (DECORATION_MATERIAL_MAP.get(selections.wallBack ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(selections.wallLeft ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(selections.wallRight ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(selections.wallFront ?? '')?.price ?? 0) +
    (DECORATION_MATERIAL_MAP.get(selections.carDoor ?? '')?.price ?? 0)
  const wallCarDoorAdjustment = selectedWallCarDoorPrice - presetWallCarDoorPrice

  // 吊顶预设
  const ceilingPreset = CEILING_PRESETS.find(p => p.id === selections.ceilingPresetId)
  const ceilingPresetPrice = ceilingPreset?.price ?? 0

  // 地板预设
  const floorPreset = FLOOR_PRESETS.find(p => p.id === selections.floorPresetId)
  const floorPresetPrice = floorPreset?.price ?? 0

  // 门厅预设
  const doorPreset = DOOR_PRESETS.find(p => p.id === selections.doorPresetId)
  const doorPresetBase = doorPreset?.price ?? 0
  const doorPresetPrice = doorPresetBase

  // 是否有自定义装潢备注/图片
  const hasCustomDecoration =
    !!(selections.cabinRemarks || selections.cabinRefImages?.length ||
      selections.doorRemarks || selections.doorRefImages?.length ||
      selections.displayRemarks || selections.displayRefImages?.length ||
      selections.ceilingRemarks || selections.floorRemarks)

  // 显示板
  const displayPrice = DISPLAY_OPTIONS.find(o => o.name === selections.display)?.price ?? 0

  // 选配功能
  let optionalPrice = 0
  for (const itemName of (selections.optionals || [])) {
    const item = OPTIONAL_ITEMS.find(o => o.name === itemName)
    if (item) optionalPrice += item.price
  }

  const total =
    basePrice + loadPrice + speedPrice + floorPrice +
    doorOpeningPrice + cabinPresetPrice + ceilingPresetPrice +
    floorPresetPrice + doorPresetPrice +
    displayPrice + optionalPrice

  const copPrice = COP_PRESETS.find(p => p.id === selections.copPresetId)?.price ?? 0
  const lopPrice = LOP_PRESETS.find(p => p.id === selections.lopPresetId)?.price ?? 0

  return {
    basePrice,
    loadPrice,
    speedPrice,
    floorPrice,
    doorOpeningPrice,
    cabinPresetPrice,
    wallCarDoorAdjustment,
    ceilingPresetPrice,
    floorPresetPrice,
    doorPresetPrice,
    copPrice,
    lopPrice,
    displayPrice,
    optionalPrice,
    hasCustomDecoration,
    total,
  }
}

// 默认选型
export const DEFAULT_SELECTIONS: QuoteSelections = {
  load: '630kg',
  speed: '1.0m/s',
  floors: '10层',
  traction: '通润',
  controller: '默纳克',
  doorMachine: '宁波欧菱',
  doorOpening: '中分',
  cabinPresetId: 'Basic-1',
  cabinRemarks: '',
  cabinRefImages: [],
  ceilingPresetId: '',
  floorPresetId: '',
  wallBack: '201发纹',
  wallLeft: '201发纹',
  wallRight: '201发纹',
  wallFront: '201发纹',
  carDoor: '201发纹',
  doorPresetId: 'door-1',
  hallDoorMaterial: '201发纹',
  doorRemarks: '',
  doorRefImages: [],
  display: '6.4寸蓝底白字',
  copPresetId: 'COP-1',
  lopPresetId: 'LOP-1',
  callBoxStyle: '挂壁式',
  displayRemarks: '',
  displayRefImages: [],
  ceilingRemarks: '',
  floorRemarks: '',
  optionals: [],
  remarks: '',
}
