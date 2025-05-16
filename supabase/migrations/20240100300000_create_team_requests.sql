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

-- Create RLS Policies
CREATE POLICY "Users can view their own requests and team admins can view all"
    ON team_requests FOR SELECT
    USING (
        auth.uid() = user_id OR 
        coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->('team_' || team_requests.team_id::text || '_admin'), 'false')::bool
    );

CREATE POLICY "Users can create their own requests"
    ON team_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests and team admins can update all"
    ON team_requests FOR UPDATE
    USING (
        auth.uid() = user_id OR 
        coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->('team_' || team_requests.team_id::text || '_admin'), 'false')::bool
    );

CREATE POLICY "Users can delete their own requests and team admins can delete all"
    ON team_requests FOR DELETE
    USING (
        auth.uid() = user_id OR 
        coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->('team_' || team_requests.team_id::text || '_admin'), 'false')::bool
    );