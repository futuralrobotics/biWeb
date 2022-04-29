export const getDataType = (data: string): string => Object.prototype.toString.call(data).slice(8, -1);

export function generateUUID(len?: number, radix?: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid: any = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

export function transformTime(num: number, returnArray?: boolean) {

  let value = Math.floor(num / 1000);

  const timeType = ["天", "小时", "分钟", "秒"];

  let i = 3;

  // const timeType = [24, 60, 60, 60];

  const result = [];

  console.log(value)


  while ((i === 1 && value > 23) || (i > 1 && value > 60) && i > 0) {
    let unit = i < 2 ? 24 : 60;
    let num = value % unit;
    value = Math.floor(value / unit);
    result.unshift({
      type: timeType[i],
      num
    });
    i--
  }

  result.unshift({
    type: timeType[i],
    num: value
  });

  return returnArray ? result : result.map(item => item.num + item.type).join("");

}