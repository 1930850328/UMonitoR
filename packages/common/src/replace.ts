import { _Umoni, getOptionFlag } from "./global";
import { EVENTTYPES } from "@u-moni/types";

export function setupReplace() {
  getOptionFlag("isXhrPlugin") && addReplace("isXhrPlugin");
}

function addReplace(type: string) {
  switch (type) {
    case EVENTTYPES.WHITESCREEN:
      //   whiteScreen();
      break;
    case EVENTTYPES.XHR:
      //   xhrReplace();
      break;
    case EVENTTYPES.FETCH:
      //   fetchReplace();
      break;
    case EVENTTYPES.ERROR:
      //   listenError();
      break;
    case EVENTTYPES.HISTORY:
      //   historyReplace();
      break;
    case EVENTTYPES.UNHANDLEDREJECTION:
      //   unhandledrejectionReplace();
      break;
    case EVENTTYPES.CLICK:
      //   domReplace();
      break;
    case EVENTTYPES.HASHCHANGE:
      //   listenHashchange();
      break;
    default:
      break;
  }
}
