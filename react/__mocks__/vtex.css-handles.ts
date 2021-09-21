export const useCssHandles = (cssHandles: string[]) => {
  const handles = {} as any

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })

  return { handles }
}
