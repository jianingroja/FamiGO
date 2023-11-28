const BASE_URL = import.meta.env.VITE_BASE_URL;

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${BASE_URL}/image`;
    const options = {
      method: 'POST',
      body: formData,
    };

    const res = await fetch(url, options);
    const info = await res.json();

    return info;
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};

export const deleteFileFromCloudinary = async (publicId: string) => {
  try {
    const url = `${BASE_URL}/image/${publicId}`;
    const options = {
      method: 'DELETE',
    };

    await fetch(url, options);

    return;
  } catch (error) {
    console.log('eer-->', error);
    throw error;
  }
};
