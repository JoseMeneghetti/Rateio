export const encodeBase64 = (data: any) => {
  return Buffer.from(data).toString("base64");
};
export const decodeBase64 = (data: any) => {
  return Buffer.from(data, "base64");
};
