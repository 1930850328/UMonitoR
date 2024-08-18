import { EVENTTYPES } from "@u-moni/types";
import { getFlag } from "../global";
import { getUniqueId } from "../utils";

export function addSign(data: any, sdkType: string) {
  data.id = getUniqueId();
  data.sdkName = getFlag(`${EVENTTYPES.ERROR}SdkName`);
  data.sdkVersion = getFlag(`${EVENTTYPES.ERROR}SdkVersion`);
  data.sdkType = sdkType;
  return data;
}
