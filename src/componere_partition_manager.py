import parted

class ComponerePartitionManager:
  def __init__(self):
    partitionType = "msdos"
    device = None
    disk = None
  
  def setDisk(self, disk):
    self.device = parted.getDevice(disk)
  
  def createPartitionList(self):
    self.disk = parted.freshDisk(self.device, self.partitionType)
    self.disk.commitToDisk(parted.PARTITION_TABLE_MBR                                                                )
  
  def createUEFIBootPartition(self, start, end):
    part = parted.Partition(self.disk, parted.PARTITION_BOOT, parted.fsType("fat32"), start, end)
    part.setFlag(parted.PARTITION_BOOT)
    self.disk.addPartition(part)
    self.disk.commit()

  def createLegacyBootPartition(self, start, end):
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.fsType("ext4"), start, end)
    part.setFlag(parted.PARTITION_BOOT)
    self.disk.addPartition(part)
    self.disk.commit()

  def createSwapPartition(self, start, end):
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.fsType("swap"), start, end)
    part.setFlag(parted.PARTITION_SWAP)
    self.disk.addPartition(part)
    self.disk.commit()
  
  def createRootPartition(self, start, end):
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.fsType("ext4"), start, end)
    part.setFlag(parted.PARTITION_ROOT)
    part.set_name("VasakOS")
    self.disk.addPartition(part)
    self.disk.commit()

  def createHomePartition(self, start, end):
    part = parted.Partition(self.disk, parted.PARTITION_NORMAL, parted.fsType("ext4"), start, end)
    part.setFlag(parted.PARTITION_HOME)
    part.set_name("VasakOSHome")
    self.disk.addPartition(part)
    self.disk.commit()

  def wipeDisk(self):
    self.disk.deleteAllPartitions()
    self.disk.commit()
