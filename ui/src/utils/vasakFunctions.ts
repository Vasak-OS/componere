import type { VSK } from "@/types/VSK"

export const getIcon = async (binding: VSK,image: string) => {
  return await binding.getIcon(image)
}
