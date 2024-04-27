import {
  calculatePercentage,
  calculateUnit,
  bytesToMB,
  getBootLoaderPartitionData,
  getPrimaryPartitionData,
  calcuclateSwapSize,
  presetDiskPartition
} from '../../src/utils/diskUtils';
import { expect, test } from '@jest/globals';

test('Test Calculate Percentage', () => {
  let percentage = calculatePercentage(10, 100);
  expect(percentage).toBe(10);
  percentage = calculatePercentage(0, 100);
  expect(percentage).toBe(0);
  percentage = calculatePercentage(100, 100);
  expect(percentage).toBe(100);
});

test('Test Calculate Unit', () => {
  let unit = calculateUnit(1024);
  expect(unit).toBe('1.0 KB');
  unit = calculateUnit(1048576);
  expect(unit).toBe('1.0 MB');
  unit = calculateUnit(1073741824);
  expect(unit).toBe('1.0 GB');
  unit = calculateUnit(1099511627776);
  expect(unit).toBe('1.0 TB');
});

test('Test Bytes to MB', () => {
  let mb = bytesToMB(1048576);
  expect(mb).toBe(1);
  mb = bytesToMB(1073741824);
  expect(mb).toBe(1024);
  mb = bytesToMB(1099511627776);
  expect(mb).toBe(1048576);
});

test('Test Get Boot Loader Partition Data', () => {
  let partition = getBootLoaderPartitionData('grub');
  expect(partition).toEqual({
    btrfs: [],
    flags: ['Boot'],
    fs_type: 'ext4',
    length: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 512
    },
    mount_options: [],
    mountpoint: null,
    obj_id: '',
    start: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 0
    },
    status: 'create',
    type: 'primary'
  });

  partition = getBootLoaderPartitionData('Systemd-boot');
  expect(partition).toEqual({
    btrfs: [],
    flags: ['Boot'],
    fs_type: 'fat32',
    length: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 512
    },
    mount_options: [],
    mountpoint: null,
    obj_id: '',
    start: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 0
    },
    status: 'create',
    type: 'primary'
  });
});

test('Test Get Primary Partition Data', () => {
  const partition = getPrimaryPartitionData('', 'ext4', 512, 0);
  expect(partition).toEqual({
    btrfs: [],
    flags: [''],
    fs_type: 'ext4',
    length: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 512
    },
    mount_options: [],
    mountpoint: null,
    obj_id: '',
    start: {
      sector_size: null,
      total_size: null,
      unit: 'MB',
      value: 0
    },
    status: 'create',
    type: 'primary'
  });
});

test('Test Calculate Swap Size', () => {
  let swapSize = calcuclateSwapSize(512);
  expect(swapSize).toBe(1024);
  swapSize = calcuclateSwapSize(1024);
  expect(swapSize).toBe(2048);
  swapSize = calcuclateSwapSize(2048);
  expect(swapSize).toBe(2048);
  swapSize = calcuclateSwapSize(4096);
  expect(swapSize).toBe(4096);
  swapSize = calcuclateSwapSize(8192);
  expect(swapSize).toBe(4096);
  swapSize = calcuclateSwapSize(16384);
  expect(swapSize).toBe(8192);
});

test('Test Preset Disk Partition', () => {
  const partitions = presetDiskPartition('grub', 1024, 2048);
  expect(partitions).toEqual([
    {
      btrfs: [],
      flags: ['Boot'],
      fs_type: 'ext4',
      length: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 512
      },
      mount_options: [],
      mountpoint: null,
      obj_id: '',
      start: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 0
      },
      status: 'create',
      type: 'primary'
    },
    {
      btrfs: [],
      flags: ['Root'],
      fs_type: 'ext4',
      length: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 512
      },
      mount_options: [],
      mountpoint: null,
      obj_id: '',
      start: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 512
      },
      status: 'create',
      type: 'primary'
    },
    {
      btrfs: [],
      flags: ['Swap'],
      fs_type: 'swap',
      length: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 1024
      },
      mount_options: [],
      mountpoint: null,
      obj_id: '',
      start: {
        sector_size: null,
        total_size: null,
        unit: 'MB',
        value: 1024
      },
      status: 'create',
      type: 'primary'
    }
  ]);

});
