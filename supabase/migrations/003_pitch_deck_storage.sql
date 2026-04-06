-- Create storage bucket for generated pitch decks
INSERT INTO storage.buckets (id, name, public)
VALUES ('pitch-decks', 'pitch-decks', false)
ON CONFLICT (id) DO NOTHING;

-- Allow service role full access (used by server-side API routes)
CREATE POLICY "Service role can manage pitch decks"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'pitch-decks')
  WITH CHECK (bucket_id = 'pitch-decks');
