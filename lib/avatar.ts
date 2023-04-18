const generateAvatarUrl = (
  name: string,
  backgroundColor = 'random',
  textColor = 'white',
  size = 80
) => {
  const initial = name.charAt(0).toUpperCase();
  const bgColor =
    backgroundColor === 'random'
      ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
      : backgroundColor;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${bgColor}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${textColor}" font-size="36" font-family="Arial, sans-serif">${initial}</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

export { generateAvatarUrl };
