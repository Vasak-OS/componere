export type VSK = {
  getIcon: (icon: string) => Promise<string>;
  loadUIConfig: () => Promise<void>;
  save: (data: string, name: string) => Promise<void>;
  install: () => Promise<void>;
  getDisks: () => Promise<string>;
};
