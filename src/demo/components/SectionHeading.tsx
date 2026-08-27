import { FC, ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}

const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
}) => (
  <Reveal className="mb-10 sm:mb-14">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--color-electric-purple)/25 bg-black/30 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-(--color-electric-purple) uppercase backdrop-blur-sm sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-(--color-electric-purple)" />
      {eyebrow}
    </div>
    <h2 className="font-display max-w-2xl text-4xl leading-[1.05] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
        {description}
      </p>
    )}
  </Reveal>
)

export default SectionHeading
