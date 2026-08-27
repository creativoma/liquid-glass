import { FC, useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from './Icons'

interface CopyButtonProps {
  text: string
  className?: string
  size?: number
}

const CopyButton: FC<CopyButtonProps> = ({ text, className = '', size }) => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number>(undefined)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (permissions/insecure context) — nothing to do
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className={`rounded-lg p-2 transition-all hover:scale-95 hover:bg-white/10 active:scale-90 ${
        copied ? 'text-green-400' : 'text-white/50 hover:text-white'
      } ${className}`}
    >
      {copied ? <CheckIcon size={size} /> : <CopyIcon size={size} />}
    </button>
  )
}

export default CopyButton
