import type { VSK } from '@/types/VSK';
import type { VSKDisk } from '@/types/VSKDisk';

export const getIcon = async (binding: VSK, image: string) => {
  return await binding.getIcon(image);
};

export const getDisks = async (binding: VSK): Promise<VSKDisk[]> => {
  return JSON.parse(await binding.getDisks()) as VSKDisk[];
};
