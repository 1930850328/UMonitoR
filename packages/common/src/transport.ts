import { _Umoni, getOptionFlag, global } from "./global";
import handleException from "./handleException";

class Transport {
  dsn: string;
  constructor() {
    this.dsn = "";
  }
  send(data: any) {
    console.log("send", data);
    this.dsn = getOptionFlag(`${data.type}Dsn`);
    const reportData = this.addCommonData(data);
    if (reportData) {
      // 优先使用sendBeacon 上报，若数据量大，再使用图片打点上报和fetch上报
      // 图片打点上报的优势：
      // 1）支持跨域，一般而言，上报域名都不是当前域名，上报的接口请求会构成跨域
      // 2）体积小且不需要插入dom中
      // 3）不需要等待服务器返回数据
      //
      // 图片打点缺点是：url受浏览器长度限制
      const value = this.sendByBeacon(this.dsn, reportData);
      if (!value) {
        return !("XMLHttpRequest" in global)
          ? this.sendByImg(this.dsn, reportData)
          : this.sendByXhr(this.dsn, reportData);
      }
    }
  }

  addCommonData(data: any) {
    const commonData = {
      appId: getOptionFlag(`${data.type}AppId`),
      url: document.location.href,
      userAgent: window.navigator.userAgent,
      title: document.title,
    };
    return Object.assign(data, commonData);
  }

  sendByBeacon(dsn: string, data: any): boolean {
    return navigator.sendBeacon(dsn, JSON.stringify(data));
  }

  sendByImg(dsn: string, data: any) {
    const img = new Image();
    img.src = `${dsn}?data=${JSON.stringify(data)}`;
  }

  sendByXhr(dsn: string, data: any) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", dsn, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }
}
if (!_Umoni.transport) {
  _Umoni.transport = new Transport();
}
