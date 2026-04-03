// ============================================================
// 电梯报价系统 - 核心数据与计算逻辑
// 基准：630KG / 1.0m/s / 10层 = ¥49,000
// 版本：v1.2
// ============================================================

export interface QuoteOption {
  name: string
  nameEn: string
  price: number
  description?: string
  tier?: number // 档位，用于档位计价
}

export interface QuoteGroup {
  groupName: string
  nameEn: string
  options: QuoteOption[]
}

export interface DecorationMaterial {
  id: string
  name: string
  nameEn: string
  category: string
  finish: string
  price: number
}

// ============================================================
// 基准价格
// ============================================================
export const BASE_PRICE = 49000 // 630KG / 1.0m/s / 10层

// ============================================================
// 基础配置 - 载重档位
// 档位1=630基准, 档位2=680, 档位3=800, 档位4=1000, 档位5=1050, 档位6=1350
// 每升一档 +¥2000
// ============================================================
export const LOAD_OPTIONS: QuoteOption[] = [
  { name: '630kg',  nameEn: '630kg',  price: 0,     tier: 1 },
  { name: '680kg',  nameEn: '680kg',  price: 2000,  tier: 2 },
  { name: '800kg',  nameEn: '800kg',  price: 4000,  tier: 3 },
  { name: '1000kg', nameEn: '1000kg', price: 6000,  tier: 4 },
  { name: '1050kg', nameEn: '1050kg', price: 8000,  tier: 5 },
  { name: '1350kg', nameEn: '1350kg', price: 10000, tier: 6 },
]

// ============================================================
// 基础配置 - 速度档位
// 档位1=1.0基准, 档位2=1.5, 档位3=1.75, 档位4=2.0, 档位5=2.5
// 每升一档 +¥2000
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
// 以10层为基准，每增/减一层 ±¥2000
// 最低3层（3层和2层同价）
// ============================================================
export const FLOOR_OPTIONS: QuoteOption[] = [
  { name: '2层',  nameEn: '2 Floors',  price: -16000 }, // 与3层同价
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
// 曳引机品牌（默认不加价，走备注）
// ============================================================
export const TRACTION_OPTIONS: QuoteGroup = {
  groupName: '曳引机品牌',
  nameEn: 'Traction Machine',
  options: [
    { name: '通润',      nameEn: 'Tongrun',      price: 0 },
    { name: '蒙特纳利', nameEn: 'Montanari',    price: 0 },
    { name: '法西',     nameEn: 'Faxi',          price: 0 },
    { name: '西艾杰',   nameEn: 'SAJ',          price: 0 },
    { name: '蒙塔纳锐', nameEn: 'Montanari',    price: 0 },
    { name: '西子富沃德', nameEn: 'XiziFwoode', price: 0 },
    { name: '弗尔德',   nameEn: 'Fulder',        price: 0 },
    { name: '欣达',     nameEn: 'Xinda',         price: 0 },
  ],
}

// ============================================================
// 控制系统（默认不加价，走备注）
// ============================================================
export const CONTROLLER_OPTIONS: QuoteGroup = {
  groupName: '电梯控制系统',
  nameEn: 'Control System',
  options: [
    { name: '默纳克',         nameEn: 'Monaike',   price: 0 },
    { name: '默纳克-富上协议', nameEn: 'Monaike-FS', price: 0 },
    { name: '默纳克-三代柜',   nameEn: 'Monaike-3G', price: 0 },
    { name: '默纳克3000+',     nameEn: 'Monaike-3000', price: 0 },
    { name: '新时达',         nameEn: 'Xinshidai', price: 0 },
    { name: '迷你柜',         nameEn: 'Mini Cabinet', price: 0 },
    { name: '荣耀柜',         nameEn: 'Glory Cabinet', price: 0 },
    { name: '深邦P8000',      nameEn: 'Shenbang-P8000', price: 0 },
  ],
}

// ============================================================
// 门机品牌（默认不加价，走备注）
// ============================================================
export const DOOR_MACHINE_OPTIONS: QuoteGroup = {
  groupName: '门机品牌',
  nameEn: 'Door Machine',
  options: [
    { name: '宁波欧菱',  nameEn: 'Ningbo Oulin',  price: 0 },
    { name: '宁波申菱',  nameEn: 'Ningbo Shenling', price: 0 },
    { name: '无锡展鹏',  nameEn: 'Wuxi Zhanpeng',  price: 0 },
    { name: '苏州易升',  nameEn: 'Suzhou Yisheng', price: 0 },
    { name: '马尔默',    nameEn: 'Marmer',         price: 0 },
    { name: '西子优迈',  nameEn: 'Xizi Youmai',    price: 0 },
    { name: '佛马特',    nameEn: 'Formart',        price: 0 },
    { name: '新时达',    nameEn: 'Xinshidai',      price: 0 },
  ],
}

// ============================================================
// 开门方式
// 中分 ¥0，其他全部 +¥2000
// ============================================================
export const DOOR_OPENING_OPTIONS: QuoteOption[] = [
  { name: '中分',           nameEn: 'Centre Open',       price: 0 },
  { name: '旁开',           nameEn: 'Side Open',          price: 2000 },
  { name: '旁开双折-左开',  nameEn: 'Side 2-fold Left',   price: 2000 },
  { name: '旁开双折-右开',  nameEn: 'Side 2-fold Right',  price: 2000 },
  { name: '中分双折',       nameEn: 'Centre 2-speed',     price: 2000 },
  { name: '旁开三折-左开',  nameEn: 'Side 3-fold Left',   price: 2000 },
  { name: '旁开三折-右开',  nameEn: 'Side 3-fold Right',  price: 2000 },
]

// ============================================================
// 电源类型（暂不计入价格，走备注）
// ============================================================
export const POWER_SUPPLY_OPTIONS: QuoteOption[] = [
  { name: '三相415V/50HZ', nameEn: '3-Phase 415V/50HZ', price: 0 },
  { name: '三相380V/50HZ', nameEn: '3-Phase 380V/50HZ', price: 0 },
  { name: '三相220V/50HZ', nameEn: '3-Phase 220V/50HZ', price: 0 },
  { name: '三相208V/50HZ', nameEn: '3-Phase 208V/50HZ', price: 0 },
  { name: '三相415V/60HZ', nameEn: '3-Phase 415V/60HZ', price: 0 },
  { name: '三相380V/60HZ', nameEn: '3-Phase 380V/60HZ', price: 0 },
  { name: '三相220V/60HZ', nameEn: '3-Phase 220V/60HZ', price: 0 },
  { name: '三相208V/60HZ', nameEn: '3-Phase 208V/60HZ', price: 0 },
  { name: '单相240V/50HZ', nameEn: '1-Phase 240V/50HZ', price: 0 },
  { name: '单相220V/50HZ', nameEn: '1-Phase 220V/50HZ', price: 0 },
  { name: '单相110V/50HZ', nameEn: '1-Phase 110V/50HZ', price: 0 },
  { name: '单相240V/60HZ', nameEn: '1-Phase 240V/60HZ', price: 0 },
  { name: '单相220V/60HZ', nameEn: '1-Phase 220V/60HZ', price: 0 },
  { name: '单相110V/60HZ', nameEn: '1-Phase 110V/60HZ', price: 0 },
]

// ============================================================
// 装潢材料加价表
// ============================================================
export const DECORATION_MATERIALS: DecorationMaterial[] = [
  // 基础钢板
  { id: 'steel-painted',      name: '钢板喷涂色',           nameEn: 'Painted Steel',     category: 'steel',  finish: 'painted',  price: 0 },
  { id: '201-hairline',       name: '201发纹',             nameEn: 'SS201 Hairline',    category: 'ss201',  finish: 'hairline',  price: 0 },

  // 不锈钢发纹
  { id: '304-hairline',       name: '304发纹',             nameEn: 'SS304 Hairline',    category: 'ss304',  finish: 'hairline',  price: 400 },
  { id: '443-hairline',       name: '443发纹',             nameEn: 'SS443 Hairline',    category: 'ss443',  finish: 'hairline',  price: 300 },
  { id: '316-hairline',       name: '316发纹',             nameEn: 'SS316 Hairline',    category: 'ss316',  finish: 'hairline',  price: 800 },

  // 不锈钢镜面
  { id: '201-mirror',         name: '201镜面',             nameEn: 'SS201 Mirror',      category: 'ss201',  finish: 'mirror',    price: 200 },
  { id: '304-mirror',         name: '304镜面',             nameEn: 'SS304 Mirror',      category: 'ss304',  finish: 'mirror',    price: 600 },

  // 黑钛系列
  { id: '443-blackTi-hairline', name: '443黑钛发纹',       nameEn: 'SS443 Black Ti Hairline', category: 'ss443', finish: 'blackTi', price: 500 },
  { id: '304-blackTi-hairline', name: '304黑钛发纹',       nameEn: 'SS304 Black Ti Hairline', category: 'ss304', finish: 'blackTi', price: 600 },
  { id: '304-blackTi-mirror',   name: '304黑钛镜面',       nameEn: 'SS304 Black Ti Mirror',   category: 'ss304', finish: 'blackTi', price: 800 },

  // 钛金系列
  { id: '443-ti-hairline',    name: '443钛金发纹',         nameEn: 'SS443 Ti Hairline',  category: 'ss443',  finish: 'titanium',  price: 500 },
  { id: '304-ti-hairline',    name: '304钛金发纹',         nameEn: 'SS304 Ti Hairline',  category: 'ss304',  finish: 'titanium',  price: 600 },
  { id: '304-ti-mirror',      name: '304钛金镜面',         nameEn: 'SS304 Ti Mirror',    category: 'ss304',  finish: 'titanium',  price: 800 },

  // 玫瑰金系列
  { id: '443-roseGold-hairline', name: '443玫瑰金发纹',   nameEn: 'SS443 Rose Gold Hairline', category: 'ss443', finish: 'roseGold', price: 500 },
  { id: '304-roseGold-hairline', name: '304玫瑰金发纹',   nameEn: 'SS304 Rose Gold Hairline', category: 'ss304', finish: 'roseGold', price: 600 },
  { id: '304-roseGold-mirror',   name: '304玫瑰金镜面',   nameEn: 'SS304 Rose Gold Mirror',   category: 'ss304', finish: 'roseGold', price: 800 },

  // 香槟金系列
  { id: '443-champagneGold-hairline', name: '443香槟金发纹', nameEn: 'SS443 Champagne Gold Hairline', category: 'ss443', finish: 'champagneGold', price: 500 },
  { id: '304-champagneGold-hairline', name: '304香槟金发纹', nameEn: 'SS304 Champagne Gold Hairline', category: 'ss304', finish: 'champagneGold', price: 600 },
  { id: '304-champagneGold-mirror',   name: '304香槟金镜面', nameEn: 'SS304 Champagne Gold Mirror',   category: 'ss304', finish: 'champagneGold', price: 800 },

  // 古铜系列
  { id: '443-antiqueCu-hairline', name: '443古铜发纹',     nameEn: 'SS443 Antique Copper Hairline', category: 'ss443', finish: 'antiqueCopper', price: 500 },
  { id: '304-antiqueCu-hairline', name: '304古铜发纹',     nameEn: 'SS304 Antique Copper Hairline', category: 'ss304', finish: 'antiqueCopper', price: 600 },
  { id: '304-antiqueCu-mirror',   name: '304古铜镜面',     nameEn: 'SS304 Antique Copper Mirror',   category: 'ss304', finish: 'antiqueCopper', price: 800 },

  // 红铜系列
  { id: '443-redCu-hairline', name: '443红铜发纹',         nameEn: 'SS443 Red Copper Hairline', category: 'ss443', finish: 'redCopper', price: 500 },
  { id: '304-redCu-hairline', name: '304红铜发纹',         nameEn: 'SS304 Red Copper Hairline', category: 'ss304', finish: 'redCopper', price: 600 },
  { id: '304-redCu-mirror',   name: '304红铜镜面',         nameEn: 'SS304 Red Copper Mirror',   category: 'ss304', finish: 'redCopper', price: 800 },

  // 蚀刻系列
  { id: '201-hairline-etch',  name: '201发纹蚀刻',         nameEn: 'SS201 Hairline Etched',  category: 'ss201', finish: 'etched', price: 100 },
  { id: '304-hairline-etch',  name: '304发纹蚀刻',         nameEn: 'SS304 Hairline Etched',  category: 'ss304', finish: 'etched', price: 500 },
  { id: '443-hairline-etch',  name: '443发纹蚀刻',         nameEn: 'SS443 Hairline Etched',  category: 'ss443', finish: 'etched', price: 400 },
  { id: '316-hairline-etch',  name: '316发纹蚀刻',         nameEn: 'SS316 Hairline Etched',  category: 'ss316', finish: 'etched', price: 900 },
  { id: '201-mirror-etch',    name: '201镜面蚀刻',         nameEn: 'SS201 Mirror Etched',    category: 'ss201', finish: 'etched', price: 300 },
  { id: '304-mirror-etch',    name: '304镜面蚀刻',         nameEn: 'SS304 Mirror Etched',    category: 'ss304', finish: 'etched', price: 700 },

  { id: '443-blackTi-hairline-etch', name: '443黑钛发纹蚀刻', nameEn: 'SS443 Black Ti Hairline Etched', category: 'ss443', finish: 'etched', price: 600 },
  { id: '304-blackTi-hairline-etch', name: '304黑钛发纹蚀刻', nameEn: 'SS304 Black Ti Hairline Etched', category: 'ss304', finish: 'etched', price: 700 },
  { id: '304-blackTi-mirror-etch',   name: '304黑钛镜面蚀刻', nameEn: 'SS304 Black Ti Mirror Etched',   category: 'ss304', finish: 'etched', price: 900 },

  { id: '443-ti-hairline-etch', name: '443钛金发纹蚀刻',    nameEn: 'SS443 Ti Hairline Etched',  category: 'ss443', finish: 'etched', price: 600 },
  { id: '304-ti-hairline-etch', name: '304钛金发纹蚀刻',    nameEn: 'SS304 Ti Hairline Etched',  category: 'ss304', finish: 'etched', price: 700 },
  { id: '304-ti-mirror-etch',   name: '304钛金镜面蚀刻',    nameEn: 'SS304 Ti Mirror Etched',    category: 'ss304', finish: 'etched', price: 900 },

  { id: '443-roseGold-hairline-etch', name: '443玫瑰金发纹蚀刻', nameEn: 'SS443 Rose Gold Hairline Etched', category: 'ss443', finish: 'etched', price: 600 },
  { id: '304-roseGold-hairline-etch', name: '304玫瑰金发纹蚀刻', nameEn: 'SS304 Rose Gold Hairline Etched', category: 'ss304', finish: 'etched', price: 700 },
  { id: '304-roseGold-mirror-etch',   name: '304玫瑰金镜面蚀刻', nameEn: 'SS304 Rose Gold Mirror Etched',   category: 'ss304', finish: 'etched', price: 900 },

  { id: '443-champagneGold-hairline-etch', name: '443香槟金发纹蚀刻', nameEn: 'SS443 Champagne Gold Hairline Etched', category: 'ss443', finish: 'etched', price: 600 },
  { id: '304-champagneGold-hairline-etch', name: '304香槟金发纹蚀刻', nameEn: 'SS304 Champagne Gold Hairline Etched', category: 'ss304', finish: 'etched', price: 700 },
  { id: '304-champagneGold-mirror-etch',   name: '304香槟金镜面蚀刻', nameEn: 'SS304 Champagne Gold Mirror Etched',   category: 'ss304', finish: 'etched', price: 900 },

  // 组合系列
  { id: 'combo-201roseMirror',       name: '中间201玫瑰金镜面+两侧201玫瑰金镜面', nameEn: '201 Rose Gold Mirror Combo',     category: 'combo', finish: 'combo', price: 2000 },
  { id: 'combo-304mirrorEtch',       name: '中间304镜面蚀刻+两侧304发纹',         nameEn: '304 Mirror Etch Combo',           category: 'combo', finish: 'combo', price: 2100 },
  { id: '201-roseGold-mirror',       name: '201玫瑰金镜面',                       nameEn: 'SS201 Rose Gold Mirror',          category: 'ss201', finish: 'roseGold', price: 2000 },
  { id: '201-roseGold-mirror-etch',  name: '201玫瑰金镜面蚀刻',                   nameEn: 'SS201 Rose Gold Mirror Etched',   category: 'ss201', finish: 'etched',   price: 2900 },
]

// 方便通过 name 查找装潢材料
export const DECORATION_MATERIAL_MAP = new Map(DECORATION_MATERIALS.map(m => [m.name, m]))

// ============================================================
// 轿底材质（不加价）
// ============================================================
export const CAR_BOTTOM_OPTIONS: QuoteOption[] = [
  { name: 'PVC',          nameEn: 'PVC',           price: 0 },
  { name: '大理石',       nameEn: 'Marble',         price: 0 },
  { name: '花纹钢板',     nameEn: 'Checkered Steel', price: 0 },
  { name: '不锈钢花纹板', nameEn: 'SS Checkered',  price: 0 },
]

// ============================================================
// 吊顶（不加价）
// ============================================================
export const CEILING_OPTIONS: QuoteOption[] = [
  { name: '标准吊顶',     nameEn: 'Standard',      price: 0 },
  { name: '豪华吊顶',     nameEn: 'Luxury',        price: 0 },
]

// ============================================================
// 扶手（不加价）
// ============================================================
export const HANDRAIL_OPTIONS: QuoteOption[] = [
  { name: '不发纹扶手',   nameEn: 'Standard',      price: 0 },
  { name: '发纹扶手',     nameEn: 'Hairline',      price: 0 },
  { name: '不锈钢扶手',   nameEn: 'SS Handrail',   price: 0 },
]

// ============================================================
// 显示板
// 普通型 ¥0，视频型 +¥1000
// ============================================================
export const DISPLAY_OPTIONS: QuoteOption[] = [
  // 普通型
  { name: '6.4寸蓝底白字',   nameEn: '6.4 Blue BG White Text', price: 0 },
  { name: '6.4寸黑底白字',   nameEn: '6.4 Black BG White Text', price: 0 },
  { name: '4.3寸蓝底白字',   nameEn: '4.3 Blue BG White Text', price: 0 },
  { name: '4.3寸黑底白字',   nameEn: '4.3 Black BG White Text', price: 0 },
  { name: '6.4寸红色大点阵', nameEn: '6.4 Red Dot Matrix',       price: 0 },
  { name: '红色点阵',         nameEn: 'Red Dot Matrix',           price: 0 },
  // 视频型
  { name: '7寸图片机',       nameEn: '7 inch Image',            price: 1000 },
  { name: '8寸图片机-竖显',   nameEn: '8 inch Image Vertical',   price: 1000 },
  { name: '8寸视频机',        nameEn: '8 inch Video',             price: 1000 },
  { name: '9.7寸视频机-横显', nameEn: '9.7 inch Video Landscape', price: 1000 },
  { name: '10.1寸图片机-横显', nameEn: '10.1 inch Image Landscape', price: 1000 },
  { name: '10.1寸触摸屏',     nameEn: '10.1 inch Touch',         price: 1000 },
  { name: '10.4寸视频机-横显', nameEn: '10.4 inch Video Landscape', price: 1000 },
]

// ============================================================
// 召唤盒（不加价）
// ============================================================
export const CALLBOX_STYLE_OPTIONS: QuoteOption[] = [
  { name: '挂壁式',   nameEn: 'Wall Mount',     price: 0 },
  { name: '无底盒',   nameEn: 'No Base Box',    price: 0 },
  { name: '有底盒',   nameEn: 'With Base Box',  price: 0 },
  { name: '客户自理', nameEn: 'Customer Own',  price: 0 },
]

// ============================================================
// 选配功能（每个统一 +¥2000）
// ============================================================
export const OPTIONAL_ITEMS: QuoteOption[] = [
  { name: '停电应急装置 ARD', nameEn: 'ARD',    price: 2000 },
  { name: '稳压器 AVR',       nameEn: 'AVR',    price: 2000 },
  { name: '地震仪',           nameEn: 'Seismic', price: 2000 },
  { name: 'IC卡',             nameEn: 'IC Card', price: 2000 },
  { name: '轿厢监控 CCTV',    nameEn: 'CCTV',   price: 2000 },
]

// ============================================================
// 报价计算
// ============================================================

export interface QuoteSelections {
  load: string           // 载重
  speed: string          // 速度
  floors: string         // 层站
  floorsCustom?: number   // 自定义层数（10层以上）
  traction: string       // 曳引机
  controller: string     // 控制系统
  doorMachine: string    // 门机
  doorOpening: string    // 开门方式
  powerSupply: string    // 电源类型

  // 装潢
  wallBack: string       // 后壁
  wallLeft: string       // 左侧壁
  wallRight: string      // 右侧壁
  wallFront: string      // 前壁
  carBottom: string      // 轿底
  ceiling: string       // 吊顶
  handrail: string       // 扶手

  // 门装饰
  carDoor: string        // 轿门
  hallDoorBase: string   // 厅门-基站层
  hallDoorOther: string  // 厅门-其余层
  doorFrameBase: string  // 小门套-基站层
  doorFrameOther: string // 小门套-其余层

  // 显示和召唤
  display: string        // 显示板
  callBoxStyle: string   // 召唤盒款式
  callBoxPanel: string  // 召唤盒面板材质

  // 选配
  optionals: string[]   // 选配功能列表
}

export interface PriceBreakdown {
  basePrice: number
  loadPrice: number
  speedPrice: number
  floorPrice: number
  tractionPrice: number
  controllerPrice: number
  doorMachinePrice: number
  doorOpeningPrice: number
  decorationPrice: number
  displayPrice: number
  callBoxPrice: number
  optionalPrice: number
  total: number
}

function getFloorCount(floors: string, customFloor?: number): number {
  if (floors === '自定义' && customFloor !== undefined) {
    return customFloor
  }
  const match = floors.match(/(\d+)/)
  return match ? parseInt(match[1]) : 10
}

export function calculatePrice(selections: QuoteSelections): PriceBreakdown {
  // 基础价格
  const basePrice = BASE_PRICE

  // 载重加价
  const loadOpt = LOAD_OPTIONS.find(o => o.name === selections.load)
  const loadPrice = loadOpt?.price ?? 0

  // 速度加价
  const speedOpt = SPEED_OPTIONS.find(o => o.name === selections.speed)
  const speedPrice = speedOpt?.price ?? 0

  // 层站加价
  const floorCount = getFloorCount(selections.floors, selections.floorsCustom)
  const floorOpt = FLOOR_OPTIONS.find(o => o.name === `${floorCount}层`)
  let floorPrice = floorOpt?.price ?? 0
  if (!floorOpt && floorCount > 10) {
    // 10层以上自定义
    floorPrice = (floorCount - 10) * 2000
  }

  // 曳引机/控制器/门机（默认不加价）
  const tractionPrice = TRACTION_OPTIONS.options.find(o => o.name === selections.traction)?.price ?? 0
  const controllerPrice = CONTROLLER_OPTIONS.options.find(o => o.name === selections.controller)?.price ?? 0
  const doorMachinePrice = DOOR_MACHINE_OPTIONS.options.find(o => o.name === selections.doorMachine)?.price ?? 0

  // 开门方式
  const doorOpeningPrice = DOOR_OPENING_OPTIONS.find(o => o.name === selections.doorOpening)?.price ?? 0

  // 装潢计算
  const wallBackPrice   = DECORATION_MATERIAL_MAP.get(selections.wallBack)?.price ?? 0
  const wallLeftPrice   = DECORATION_MATERIAL_MAP.get(selections.wallLeft)?.price ?? 0
  const wallRightPrice  = DECORATION_MATERIAL_MAP.get(selections.wallRight)?.price ?? 0
  const wallFrontPrice  = DECORATION_MATERIAL_MAP.get(selections.wallFront)?.price ?? 0
  const carBottomPrice  = CAR_BOTTOM_OPTIONS.find(o => o.name === selections.carBottom)?.price ?? 0
  const ceilingPrice    = CEILING_OPTIONS.find(o => o.name === selections.ceiling)?.price ?? 0
  const handrailPrice   = HANDRAIL_OPTIONS.find(o => o.name === selections.handrail)?.price ?? 0

  // 门装饰（厅门其余层和小门套其余层按 层数-1 计算）
  const otherFloors = Math.max(0, floorCount - 1)
  const carDoorPrice      = DECORATION_MATERIAL_MAP.get(selections.carDoor)?.price ?? 0
  const hallDoorBasePrice = DECORATION_MATERIAL_MAP.get(selections.hallDoorBase)?.price ?? 0
  const hallDoorOtherPrice = (DECORATION_MATERIAL_MAP.get(selections.hallDoorOther)?.price ?? 0) * otherFloors
  const doorFrameBasePrice = DECORATION_MATERIAL_MAP.get(selections.doorFrameBase)?.price ?? 0
  const doorFrameOtherPrice = (DECORATION_MATERIAL_MAP.get(selections.doorFrameOther)?.price ?? 0) * otherFloors

  const decorationPrice =
    wallBackPrice + wallLeftPrice + wallRightPrice + wallFrontPrice +
    carBottomPrice + ceilingPrice + handrailPrice +
    carDoorPrice + hallDoorBasePrice + hallDoorOtherPrice +
    doorFrameBasePrice + doorFrameOtherPrice

  // 显示板
  const displayPrice = DISPLAY_OPTIONS.find(o => o.name === selections.display)?.price ?? 0

  // 召唤盒（不加价）
  const callBoxPrice = 0

  // 选配功能
  let optionalPrice = 0
  for (const itemName of (selections.optionals || [])) {
    const item = OPTIONAL_ITEMS.find(o => o.name === itemName)
    if (item) optionalPrice += item.price
  }

  const total =
    basePrice + loadPrice + speedPrice + floorPrice +
    tractionPrice + controllerPrice + doorMachinePrice + doorOpeningPrice +
    decorationPrice + displayPrice + callBoxPrice + optionalPrice

  return {
    basePrice,
    loadPrice,
    speedPrice,
    floorPrice,
    tractionPrice,
    controllerPrice,
    doorMachinePrice,
    doorOpeningPrice,
    decorationPrice,
    displayPrice,
    callBoxPrice,
    optionalPrice,
    total,
  }
}

// 默认选型
export const DEFAULT_SELECTIONS: QuoteSelections = {
  load: '630kg',
  speed: '1.0m/s',
  floors: '10层',
  floorsCustom: undefined,
  traction: '通润',
  controller: '默纳克',
  doorMachine: '宁波欧菱',
  doorOpening: '中分',
  powerSupply: '三相380V/50HZ',

  wallBack: '钢板喷涂色',
  wallLeft: '201发纹',
  wallRight: '201发纹',
  wallFront: '201发纹',
  carBottom: 'PVC',
  ceiling: '标准吊顶',
  handrail: '不发纹扶手',

  carDoor: '201发纹',
  hallDoorBase: '201发纹',
  hallDoorOther: '201发纹',
  doorFrameBase: '201发纹',
  doorFrameOther: '201发纹',

  display: '6.4寸蓝底白字',
  callBoxStyle: '挂壁式',
  callBoxPanel: '钢板喷涂色',

  optionals: [],
}