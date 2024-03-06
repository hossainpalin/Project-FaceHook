function getInitialLetters(name) {
  let letters;
  const nameSplit = name.split(' ');
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    letters =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    letters = nameSplit[0].substring(0, 1);
  } else return;

  return letters.toUpperCase();
}

export const getRandomBgColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function getInitialAvatar(name, color) {
  if (name == null) return;
  name = getInitialLetters(name);

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = canvas.height = 500;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, 500, 500);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, 500, 500);

  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.font = `${500 / 2}px Roboto`;
  context.fillText(name, 500 / 1.95, 500 / 1.75);

  return canvas.toDataURL();
}
