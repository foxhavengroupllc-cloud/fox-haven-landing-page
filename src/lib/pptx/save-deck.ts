import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DECK_DIR = '/tmp/pitch-decks';

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function saveDeck(
  buffer: Buffer,
  companyName: string,
): Promise<string> {
  await mkdir(DECK_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(companyName);
  const filename = `fox-haven-pitch-${slug}-${date}.pptx`;
  const filePath = path.join(DECK_DIR, filename);

  await writeFile(filePath, buffer);

  return filePath;
}
