import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function generateDataset(length: number): number[] {
  return Array.from({ length }, (_, i) => Math.random() * 100 * length)
}

export const numberComparisonFn = (a: number, b: number) => a - b
