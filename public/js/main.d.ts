/* eslint-disable no-var */

interface MainJS {
  sleep(ms: number): Promise<void>
  randRange(min: number, max: number): number
  appendStyle(css: string): void
}

declare module globalThis {
  var MainJS: MainJS
}
