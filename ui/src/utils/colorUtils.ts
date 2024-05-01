const swapColor = ['rgb(199,232,177)', 'rgb(255,155,155)'];
const ext4Color = ['rgb(167,236,240)', 'rgb(226,172,249)', 'rgb(255,219,169)', 'rgb(142,195,177)'];
const fatColor = ['rgb(198,137,64)', 'rgb(255,217,101)', 'rgb(59,152,185)'];

export const randomColor = (format: string): string => {
  console.log(format);
  if (format === 'ext4' || format === 'Root')
    return ext4Color[Math.floor(Math.random() * ext4Color.length)];
  if (format === 'swap' || format === 'Swap')
    return swapColor[Math.floor(Math.random() * swapColor.length)];
  return fatColor[Math.floor(Math.random() * fatColor.length)];
};
