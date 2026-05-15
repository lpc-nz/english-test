-- Run this in the Supabase SQL Editor

-- Grammar topics with theory content (for Practice mode)
CREATE TABLE IF NOT EXISTS topics (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) UNIQUE NOT NULL,
  theory_html TEXT NOT NULL
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS questions (
  id     SERIAL PRIMARY KEY,
  topic  VARCHAR(100) NOT NULL,
  q      TEXT NOT NULL,
  opts   JSONB NOT NULL,
  ans    SMALLINT NOT NULL CHECK (ans BETWEEN 0 AND 3),
  expl   TEXT NOT NULL
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic);

-- RPC function used by /api/questions to randomly select questions
CREATE OR REPLACE FUNCTION get_random_questions(p_count INT, p_topic TEXT DEFAULT NULL)
RETURNS SETOF questions AS $$
BEGIN
  IF p_topic IS NULL OR p_topic = '' THEN
    RETURN QUERY SELECT * FROM questions ORDER BY RANDOM() LIMIT p_count;
  ELSE
    RETURN QUERY SELECT * FROM questions WHERE topic = p_topic ORDER BY RANDOM() LIMIT p_count;
  END IF;
END;
$$ LANGUAGE plpgsql;
