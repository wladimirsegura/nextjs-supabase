-- Add status field to players table
CREATE TYPE player_status AS ENUM ('pending', 'active', 'inactive');

-- Add status column with default value 'pending'
ALTER TABLE players ADD COLUMN status player_status NOT NULL DEFAULT 'pending';

-- Update existing players to 'active' status
UPDATE players SET status = 'active' WHERE status = 'pending';