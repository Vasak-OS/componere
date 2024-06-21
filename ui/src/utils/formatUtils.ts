import type { DiskConfig, Partition } from '@/types/InstallationConfig';
import type { VSK } from '@/types/VSK';
import { getDisks } from './vasakFunctions';
import type { VSKDisk } from '@/types/VSKDisk';

export const formatDisk = async (disk: DiskConfig, vsk: VSK): Promise<DiskConfig> => {
  await vsk.setDisk(disk.device_modifications[0].device);
  for (const device of disk.device_modifications[0].partitions) {
    await createPartition(device, vsk);
  }
  const newDisk: VSKDisk = (await getDisks(vsk)).find(
    (d) => d.path === disk.device_modifications[0].device
  ) as VSKDisk;

  return updateConfig(disk, newDisk);
};

const createPartition = async (device: Partition, vsk: VSK): Promise<void> => {
  if (device.status === 'create') {
    switch (device.mountpoint) {
      case '/':
        await vsk.createRootPartition(
          mbToSectors(device.start.value),
          mbToSectors(device.size.value)
        );
        break;
      case '/home':
        await vsk.createHomePartition(
          mbToSectors(device.start.value),
          mbToSectors(device.size.value)
        );
        break;
      case 'swap':
        await vsk.createSwapPartition(
          mbToSectors(device.start.value),
          mbToSectors(device.size.value)
        );
        break;
      case '/boot':
        await vsk.createUEFIBootPartition(
          mbToSectors(device.start.value),
          mbToSectors(device.size.value)
        );
        break;
    }
  }
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

const mbToSectors = (mb: number): number => {
  return mb * 2048;
};
