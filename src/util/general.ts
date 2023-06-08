export function debounce(func: any, timeout = 300) {
  let timer: number | undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-expect-error
      func.apply(this, args);
    }, timeout);
  };
}
