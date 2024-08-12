// 处理异常
export default function handleException(fn: Function, errfn?: Function): void {
  try {
    fn();
  } catch (e) {
    errfn && errfn(e);
  }
}
