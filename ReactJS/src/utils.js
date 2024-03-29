export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
export const convertPriceAdmin = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} $`;
  } catch (error) {
    return null;
  }
};
