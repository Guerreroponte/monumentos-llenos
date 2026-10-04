type ImageSource = "lugares" | "resenas";
const INLINE_IMAGE = /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i;

// Legacy photos remain in the database; only their transport changes.
export function publicImage(source: ImageSource, id: string, value?: string | null) {
  return value && INLINE_IMAGE.test(value)
    ? `/api/imagenes-publicas/${source}/${encodeURIComponent(id)}`
    : value || null;
}

export function decodePublicImage(value: string) {
  const match = value.match(INLINE_IMAGE);
  if (!match) return null;
  const mime = match[1].toLowerCase().replace("jpg", "jpeg");
  return { contentType: `image/${mime}`, base64: value.slice(match[0].length) };
}
