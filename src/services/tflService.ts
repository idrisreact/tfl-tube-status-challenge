import { CONFIG } from "../config/constants";
import type { TflLineResponse } from "../types";


export const fetchTubeLineStatus = async():Promise<TflLineResponse[]>=>{


          const resp = await fetch(`${CONFIG.API.TFL_BASE_URL}/Line/Mode/Tube/Status`,{
            signal:AbortSignal.timeout(CONFIG.API.TIMEOUT)
          });
          if (!resp.ok) {
            throw new Error(`TFL API Error ${resp.status} ${resp.statusText}`);
          }
          return await resp.json();
        

}