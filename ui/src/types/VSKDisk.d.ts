export type VSKDisk = {
  name: string;
  deviceId: string;
  model: string;
  partition: {
    type: VSKPartitionType;
    list: Array<VSKDiskPartition>;
    uuid: string;
  };
  path: string;
  serial: string;
  size: number;
  type: VSKDisktype;
};

export type VSKPartitionType = 'gpt' | 'mbr' | unknown;

export type VSKDisktype = 'NVME' | 'HDD' | 'SSD' | 'LOOP' | unknown;

export type VSKDiskPartition = {
  path: string;
  name: string;
  size: number;
  offset: number;
  type: VSKPartitionType;
  number: number;
  deviceId: string;
  fsVersion: string;
  fsUuid: string;
  fsUsage: string;
  fsType: string;
  fsMountingPoint: string;
  fsLabel: string;
  fsFreeSize: number;
  uuid?: string;
  label?: string;
};