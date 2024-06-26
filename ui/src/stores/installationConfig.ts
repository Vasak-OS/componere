import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  DiskConfig,
  InstallationConfig,
  InstallationUserConfig,
  User
} from '@/types/InstallationConfig';

export const installationConfigStore = defineStore('installationConfig', () => {
  const config: Ref<InstallationConfig> = ref({
    separator: null,
    'additional-repositories': ['multilib'],
    'archinstall-language': 'English',
    audio_config: { audio: 'pipewire' },
    bootloader: 'grub',
    debug: false,
    disk_config: {
      config_type: 'manual_partitioning',
      device_modifications: [
        {
          device: '/dev/sda',
          partitions: [
            {
              btrfs: [],
              flags: ['Boot'],
              dev_path: '/dev/sda1',
              fs_type: 'fat32',
              size: {
                sector_size: null,
                total_size: null,
                unit: 'B',
                value: 99982592
              },
              mount_options: [],
              mountpoint: '/boot',
              obj_id: '369f31a8-2781-4d6b-96e7-75680552b7c9',
              start: {
                sector_size: {
                  sector_size: null,
                  total_size: null,
                  unit: 'B',
                  value: 512
                },
                total_size: null,
                unit: 'sectors',
                value: 34
              },
              status: 'create',
              type: 'primary'
            }
          ],
          wipe: true
        }
      ]
    },
    hostname: 'vasakos',
    kernels: ['linux'],
    locale_config: {
      kb_layout: 'us',
      sys_enc: 'UTF-8',
      sys_lang: 'en_US'
    },
    mirror_config: {
      custom_mirrors: [],
      mirror_regions: {
        Sweden: [
          'https://mirror.osbeck.com/archlinux/$repo/os/$arch',
          'https://mirror.bahnhof.net/pub/archlinux/$repo/os/$arch',
          'https://ftp.myrveln.se/pub/linux/archlinux/$repo/os/$arch',
          'https://ftp.lysator.liu.se/pub/archlinux/$repo/os/$arch',
          'https://ftp.ludd.ltu.se/mirrors/archlinux/$repo/os/$arch',
          'https://ftp.acc.umu.se/mirror/archlinux/$repo/os/$arch',
          'http://mirror.bahnhof.net/pub/archlinux/$repo/os/$arch',
          'http://ftpmirror.infania.net/mirror/archlinux/$repo/os/$arch',
          'http://ftp.myrveln.se/pub/linux/archlinux/$repo/os/$arch',
          'http://ftp.lysator.liu.se/pub/archlinux/$repo/os/$arch',
          'http://ftp.acc.umu.se/mirror/archlinux/$repo/os/$arch'
        ]
      }
    },
    network_config: {},
    no_pkg_lookups: false,
    ntp: true,
    offline: false,
    packages: [],
    'parallel downloads': 10,
    profile_config: null,
    save_config: null,
    script: 'guided',
    silent: true,
    swap: true,
    timezone: 'UTC',
    version: '2.6.0'
  });

  const userConfig: Ref<InstallationUserConfig> = ref({
    '!users': []
  });

  function setUser(user: User): void {
    userConfig.value['!users'].push(user);
  }

  function deleteUser(username: string): void {
    userConfig.value['!users'] = userConfig.value['!users'].filter(
      (user) => user.username !== username
    );
  }

  function setDiskConfig(diskConfig: DiskConfig): void {
    config.value.disk_config = diskConfig;
  }

  function setTimeZone(timezone: string): void {
    config.value.timezone = timezone;
  }

  return { config, userConfig, setUser, deleteUser, setDiskConfig, setTimeZone };
});
