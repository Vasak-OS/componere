import type { DiskConfig, Partition } from '@/types/InstallationConfig';
import type { VSK } from '@/types/VSK';
import { getDisks } from './vasakFunctions';
import type { VSKDisk } from '@/types/VSKDisk';

export const formatDisk = async (disk: DiskConfig, vsk: VSK): Promise<DiskConfig> => {
  await vsk.generatePartitions();
  const newDisk: VSKDisk = (await getDisks(vsk)).find(
    (d) => d.path === disk.device_modifications[0].device
  ) as VSKDisk;

  return updateConfig(disk, newDisk);
};

const updateConfig = (disk: DiskConfig, newDisk: VSKDisk): DiskConfig => {
  const updatedDisk: DiskConfig = disk;
  updatedDisk.device_modifications[0].device = newDisk.path;
  for (let i = 0; i < updatedDisk.device_modifications[0].partitions.length; i++) {
    const newPartitionData = newDisk.partition.list.find(
      (p) => p.size === updatedDisk.device_modifications[0].partitions[i].size.value
    );
    updatedDisk.device_modifications[0].partitions[i].dev_path = newPartitionData?.path as string;
    updatedDisk.device_modifications[0].partitions[i].obj_id = newPartitionData?.deviceId as string;
  }
  return updatedDisk;
};
