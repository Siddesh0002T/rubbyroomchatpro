export const uploadMediaToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chatUploads'); // your unsigned preset
  formData.append('folder', 'samples/ecommerce'); // optional

  const response = await fetch('https://api.cloudinary.com/v1_1/dycmecspd/auto/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload media');
  }

  return response.json(); // contains secure_url, public_id, etc.
};
