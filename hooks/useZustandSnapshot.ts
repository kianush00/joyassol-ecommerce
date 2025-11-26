import { useSyncExternalStore } from "react";
import useCartStore from "@/store";

export function useZustandSnapshot<T>(
  selector: (state: ReturnType<typeof useCartStore.getState>) => T,
  serverSnapshot: T
) {
  const getSnapshot = () => selector(useCartStore.getState());
  const getServer = () => serverSnapshot;

  return useSyncExternalStore(useCartStore.subscribe, getSnapshot, getServer);
}
