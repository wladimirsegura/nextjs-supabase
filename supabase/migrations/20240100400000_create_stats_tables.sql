-- Create statistics tables and related functions

-- Create goals table for tracking scoring
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id),
  scorer_id UUID REFERENCES players(id),
  assist1_id UUID REFERENCES players(id),
  assist2_id UUID REFERENCES players(id),
  period INTEGER NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team statistics table
CREATE TABLE team_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  ties INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(season_id, team_id)
);

-- Create player statistics table
CREATE TABLE player_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id),
  games_played INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(season_id, player_id)
);

-- Create function to update team statistics after game completion
CREATE OR REPLACE FUNCTION update_team_stats_after_game()
RETURNS TRIGGER AS $$
DECLARE
  v_season_id UUID;
  v_winner_id UUID;
  v_loser_id UUID;
  v_is_tie BOOLEAN;
BEGIN
  SELECT season_id INTO v_season_id FROM schedule WHERE id = NEW.schedule_id;
  
  IF NEW.home_score > NEW.away_score THEN
    v_winner_id := NEW.home_team_id;
    v_loser_id := NEW.away_team_id;
    v_is_tie := FALSE;
  ELSIF NEW.away_score > NEW.home_score THEN
    v_winner_id := NEW.away_team_id;
    v_loser_id := NEW.home_team_id;
    v_is_tie := FALSE;
  ELSE
    v_is_tie := TRUE;
  END IF;

  -- Update stats for both teams
  UPDATE team_stats 
  SET 
    games_played = games_played + 1,
    wins = wins + CASE WHEN team_id = v_winner_id THEN 1 ELSE 0 END,
    losses = losses + CASE WHEN team_id = v_loser_id THEN 1 ELSE 0 END,
    ties = ties + CASE WHEN v_is_tie THEN 1 ELSE 0 END,
    points = points + CASE 
      WHEN team_id = v_winner_id THEN 3
      WHEN v_is_tie THEN 1
      ELSE 0
    END,
    goals_for = CASE 
      WHEN team_id = NEW.home_team_id THEN goals_for + NEW.home_score
      ELSE goals_for + NEW.away_score
    END,
    goals_against = CASE 
      WHEN team_id = NEW.home_team_id THEN goals_against + NEW.away_score
      ELSE goals_against + NEW.home_score
    END
  WHERE season_id = v_season_id 
    AND team_id IN (NEW.home_team_id, NEW.away_team_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to update player statistics after goals
CREATE OR REPLACE FUNCTION update_player_stats_after_goal()
RETURNS TRIGGER AS $$
DECLARE
  v_season_id UUID;
BEGIN
  SELECT season_id INTO v_season_id FROM schedule 
  WHERE id = (SELECT schedule_id FROM games WHERE id = NEW.game_id);

  -- Update scorer stats
  IF NEW.scorer_id IS NOT NULL THEN
    DECLARE
      v_is_helper BOOLEAN;
    BEGIN
      SELECT is_helper INTO v_is_helper
      FROM players
      WHERE id = NEW.scorer_id;

      IF NOT v_is_helper THEN
        UPDATE player_stats 
        SET goals = goals + 1,
            points = points + 1
        WHERE season_id = v_season_id AND player_id = NEW.scorer_id;
      END IF;
    END;
  END IF;

  -- Update assist stats
  IF NEW.assist1_id IS NOT NULL THEN
    DECLARE
      v_is_helper BOOLEAN;
    BEGIN
      SELECT is_helper INTO v_is_helper
      FROM players
      WHERE id = NEW.assist1_id;

      IF NOT v_is_helper THEN
        UPDATE player_stats 
        SET assists = assists + 1,
            points = points + 1
        WHERE season_id = v_season_id AND player_id = NEW.assist1_id;
      END IF;
    END;
  END IF;

  IF NEW.assist2_id IS NOT NULL THEN
    DECLARE
      v_is_helper BOOLEAN;
    BEGIN
      SELECT is_helper INTO v_is_helper
      FROM players
      WHERE id = NEW.assist2_id;

      IF NOT v_is_helper THEN
        UPDATE player_stats 
        SET assists = assists + 1,
            points = points + 1
        WHERE season_id = v_season_id AND player_id = NEW.assist2_id;
      END IF;
    END;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for statistics updates
CREATE TRIGGER update_team_stats_after_game_trigger
  AFTER UPDATE OF status ON games
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION update_team_stats_after_game();

CREATE TRIGGER update_player_stats_after_goal_trigger
  AFTER INSERT ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_player_stats_after_goal();

-- Enable Row Level Security
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow public read access" ON goals FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON player_stats FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write" ON goals FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON team_stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON player_stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON goals FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON team_stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON player_stats FOR UPDATE USING (auth.role() = 'authenticated');