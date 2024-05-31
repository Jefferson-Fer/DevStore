import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-zinc-50/10', className)}
      {...props}
    />
  )
}

export default Skeleton
