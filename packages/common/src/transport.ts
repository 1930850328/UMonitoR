import { _Umoni } from "./global";
import handleException from "./handleException";

class Transport {
  constructor() {}
  send(data: any) {
    console.log("send", data);
  }
}
if (!_Umoni.transport) {
  _Umoni.transport = new Transport();
}
