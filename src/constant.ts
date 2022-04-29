export const robotType = ["U1 紫外线消毒机", "U2 紫外线空气消毒机", "U3 瘦头陀喷雾消毒机", "U3 胖头陀高喷雾消毒机", "TR1 配送机器人", "TR2 配送机器人"];

export const robotModel = ["U1", "U2", "U3", "TR1", "TR2", "U3 pro"]
interface RobotStatus {
  [key: string]: string,
}
export const robotStatus: RobotStatus = {
  "1": "在线",
  "2": "离线",
  "3": "充电中",
  "4": "消毒中"
}

export const taskType = ["定点消毒", "任务完成自动回充", "途经某点(不消毒只经过)", "充电", "刚开始任务时，前往某点", "边走边杀", "检测到人", "导航到某点失败", "任务过程中去回充", "路径消毒", "返航", "开门", "关门"];