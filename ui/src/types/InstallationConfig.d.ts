export type InstallationConfig = {
  separator: any;
  'additional-repositories'?: Array<any>;
  'archinstall-language'?: string;
  audio_config?: any;
  bootloader: BootLoader;
  config_version: string;
  debug?: boolean;
  disk_config: DiskConfig;
  disk_encryption: {
    encryption_type: EncryptionType;
    partitions: Array<string>;
  };
  hostname: string;
  kernels: Array<KernelLinux>;
  locale_config: LocaleConfig;
  mirror_config: {
    custom_mirrors: Array<string>;
    mirror_regions: any;
  };
  network_config: any;
  no_pkg_lookups: boolean;
  ntp: boolean;
  offline: boolean;
  packages: Array<string>;
  'parallel downloads': number;
  profile_config: any;
  save_config: any;
  script: ScriptType;
  silent: boolean;
  swap: boolean;
  timezone: string;
  version: string;
};

export type InstallationUserConfig = {
  '!users': Array<User>;
};

export type BootLoader = 'Systemd-boot' | 'grub';

export type KernelLinux =
  | 'linux'
  | 'linux-lts'
  | 'linux-hardened'
  | 'linux-zen'
  | 'linux-rt'
  | 'linux-rt-lts';

export type User = {
  username: string;
  '!password': string;
  sudo: boolean;
};

export type ScriptType = 'guided' | 'minimal' | 'only_hdd' | 'swiss' | 'unattended';

export type EncryptionType = 'luks' | 'plain';

export type LocaleConfig = {
  kb_layout: string;
  sys_enc: string;
  sys_lang: string;
};

export type DiskConfig = {
  config_type: DiskConfigType;
  device_modifications: Array<DiskModificationConfig>;
};

export type DiskConfigType = 'manual_partitioning' | 'pre_mounted_config' | 'default_layout';

export type DiskModificationConfig = {
  device: string;
  partitions: Array<Partition>;
  wipe?: boolean;
};

export type Partition = {
  btrfs: Array<DiskMount>;
  dev_path?: any;
  flags: Array<DiskFlags>;
  fs_type: FileSystemType;
  length: DiskSectorSize;
  mount_options: Array<string>;
  mountpoint: any;
  obj_id: string;
  start: DiskSectorSize;
  status: DiskStatus;
  type: DiskType;
};

export type FileSystemType = 'ext4' | 'btrfs' | 'fat32' | 'swap';

export type DiskFlags = 'Boot' | 'Root' | 'Swap';

export type DiskType = 'primary' | 'extended' | 'logical';

export type DiskUnit = 'B' | 'MB' | 'GB' | 'TB' | 'sectors';

export type DiskSectorSize = {
  sector_size: DiskSectorSize | null;
  total_size: DiskSectorSize | null;
  unit: DiskUnit;
  value: number;
};

export type DiskMount = {
  mountpoint: string;
  name: string;
};

export type DiskStatus = 'create' | 'delete' | 'modify';
