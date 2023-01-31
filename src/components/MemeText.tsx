import React, { useState, PointerEvent, CSSProperties } from 'react'

export interface MemeTextProps {
  primaryColor: string,
  shadowColor: string,
  memeText: string,
  css?: CSSProperties,
  onPointerDown?: (e: PointerEvent<HTMLParagraphElement>) => void,
  onPointerMove?: (e: PointerEvent<HTMLParagraphElement>) => void,
  bb?: BoundingBox
}

export class BoundingBox {
  left: number = 0;
  top: number = 0;
  width: number = 100;
  height: number = 50;
}

export default function MemeText({ primaryColor, shadowColor, memeText, css, onPointerDown, onPointerMove, bb }: MemeTextProps) {
  return (
    <p
      style={{
        position: "absolute",
        fontSize: "3rem",
        color: primaryColor,
        textAlign: "center",
        inset: "0",
        textShadow: `0 2px 2px ${shadowColor}, 0 -2px 2px ${shadowColor}, 2px 0 2px ${shadowColor}, -2px 0 2px ${shadowColor}`,
        left: bb?.left,
        top: bb?.top,
        height: bb?.height,
        width: bb?.width,
        overflow: 'hidden',
        margin: 0,
        ...css
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      {memeText}
    </p>
  )
}
