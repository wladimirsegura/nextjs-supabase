-- Insert players for ヘベウデス
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('セグラW', '96', 'FW', false, (SELECT id FROM teams WHERE name = 'ヘベウデス')),
('住垣 智之', '0', 'C', false, (SELECT id FROM teams WHERE name = 'ヘベウデス')),
('甲斐田', '0', 'DF', false, (SELECT id FROM teams WHERE name = 'ヘベウデス')),
('佐藤まゆみ', '3', 'FW', false, (SELECT id FROM teams WHERE name = 'ヘベウデス')),
('相良真吾', '45', 'HP', false, (SELECT id FROM teams WHERE name = 'ヘベウデス'));

-- Insert players for 05ユニティーズ
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('佐々木 瞬', '10', 'C', false, (SELECT id FROM teams WHERE name = '05ユニティーズ')),
('杉村 匠', '56', 'C', false, (SELECT id FROM teams WHERE name = '05ユニティーズ')),
('住垣 香奈子', '11', 'FW', false, (SELECT id FROM teams WHERE name = '05ユニティーズ')),
('安田 里奈', '0', 'FW', false, (SELECT id FROM teams WHERE name = '05ユニティーズ')),
('三田 直樹', '0', 'FW', false, (SELECT id FROM teams WHERE name = '05ユニティーズ'));

-- Insert players for TUC
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('坂上 敬冶', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'TUC')),
('篠崎 美晃', '0', 'C', false, (SELECT id FROM teams WHERE name = 'TUC')),
('川口 星哉', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'TUC')),
('篠崎弘子', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'TUC'));

-- Insert players for いやさか2000
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('高橋 義弘', '0', 'C', false, (SELECT id FROM teams WHERE name = 'いやさか2000')),
('中野 隆治', '0', 'C', false, (SELECT id FROM teams WHERE name = 'いやさか2000')),
('佐藤 祐子', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'いやさか2000'));

-- Insert players for Undefeated
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('佐藤 豪太', '0', 'C', false, (SELECT id FROM teams WHERE name = 'Undefeated')),
('中野', '0', 'C', false, (SELECT id FROM teams WHERE name = 'Undefeated')),
('南', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'Undefeated')),
('木村 雅直', '0', 'DF', false, (SELECT id FROM teams WHERE name = 'Undefeated')),
('服部 光秀', '0', 'DF', false, (SELECT id FROM teams WHERE name = 'Undefeated')),
('土谷 力', '0', 'FW', false, (SELECT id FROM teams WHERE name = 'Undefeated'));

-- Insert players for コンパネロス
INSERT INTO players (name, number, position, is_helper, team_id)
VALUES
('せいじ', '0', 'C', false, (SELECT id FROM teams WHERE name = 'コンパネロス'));