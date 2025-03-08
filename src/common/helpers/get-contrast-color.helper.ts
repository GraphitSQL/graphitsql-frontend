export const getContrastColor = (bgColor: string): string => {
  // Извлекаем значения RGBA
  const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (!rgba) return '#000'; // Возвращаем черный цвет по умолчанию

  const r = parseInt(rgba[1]);
  const g = parseInt(rgba[2]);
  const b = parseInt(rgba[3]);

  // Вычисляем яркость
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 186 ? '#000' : '#fff'; // Черный для светлых и белый для темных
};
