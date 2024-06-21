export type VSK = {
  getIcon: (icon: string) => Promise<string>;
  loadUIConfig: () => Promise<void>;
  save: (data: string, name: string) => Promise<void>;
  install: () => Promise<void>;
  getDisks: () => Promise<string>;
  getHardInfo: () => Promise<string>;
  setDisk: (disk: string) => Promise<void>;
  createUEFIBootPartition: (start: number, end: number) => Promise<void>;
  createLegacyBootPartition: (start: number, end: number) => Promise<void>;
  createSwapPartition: (start: number, end: number) => Promise<void>;
  createRootPartition: (start: number, end: number) => Promise<void>;
  createHomePartition: (start: number, end: number) => Promise<void>;
};
