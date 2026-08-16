const EVENT = "sd:spy";

export function dispatchSpy(target: string | null) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: target }));
}

export function onSpy(callback: (target: string | null) => void) {
  const handler = (e: Event) => callback((e as CustomEvent<string | null>).detail ?? null);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
