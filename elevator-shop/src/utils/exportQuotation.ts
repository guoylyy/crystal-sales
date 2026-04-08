/**
 * 导出报价单到Excel模板
 * 基于 "电梯合同模板.xlsx" 的精确行列位置填充数据
 */
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import type {
  QuoteSelections,
  PriceBreakdown,
  CabinPreset,
  CeilingPreset,
  FloorPreset,
  DoorPreset,
  COPPreset,
  LOPPreset,
} from '../data/elevatorQuote'

// ========== 导出所需的全部数据 ==========
export interface ExportQuotationData {
  projectName: string
  selections: QuoteSelections
  breakdown: PriceBreakdown
  cabinPreset?: CabinPreset
  ceilingPreset?: CeilingPreset
  floorPreset?: FloorPreset
  doorPreset?: DoorPreset
  copPreset?: COPPreset
  lopPreset?: LOPPreset
  copSubRemarks: string
  lopSubRemarks: string
}

// ========== 辅助函数 ==========

/** 从 data URL 中获取扩展名 */
function getExtensionFromDataUrl(dataUrl: string): 'png' | 'jpeg' | 'gif' {
  if (dataUrl.includes('image/png')) return 'png'
  if (dataUrl.includes('image/gif')) return 'gif'
  return 'jpeg'
}

/** 将图片 URL 加载为 base64 */
async function fetchImageAsBase64(url: string): Promise<{ base64: string; extension: 'png' | 'jpeg' | 'gif' } | null> {
  try {
    // 如果已经是 data URL，直接返回
    if (url.startsWith('data:')) {
      return {
        base64: url.split(',')[1],
        extension: getExtensionFromDataUrl(url),
      }
    }
    // 否则 fetch 图片
    const response = await fetch(url)
    if (!response.ok) return null
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve({
          base64: result.split(',')[1],
          extension: getExtensionFromDataUrl(result),
        })
      }
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch (_e) {
    return null
  }
}

/** 构造型号名称 */
function buildModelName(selections: QuoteSelections): string {
  const loadNum = selections.load.replace(/[^0-9]/g, '')
  return `SN-PE-${loadNum}`
}

/** 构造层站格式 N/N/N */
function buildLandingFormat(selections: QuoteSelections): string {
  const floorCount = parseInt(selections.floors.match(/\d+/)?.[0] || '10')
  return `${floorCount}/${floorCount}/${floorCount}`
}

/** 翻译机房类型 */
function translateMachineRoom(machineRoom: string): string {
  if (machineRoom === '无机房') return 'Machine Room Less'
  return 'Machine Room'
}

/** 翻译开门方式 */
function translateDoorOpening(doorOpening: string): string {
  const map: Record<string, string> = {
    '中分': 'Centre Open',
    '旁开': 'Side Open',
    '旁开双折-左开': 'Side 2-fold Left Open',
    '旁开双折-右开': 'Side 2-fold Right Open',
    '中分双折': 'Centre 2-speed Open',
    '旁开三折-左开': 'Side 3-fold Left Open',
    '旁开三折-右开': 'Side 3-fold Right Open',
  }
  return map[doorOpening] || doorOpening
}

// ========== 主导出函数 ==========
export async function exportQuotationToExcel(data: ExportQuotationData): Promise<void> {
  const {
    projectName,
    selections,
    breakdown,
    cabinPreset,
    ceilingPreset,
    floorPreset,
    doorPreset,
    copPreset,
    lopPreset,
    copSubRemarks,
    lopSubRemarks,
  } = data

  // 1. 加载模板
  const templateUrl = `${window.location.origin}/templates/elevator-contract-template.xlsx`
  const response = await fetch(templateUrl)
  if (!response.ok) {
    throw new Error('无法加载Excel模板文件')
  }
  const arrayBuffer = await response.arrayBuffer()

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(arrayBuffer)

  // 获取工作表（遍历找到第一个有效工作表）
  let _ws = workbook.getWorksheet(1)
  if (!_ws) {
    // 尝试通过名称或遍历获取
    workbook.eachSheet((ws) => {
      if (!_ws) _ws = ws
    })
  }
  if (!_ws) {
    throw new Error('模板工作表不存在')
  }
  const worksheet = _ws

  // 2. 辅助函数：安全设置单元格值（仅修改值，保留格式和合并）
  const setCellValue = (row: number, col: number, value: string | number | Date) => {
    const cell = worksheet.getRow(row).getCell(col)
    cell.value = value
  }

  const model = buildModelName(selections)
  const today = new Date()

  // ==========================================
  // 3. 填充数据（行号基于模板分析结果）
  // ==========================================

  // --- Row 3: Project name & Date ---
  setCellValue(3, 5, projectName || '')      // E3 (merged E3:F3)
  setCellValue(3, 9, today)                   // I3 (merged I3:K3) - 日期

  // --- General information (Row 5-7) ---
  setCellValue(5, 5, 'Passenger LIFT')        // E5: 电梯类型
  setCellValue(6, 5, model)                   // E6: 型号
  setCellValue(7, 5, '1 Unit')               // E7: 数量

  // --- QUOTATION (Row 9-13) ---
  setCellValue(9, 5, model)                   // E9: 货物描述
  setCellValue(10, 5, breakdown.total)        // E10: Unit Price(FOB) = 总价
  // Row 11: Freight by Sea(LCL) 保持 0
  // Row 12: Freight by Sea(container) 保持 0
  setCellValue(13, 5, breakdown.total)        // E13: Total Price

  // --- Part A: Main Parameter (Row 20-31) ---
  setCellValue(20, 5, projectName || model)   // E20: Project Name
  setCellValue(21, 5, breakdown.total)        // E21: Unit Price(FOB)
  setCellValue(22, 5, 'Passenger Lift')       // E22: Elevator Type
  setCellValue(23, 5, translateMachineRoom(selections.machineRoom)) // E23: Machine Room
  setCellValue(24, 5, selections.speed)       // E24: Quantity (模板示例值为速度)
  setCellValue(25, 5, selections.load)        // E25: Load Capacity
  setCellValue(26, 5, selections.traction)    // E26: Machine type (曳引机)
  setCellValue(27, 5, selections.speed)       // E27: Speed
  setCellValue(28, 5, buildLandingFormat(selections)) // E28: Landing/Station/Door
  setCellValue(29, 5, selections.controller)  // E29: Control system
  setCellValue(30, 5, selections.doorMachine) // E30: Door Operator
  setCellValue(31, 5, translateDoorOpening(selections.doorOpening)) // E31: Door Opening Way

  // --- Part B: Cabin (Row 35-45) ---
  setCellValue(35, 5, cabinPreset?.label || '') // E35: Decoration Type
  setCellValue(37, 5, selections.wallFront)     // E37: Front Wall
  setCellValue(38, 5, selections.wallLeft)      // E38: Left Side Wall
  setCellValue(39, 5, selections.wallRight)     // E39: Right Side Wall
  setCellValue(40, 5, selections.wallBack)      // E40: Back Wall
  setCellValue(44, 5, ceilingPreset?.label || '跟随轿厢默认') // E44: Ceiling
  setCellValue(45, 5, floorPreset?.label || '跟随轿厢默认')   // E45: Floors

  // --- Part B: Landing Door (Row 48-52) ---
  setCellValue(48, 5, doorPreset?.hallDoorBase || selections.hallDoorMaterial)   // E48: Ground Floor
  setCellValue(49, 5, doorPreset?.hallDoorOther || selections.hallDoorMaterial)  // E49: Other Floor
  setCellValue(51, 5, doorPreset?.doorFrameBase || '')   // E51: Jamb Ground Floor
  setCellValue(52, 5, doorPreset?.doorFrameOther || '')  // E52: Jamb Other Floor

  // --- Row 53-54: 自定义需求备注 ---
  if (selections.cabinRemarks) {
    setCellValue(53, 5, selections.cabinRemarks) // E53: 轿顶自定义需求
  }
  if (selections.doorRemarks) {
    setCellValue(54, 5, selections.doorRemarks) // E54: 门厅自定义需求
  }

  // --- Part C: COP/LOP (Row 58-65) ---
  setCellValue(58, 5, copPreset?.label || '')     // E58: COP Type
  setCellValue(59, 5, selections.display)         // E59: COP Display Board
  setCellValue(60, 5, copSubRemarks || '')        // E60: COP Display Content
  setCellValue(62, 5, lopPreset?.label || '')     // E62: LOP Type
  setCellValue(63, 5, selections.display)         // E63: LOP Display Board (同一个显示器)
  setCellValue(64, 5, lopSubRemarks || '')        // E64: LOP Display Content
  setCellValue(65, 5, selections.callBoxStyle)    // E65: 召唤盒

  // --- Row 67: 装潢补充需求 ---
  if (selections.displayRemarks) {
    setCellValue(67, 5, selections.displayRemarks)
  }

  // --- IV. Optional (Row 69-72) ---
  const optionals = selections.optionals || []
  // CCTV
  setCellValue(69, 5, optionals.includes('轿厢监控 CCTV') ? '✅' : '')
  // IC卡
  setCellValue(70, 5, optionals.includes('IC卡') ? '✅' : '')
  // ARD (Row 71, Col F)
  setCellValue(71, 6, optionals.includes('停电应急装置 ARD') ? '                    ✅' : '')
  // 备注 (Row 72, Col G)
  if (selections.remarks) {
    setCellValue(72, 7, selections.remarks)
  }

  // ==========================================
  // 4. 嵌入图片
  // ==========================================

  // 清除模板中的 DISPIMG 公式（Row 73-74）
  for (let c = 1; c <= 11; c++) {
    const cell73 = worksheet.getRow(73).getCell(c)
    if (typeof cell73.value === 'string' && cell73.value.includes('DISPIMG')) {
      cell73.value = ''
    }
    const cell74 = worksheet.getRow(74).getCell(c)
    if (typeof cell74.value === 'string' && cell74.value.includes('DISPIMG')) {
      cell74.value = ''
    }
  }

  // 辅助函数：添加图片到工作表（使用字符串范围格式）
  const colLetter = (col: number) => {
    // 0-based: 0=A, 1=B, ...
    return String.fromCharCode(65 + col)
  }
  const addImageToSheet = async (
    imageUrl: string,
    tl: { col: number; row: number },
    br: { col: number; row: number },
  ) => {
    const imgData = await fetchImageAsBase64(imageUrl)
    if (!imgData) return
    const imageId = workbook.addImage({
      base64: imgData.base64,
      extension: imgData.extension,
    })
    // 使用字符串范围格式避免类型问题
    const range = `${colLetter(tl.col)}${tl.row + 1}:${colLetter(br.col - 1)}${br.row}`
    worksheet.addImage(imageId, range)
  }

  // 轿厢预设图片 → 右侧参考图区域 (I35:K45 区域，约 col 8-11, row 34-45)
  if (cabinPreset?.image) {
    await addImageToSheet(cabinPreset.image, { col: 8, row: 34 }, { col: 11, row: 44 })
  }

  // 门厅预设图片 → 右侧参考图区域 (I47:K52 区域，约 col 8-11, row 46-52)
  if (doorPreset?.image) {
    await addImageToSheet(doorPreset.image, { col: 8, row: 46 }, { col: 11, row: 52 })
  }

  // COP 预设图片 → 右侧参考图区域 (I58:K64 区域)
  if (copPreset?.image) {
    await addImageToSheet(copPreset.image, { col: 8, row: 57 }, { col: 11, row: 61 })
  }

  // LOP 预设图片 → COP下方区域
  if (lopPreset?.image) {
    await addImageToSheet(lopPreset.image, { col: 8, row: 61 }, { col: 11, row: 65 })
  }

  // 用户上传的轿厢参考图片 → A73:E74 区域
  if (selections.cabinRefImages && selections.cabinRefImages.length > 0) {
    const img = selections.cabinRefImages[0]
    if (img.startsWith('data:')) {
      await addImageToSheet(img, { col: 0, row: 72 }, { col: 5, row: 74 })
    }
  }

  // 用户上传的门厅参考图片 → F73:K73 区域
  if (selections.doorRefImages && selections.doorRefImages.length > 0) {
    const img = selections.doorRefImages[0]
    if (img.startsWith('data:')) {
      await addImageToSheet(img, { col: 5, row: 72 }, { col: 11, row: 74 })
    }
  }

  // ==========================================
  // 5. 导出文件
  // ==========================================
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const fileName = `电梯报价单_${projectName || '未命名'}_${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}.xlsx`
  saveAs(blob, fileName)
}
