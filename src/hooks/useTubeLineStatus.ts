import { useQuery } from "@tanstack/react-query";
import type { TflLineResponse } from "../types";
import { fetchTubeLineStatus } from "../services";




interface UseTubeLineStatusOptions {
    refetchInterval?:number;
    enabled?:boolean
}

  /**
   * Hook to fetch and manage TFL tube line status data
   * @returns {Object} Query result with data, loading, and error states
   * - Updates every 60 seconds
   * - Always fetches fresh data (no cache)
   * - Refetches on window focus and network reconnect
   */
export const useTubeLineStatus = (options:UseTubeLineStatusOptions={})=>{
const {refetchInterval = 60 * 1000,enabled=true} = options
    return useQuery<TflLineResponse[]>({
        queryKey: ["tfl-lines"],
        enabled,
        queryFn: fetchTubeLineStatus,
        staleTime:0,
        refetchInterval,
        refetchOnWindowFocus:true,
        retry:3,
        retryDelay:(attemptIndex)=>Math.min(1000 * 2 ** attemptIndex,30000),
        refetchOnReconnect:true
      });
    
}