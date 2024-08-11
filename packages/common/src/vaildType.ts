function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

export function vaildType(key: string, value: any, type: string): any {
  if (!value) return false;
  if (getType(value) === type) return true;
  console.error(
    `Umoni: ${key}期望传入${type}类型，目前是${getType(value)}类型`,
  );
}
