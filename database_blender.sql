-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  asset_id       int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- public / logical identifiers
  id             varchar(64)  NOT NULL UNIQUE,   -- e.g. "asset-1"
  author         varchar(120) NOT NULL,

  -- timestamps
  created_at     timestamptz  NOT NULL DEFAULT now(),
  updated_at     timestamptz  NOT NULL DEFAULT now(),

  -- payload
  asset_data     text         NOT NULL,          -- base64 string (can be large)
  title          varchar(160) NOT NULL,
  image_data     varchar(255),                   -- filename or URL
  description    text
);

-- Example insert
INSERT INTO assets (
  id, author, created_at, updated_at,
  asset_data, title, image_data, description
) VALUES (
  'asset-1',
  'Jan-Hendrik Müller',
  now(),
  now(),
  'TreeClipper::H4sIALGFY2kC/+1aW2/iOBT+K4jn2SoJgcC8sR00QtuSitJKq6qyTGLAW8eOHKed2Yr...',
  'Ring Arrangement',
  'asset1_img.png',
  'A procedural ring arrangement geometry node setup for Blender.'
);

-- Another example insert
INSERT INTO assets (
  id, author, created_at, updated_at,
  asset_data, title, image_data, description
) VALUES (
  'asset-2',
  'Jan-Hendrik Müller',
  now(),
  now(),
  'TreeClipper::H4sIAHuTY2kC/+1c227bOhb9FcHPbSDqrnnzcdLCM4kdxE6BQVEIjEzbnEiioEvSniL...',
  'Another Node Setup',
  'asset2_img.png',
  'Short description here.'
);

-- DROP TABLE assets;
