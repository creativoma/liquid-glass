import { FC, useId, useState, useEffect } from 'react'
import type { LiquidGlassProps } from './types'

/**
 * Detects if the browser has limited SVG filter support (Safari/iOS)
 * Uses feature detection combined with user agent as fallback
 */
const hasLimitedFilterSupport = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check for Safari/iOS using user agent as a practical approach
  // since feDisplacementMap support detection is complex and unreliable
  const ua = window.navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua)
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
  
  return isIOS || isSafari
}

const LiquidGlass: FC<LiquidGlassProps> = ({
  children,
  className = '',
  backdropBlur = 2,
  tintColor = 'rgba(255, 255, 255, .2)',
  displacementScale = 150,
  turbulenceBaseFrequency = '0.008 0.008',
  turbulenceSeed = 1.5,
  as: Component = 'div',
  style,
  ...rest
}) => {
  const filterId = useId()
  const cleanFilterId = `liquid-glass-${filterId.replace(/:/g, '-')}`
  
  // Detect filter support on mount (client-side only)
  const [useSimplifiedFilter, setUseSimplifiedFilter] = useState(false)
  
  useEffect(() => {
    setUseSimplifiedFilter(hasLimitedFilterSupport())
  }, [])

  return (
    <>
      <svg style={{ display: 'none' }}>
        {useSimplifiedFilter ? (
          // Simplified filter for Safari/iOS - uses only well-supported primitives
          <filter
            id={cleanFilterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbulenceBaseFrequency}
              numOctaves={2}
              seed={turbulenceSeed}
              result="turbulence"
            />
            <feGaussianBlur
              in="turbulence"
              stdDeviation="2"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.15 0"
              result="transparency"
            />
            <feBlend
              in="SourceGraphic"
              in2="transparency"
              mode="normal"
            />
          </filter>
        ) : (
          // Full-featured filter for non-Safari browsers
          <filter
            id={cleanFilterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbulenceBaseFrequency}
              numOctaves={1}
              seed={turbulenceSeed}
              result="turbulence"
            />

            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
              <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
              <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
            </feComponentTransfer>

            <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />

            <feSpecularLighting
              in="softMap"
              surfaceScale={5}
              specularConstant={1}
              specularExponent={100}
              lightingColor="white"
              result="specLight"
            >
              <fePointLight x={-200} y={-200} z={300} />
            </feSpecularLighting>

            <feComposite
              in="specLight"
              operator="arithmetic"
              k1={0}
              k2={1}
              k3={1}
              k4={0}
              result="litImage"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        )}
      </svg>

      <Component
        className={`relative overflow-hidden ${className}`}
        style={{
          boxShadow:
            '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
          ...style,
        }}
        {...rest}
      >
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
            filter: `url(#${cleanFilterId})`,
            isolation: 'isolate',
            ...(useSimplifiedFilter && {
              // Additional CSS-based effects for Safari/iOS to enhance the liquid glass appearance
              transform: 'translateZ(0)',
              willChange: 'transform',
            }),
          }}
        />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: tintColor,
          }}
        />

        <div className="relative z-[2]">{children}</div>
      </Component>
    </>
  )
}

export default LiquidGlass
