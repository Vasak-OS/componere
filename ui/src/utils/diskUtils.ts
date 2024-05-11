import type { VSKDiskPartition } from '../types/VSKDisk';
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
    return getPrimaryPartitionData({ name: 'Boot', fsType: 'ext4', size: 512, start: 0 });
  }
  return getPrimaryPartitionData({ name: 'Boot', fsType: 'fat32', size: 512, start: 0 });
};

export const getPrimaryPartitionData = (partitionData: {
  name: string;
  fsType: string;
  size: number;
  start: number;
}): Partition => {
  return {
    btrfs: [],
    flags: [partitionData.name as DiskFlags],
    fs_type: partitionData.fsType as FileSystemType,
    length: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: partitionData.size
    },
    mount_options: [],
    mountpoint: null,
    obj_id: '',
    start: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: partitionData.start
    },
    status: 'create',
    type: 'primary'
  };
};

export const presetDiskPartition = (partitionData: {
  bootloader: BootLoader;
  swapSize: number;
  diskSize: number;
}): Array<Partition> => {
  const partitions: Array<Partition> = [];
  partitions.push(getBootLoaderPartitionData(partitionData.bootloader));
  const rootSize = partitionData.diskSize - 512 - partitionData.swapSize;
  partitions.push(
    getPrimaryPartitionData({ name: 'Root', fsType: 'ext4', size: rootSize, start: 512 })
  );
  if (partitionData.swapSize > 0) {
    partitions.push(
      getPrimaryPartitionData({
        name: 'Swap',
        fsType: 'swap',
        size: partitionData.swapSize,
        start: rootSize + 512
      })
    );
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

export const vskDiskPartitionDTO = (partition: Partition): VSKDiskPartition => {
  return {
    path: partition.mountpoint,
    size: partition.length.value * 1024 * 1024,
    name: partition.obj_id,
    offset: partition.start.value,
    type: partition.type,
    label: partition.flags[0],
    fsType: partition.fs_type.toString(),
    fsVersion: '',
    fsLabel: '',
    fsUuid: '',
    fsSize: 0,
    fsUsed: 0,
    fsFreeSize: 0
  } as unknown as VSKDiskPartition;
};
