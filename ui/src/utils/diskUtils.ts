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

export const getBootLoaderPartitionData = (bootloader: BootLoader, path: string): Partition =>
  getPrimaryPartitionData({
    name: 'Boot',
    fsType: bootloader === 'grub' ? 'ext4' : 'fat32',
    size: 513,
    start: 1,
    path: path.concat('1')
  });

export const getPrimaryPartitionData = (partitionData: {
  name: string;
  fsType: string;
  size: number;
  start: number;
  path: string;
}): Partition => {
  return {
    btrfs: [],
    flags: (partitionData.name as DiskFlags) == 'Boot' ? [partitionData.name as DiskFlags] : [],
    fs_type: partitionData.fsType as FileSystemType,
    dev_path: partitionData.path,
    size: {
      sector_size: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: partitionData.size
      },
      total_size: null,
      unit: 'MB',
      value: partitionData.size
    },
    mount_options: [],
    mountpoint: mountPoint(partitionData.name),
    obj_id: null,
    start: {
      sector_size: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: partitionData.start
      },
      total_size: null,
      unit: 'MB',
      value: partitionData.start
    },
    status: 'create',
    type: 'primary'
  } as Partition;
};

const mountPoint = (flag: string): string => {
  switch (flag) {
    case 'Boot':
      return '/boot';
    case 'Root':
      return '/';
    case 'Swap':
      return 'swap';
    default:
      return '';
  }
};

export const presetDiskPartition = (partitionData: {
  bootloader: BootLoader;
  swapSize: number;
  diskSize: number;
  path: string;
}): Array<Partition> => {
  const partitions: Array<Partition> = [];
  partitions.push(getBootLoaderPartitionData(partitionData.bootloader, partitionData.path));
  const rootSize = partitionData.diskSize - 513 - partitionData.swapSize;
  partitions.push(
    getPrimaryPartitionData({
      name: 'Root',
      fsType: 'ext4',
      size: rootSize,
      start: 513,
      path: partitionData.path.concat('2')
    })
  );
  if (partitionData.swapSize > 0) {
    partitions.push(
      getPrimaryPartitionData({
        name: 'Swap',
        fsType: 'swap',
        size: partitionData.swapSize,
        start: rootSize + 513,
        path: partitionData.path.concat('3')
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
    size: partition.size.value * 1024 * 1024,
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
