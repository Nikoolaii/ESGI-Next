type Listener = () => void;

export function createLocalStorageStore<T>(key: string, eventName: string) {
  const EMPTY = [] as unknown as T[];
  let cachedRaw: string | null | undefined;
  let cachedSnapshot: T[] = EMPTY;
  const listeners = new Set<Listener>();

  function readRaw(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  }

  function getSnapshot(): T[] {
    if (typeof window === "undefined") return EMPTY;

    const raw = readRaw();
    if (raw === cachedRaw) return cachedSnapshot;

    cachedRaw = raw;
    if (!raw) {
      cachedSnapshot = EMPTY;
      return cachedSnapshot;
    }

    try {
      cachedSnapshot = JSON.parse(raw) as T[];
    } catch {
      cachedSnapshot = EMPTY;
    }
    return cachedSnapshot;
  }

  function invalidateCache() {
    cachedRaw = undefined;
  }

  function emitChange() {
    invalidateCache();
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);

    function onStorage(event: StorageEvent) {
      if (event.key === key || event.key === null) emitChange();
    }

    function onCustomEvent() {
      emitChange();
    }

    window.addEventListener(eventName, onCustomEvent);
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener(eventName, onCustomEvent);
      window.removeEventListener("storage", onStorage);
    };
  }

  function write(next: T[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(next));
    emitChange();
  }

  function remove() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
    emitChange();
  }

  return { getSnapshot, subscribe, write, remove, getServerSnapshot: () => EMPTY };
}
