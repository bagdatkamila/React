export function formatDescription(raw) {
  if (!raw) return "";

  let text = raw;

  // Убираем блоки "Also contained in:" и перечисление книг
  text = text.replace(/[-–—]\s*\[/g, "\n- [");

  const splitIndex = text.indexOf("Also contained in:");
  if (splitIndex !== -1) {
    text = text.substring(0, splitIndex).trim();
  }

  return text.trim();
}
