import { supabase } from '@/db';

const BUCKET = 'pitch-decks';

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
  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(companyName);
  const filename = `fox-haven-pitch-${slug}-${date}.pptx`;
  const storagePath = `decks/${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload deck to storage: ${error.message}`);
  }

  return storagePath;
}
