-- Run this once in Supabase SQL Editor before running assign-test-numbers
ALTER TABLE questions ADD COLUMN IF NOT EXISTS test_number SMALLINT;
CREATE INDEX IF NOT EXISTS idx_questions_test_number ON questions(test_number);
