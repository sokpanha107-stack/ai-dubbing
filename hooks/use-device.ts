"use client"

import { useState, useEffect } from "react"

export interface DeviceInfo {
  deviceType: "mobile" | "tablet" | "desktop"
  os: "iOS" | "Android" | "macOS" | "Windows" | "Unknown"
  modelName: string
  browser: string
  isStandalone: boolean
}

export function useDevice(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    deviceType: "desktop",
    os: "Unknown",
    modelName: "កំពុងវិភាគ...",
    browser: "Unknown",
    isStandalone: false,
  })

  useEffect(() => {
    const ua = navigator.userAgent
    const width = window.screen.width
    const height = window.screen.height
    const ratio = window.devicePixelRatio || 1

    let os: DeviceInfo["os"] = "Unknown"
    let modelName = "ឧបករណ៍មិនស្គាល់"
    let deviceType: DeviceInfo["deviceType"] = "desktop"

    if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
      os = "iOS"
      deviceType = /iPad/.test(ua) ? "tablet" : "mobile"

      const w = Math.min(width, height)
      const h = Math.max(width, height)

      // គណនាស្វែងរកម៉ូឌែល iPhone
      if (w === 390 && h === 844 && ratio === 3) modelName = "iPhone 13 / 14"
      else if (w === 428 && h === 926) modelName = "iPhone 13 Pro Max / 14 Plus"
      else if (w === 393 && h === 852) modelName = "iPhone 14 Pro / 15 / 16"
      else if (w === 430 && h === 932) modelName = "iPhone 15 Pro Max / 16 Plus"
      else modelName = "Apple iPhone"
    } 
    else if (/Android/.test(ua)) {
      os = "Android"
      deviceType = /Mobile/.test(ua) ? "mobile" : "tablet"
      const match = ua.match(/Android.*;\s*([^;]+)\s*Build/i)
      modelName = match ? match[1].trim() : "Android Phone"
    } 
    else if (/Macintosh|Mac OS X/.test(ua)) {
      os = "macOS"
      deviceType = "desktop"
      modelName = "Apple Mac"
    } 
    else if (/Windows NT/.test(ua)) {
      os = "Windows"
      deviceType = "desktop"
      modelName = "Windows PC"
    }

    let browser = "Browser"
    if (/Chrome/.test(ua) && !/Edg/.test(ua)) browser = "Google Chrome"
    else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = "Apple Safari"
    else if (/Edg/.test(ua)) browser = "Microsoft Edge"
    else if (/Firefox/.test(ua)) browser = "Mozilla Firefox"

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as any).standalone)

    setInfo({ deviceType, os, modelName, browser, isStandalone })
  }, [])

  return info
}

