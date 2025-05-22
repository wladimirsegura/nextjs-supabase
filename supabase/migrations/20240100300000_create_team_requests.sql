-- Create team requests functionality

-- Create enum type for request status
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');

-- Create team_requests table
CREATE TABLE team_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    jersey_number TEXT,
    status request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, team_id)
);

-- Create index for foreign keys
CREATE INDEX idx_team_requests_user_id ON team_requests(user_id);
CREATE INDEX idx_team_requests_team_id ON team_requests(team_id);

-- Enable Row Level Security
ALTER TABLE team_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies aligned with other dashboard features
CREATE POLICY "Allow public read access" ON team_requests
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write" ON team_requests
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON team_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON team_requests
    FOR DELETE USING (auth.role() = 'authenticated');