import parted
import json

class ComponerePartitionManager:
  def __init__(self):
    device = None
    disk = None
  
  def setDisk(self, disk):
    self.device = parted.getDevice(disk)
  
  def createPartitionList(self):
    self.disk = parted.freshDisk(self.device, "msdos")

  def createUEFIBootPartition(self, start, end):
    geometry = parted.Geometry(self.device, start, None, end)
    part = parted.Partition(self.disk, parted.PARTITION_BOOT, parted.FileSystem("fat32", geometry), geometry)
    part.setFlag(parted.PARTITION_BOOT)
    self.disk.addPartition(partition=part, constraint=self.device.optimalAlignedConstraint)
    self.disk.commit()

  def createLegacyBootPartition(self, start, end):
    geometry = parted.Geometry(self.device, start, None, end)
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.FileSystem("ext4", geometry), geometry)
    part.setFlag(parted.PARTITION_BOOT)
    self.disk.addPartition(partition=part, constraint=self.device.optimalAlignedConstraint)
    self.disk.commit()

  def createSwapPartition(self, start, end):
    geometry = parted.Geometry(self.device, start, None, end)
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.FileSystem("swap", geometry), geometry)
    part.setFlag(parted.PARTITION_SWAP)
    self.disk.addPartition(partition=part, constraint=self.device.optimalAlignedConstraint)
    self.disk.commit()
  
  def createExt4Partition(self, start, end):
    geometry = parted.Geometry(self.device, start, None, end)
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.FileSystem("ext4", geometry), geometry)
    self.disk.addPartition(partition=part, constraint=self.device.optimalAlignedConstraint)
    self.disk.commit()

  def wipeDisk(self):
    self.disk.deleteAllPartitions()
    self.disk.commit()
  
  def mbToSectors(self, mb):
    # 1 MB = 1000000 bytes = 1000000 / sectorSize sectors
    return mb * 1000000 / self.device.sectorSize

if __name__ == "__main__":
  partitionManager = ComponerePartitionManager()
  configFile = open("/tmp/config.json", "r")
  config = json.load(configFile)

  for device in config["disk_config"]["device_modifications"]:
    partitionManager.setDisk(device["device"])
    partitionManager.createPartitionList()

    for partition in device["partitions"]:
      if partition["fs_type"] == "fat32": 
        switcherPartitionType = {
          "/boot": partitionManager.createUEFIBootPartition,
          "swap": partitionManager.createSwapPartition,
          "/": partitionManager.createExt4Partition,
          "/home": partitionManager.createExt4Partition
        }
      else:
        switcherPartitionType = {
          "/boot": partitionManager.createLegacyBootPartition,
          "swap": partitionManager.createSwapPartition,
          "/": partitionManager.createExt4Partition,
          "/home": partitionManager.createExt4Partition
        }

      start = int(partitionManager.mbToSectors(int(partition["start"]["value"])))
      end = int(partitionManager.mbToSectors(int(partition["size"]["value"]) + start))

      switcherPartitionType[partition["mountpoint"]](start, end)

      partitionManager.wipeDisk()

  configFile.close()