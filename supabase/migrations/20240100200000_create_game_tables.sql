-- Create game-related tables

-- Create game slots table for scheduling
CREATE TABLE game_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  game_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedule table for season games
CREATE TABLE schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES game_slots(id) ON DELETE CASCADE,
  home_team_id UUID REFERENCES teams(id),
  away_team_id UUID REFERENCES teams(id),
  referee_team_id UUID REFERENCES teams(id),
  record_team_id UUID REFERENCES teams(id),
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled'))
);

-- Create games table for actual game data
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID REFERENCES schedule(id) ON DELETE CASCADE,
  home_team_id UUID REFERENCES teams(id),
  away_team_id UUID REFERENCES teams(id),
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  home_shots INTEGER DEFAULT 0,
  away_shots INTEGER DEFAULT 0,
  period INTEGER DEFAULT 1,
  clock TEXT DEFAULT '8:00',
  status TEXT DEFAULT 'scheduled',
  winner_id UUID REFERENCES teams(id),
  game_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (status IN ('scheduled', 'in_progress', 'completed'))
);

-- Enable Row Level Security
ALTER TABLE game_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow public read access" ON game_slots FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON schedule FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON games FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write" ON game_slots FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON schedule FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON games FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON game_slots FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON schedule FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON games FOR UPDATE USING (auth.role() = 'authenticated');