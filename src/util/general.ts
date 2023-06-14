export function debounce(func: any, timeout = 300) {
  let timer: number | undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    // @ts-expect-error
    timer = setTimeout(() => {
      // @ts-expect-error
      func.apply(this, args);
    }, timeout);
  };
}
