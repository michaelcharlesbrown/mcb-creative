type PortableTextBlock = {
  _type?: string;
  children?: { text?: string }[];
};

function isPortableTextBlock(value: unknown): value is PortableTextBlock {
  return typeof value === "object" && value !== null;
}

export function portableTextToPlainText(blocks?: unknown): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .filter(isPortableTextBlock)
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${cut.trim()}…`;
}
