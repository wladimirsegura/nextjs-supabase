-- Remove team requests functionality

-- Drop RLS policies
DROP POLICY IF EXISTS "Allow public read access" ON team_requests;
DROP POLICY IF EXISTS "Allow authenticated write" ON team_requests;

-- Drop indexes
DROP INDEX IF EXISTS idx_team_requests_user_id;
DROP INDEX IF EXISTS idx_team_requests_team_id;

-- Drop team_requests table
DROP TABLE IF EXISTS team_requests;

-- Drop enum type
DROP TYPE IF EXISTS request_status;