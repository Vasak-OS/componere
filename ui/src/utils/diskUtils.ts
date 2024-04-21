export const calculatePercentage = (used: number, total: number) => {
  return Math.round((used / total) * 100);
};

export const calculateUnit = (size: number) => {
   const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

   let iterator = 0,
     diskSize = size;

   while (diskSize >= 1024 && ++iterator) {
     diskSize = diskSize / 1024;
   }

   return diskSize.toFixed(diskSize < 10 && iterator > 0 ? 1 : 0) + ' ' + units[iterator];
};