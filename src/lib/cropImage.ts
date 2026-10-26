import type { Area } from 'react-easy-crop';

export const cropImageToFile = async (imageSrc: string, crop: Area, fileName = 'profile-picture.jpg'): Promise<File> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2d context');

  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(new File([blob], fileName, { type: 'image/jpeg' })) : reject(new Error('Canvas is empty'))),
      'image/jpeg',
      0.9
    );
  });
};
