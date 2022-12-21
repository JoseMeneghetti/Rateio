export async function resizeImage(base64Str: string) {
  if (base64Str) {
    let baseimg = await new Image();

    baseimg.src = base64Str;
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    const maxW = 64;
    const maxH = 64;

    const iw = baseimg.width;
    const ih = baseimg.height;
    const scale = Math.min(maxW / iw, maxH / ih);
    const iwScaled = iw * scale;
    const ihScaled = ih * scale;
    canvas.width = iwScaled;
    canvas.height = ihScaled;
    await ctx.drawImage(baseimg, 0, 0, iwScaled, ihScaled);
    const newC = canvas.toDataURL("image/jpeg", 0.1);

    return newC;
  }
}
