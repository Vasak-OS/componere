import type { BootLoader, Partition, FileSystemType, DiskFlags } from '../types/InstallationConfig';

export const calculatePercentage = (used: number, total: number): number => {
  return Math.round((used / total) * 100);
};

export const calculateUnit = (size: number): string => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let iterator = 0,
    diskSize = size;

  while (diskSize >= 1024 && ++iterator) {
    diskSize = diskSize / 1024;
  }

  return diskSize.toFixed(diskSize < 10 && iterator > 0 ? 1 : 0) + ' ' + units[iterator];
};

export const bytesToMB = (bytes: number): number => {
  return bytes / 1024 / 1024;
};

export const getBootLoaderPartitionData = (bootloader: BootLoader): Partition => {
  //TODO: Usar getPrimaryPartitionData
  if (bootloader === 'grub') {
    return getPrimaryPartitionData('Boot', 'ext4', 512, 0);
  }
  return getPrimaryPartitionData('Boot', 'fat32', 512, 0);
};

export const getPrimaryPartitionData = (
  name: string,
  fsType: string,
  size: number,
  start: number
): Partition => {
  return {
    btrfs: [],
    flags: [name as DiskFlags],
    fs_type: fsType as FileSystemType,
    length: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: size
    },
    mount_options: [],
    mountpoint: null,
    obj_id: '',
    start: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: start
    },
    status: 'create',
    type: 'primary'
  };
};

export const presetDiskPartition = (
  bootloader: BootLoader,
  swapSize: number,
  diskSize: number
): Array<Partition> => {
  const partitions: Array<Partition> = [];
  partitions.push(getBootLoaderPartitionData(bootloader));
  const rootSize = diskSize - 512 - swapSize;
  partitions.push(getPrimaryPartitionData('Root', 'ext4', rootSize, 512));
  if (swapSize > 0) {
    partitions.push(getPrimaryPartitionData('Swap', 'swap', swapSize, rootSize + 512));
  }

  return partitions;
};

export const calcuclateSwapSize = (memory: number): number => {
  if (memory < 2048) {
    return memory * 2;
  } else if (memory < 8192) {
    return memory;
  } else {
    return memory / 2;
  }
};
