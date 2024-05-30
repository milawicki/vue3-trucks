import { useAppStore } from "@/stores/app";
import { useNotificationStore } from "@/stores/notification";

export function useApi() {
  const { setLoading } = useAppStore();
  const { addErrorNotification } = useNotificationStore();

  async function handleApiCall<TResult>(callback: () => Promise<TResult>) {
    try {
      setLoading(true);

      return await callback();
    } catch (error) {
      addErrorNotification((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    handleApiCall,
  };
}
