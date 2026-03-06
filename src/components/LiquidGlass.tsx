import { FC, useId } from 'react'
import type { LiquidGlassProps } from './types'
import { useBrowserDetection } from '../hooks/useBrowserDetection'

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
  const { useSimplifiedFilter } = useBrowserDetection()

  return (
    <>
      <svg style={{ display: 'none' }} suppressHydrationWarning>
        {useSimplifiedFilter ? (
          // Simplified filter for Safari/iOS - uses only well-supported primitives
          // Note: displacementScale has no effect in this filter path
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
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.15 0"
              result="transparency"
            />
            <feBlend in="SourceGraphic" in2="transparency" mode="normal" />
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
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
            filter: `url(#${cleanFilterId})`,
            isolation: 'isolate',
            ...(useSimplifiedFilter && {
              transform: 'translateZ(0)',
              willChange: 'transform',
            }),
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: tintColor,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      </Component>
    </>
  )
}

export default LiquidGlass
