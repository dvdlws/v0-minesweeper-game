"use client"

import { useEffect } from "react"

export default function AdsenseAd({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = "true",
}: {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: string
}) {
  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3252021796682458"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  )
}
