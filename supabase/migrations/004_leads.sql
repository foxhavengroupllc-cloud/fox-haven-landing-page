CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL,
  company VARCHAR(200),
  pain_point TEXT,
  source VARCHAR(100) DEFAULT 'ai-small-biz-page',
  created_at TIMESTAMP DEFAULT NOW()
);
