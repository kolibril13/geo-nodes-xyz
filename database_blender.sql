-- Assets table
-- CREATE TABLE IF NOT EXISTS assets (
--   asset_id     int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

--   -- your JSON fields
--   id           varchar(64)  NOT NULL UNIQUE,  -- e.g. "asset-1" (public ID)
--   author       varchar(120) NOT NULL,
--   creation_date date        NOT NULL,
--   last_update   date        NOT NULL,
--   asset_data    text        NOT NULL,         -- base64 string can be long
--   title         varchar(160) NOT NULL,
--   image_data    varchar(255),                 -- filename or URL
--   description   text
-- );

-- -- Example insert matching your object
-- INSERT INTO assets (
--   id, author, creation_date, last_update,
--   asset_data, title, image_data, description
-- ) VALUES (
--   'asset-1',
--   'Jan-Hendrik Müller',
--   '2025-12-30',
--   '2026-01-15',
--   'TreeClipper::H4sIALGFY2kC/+1aW2/iOBT+K4jn2SoJgcC8sR00QtuSitJKq6qyTGLAW8eOHKed2Yr/vrZzwaFuetN26Kg8tHB8zsHn/sXmvrskiMaIg1vEM8xo92un2z9yjtzul05XcIRARHCaNhnkcsFAWYyA4sok+eq+i2P535ELMRRQvr3vUpggJTLHdN0Zcw7pGiWICiWdZwis4A0C8g2XTCtIMlTS0Q/BYbUgeK7oOAM8pwInCJT6KwkB18aniBHGQUHrzsLZRH1ZjFYwJwKsOctToDd+h2OxkTyur7eMsojjVJQ2KpklUTsoRTAViK9ghIwNGaTSeNc0HkYC3yIpGaMfkuApEYGSTLtsJ+OZMprB8GbP5s3viCVI8J9d+74zFt0gAcTPVHPPpLHnmmTKbbB0wS0kOTJcp4mYgoTFeIUbUVkxHiHpOArkAomNFRkXTLMURQKwXKS5aK6lkCICBFuviflVBP6UWZUhIuWwRavMklymgZSOkUln2lRIAIFLRIwFKATHy1zI7GAJxNobZ+F0tjDDv2OqfKkdJgMaiZyj2mfji0VoymFa2NW9HJ9c6ISSXmIFKbxYnF3ob1HBq1Wch8d/TRbd7fZLFWj/M5aHHsvp7Hmh7NtCOcuTJeKdCdEtLrNEtORgq45spwJHKOsw2hEb1Ikwj6RP2yI+LdrmZ7DfJdhKe76so7A3Rir/91TDT6TKmqA+wx/1Z8/1A3/YG/jBdnu93aoU0mMz2/X/wcOZId8G1bQwhkFgchIWwTKvrv7wHefIka+e03eDfjCU25KEaxWukg3AZcaIdOAT/MZUPFJzcYPweqPc5ToFoW5caix2ptq/Oi2KqOq43EFO5cQHKWcpXFfb7I5PTqrBH+WZYAnQs3p/dqsdOkcDJxjJ19Dx/dEgGPTVDp9DU0YU2WnozTbsDhQZmO0GuKamHN1idLdXTGZCF05rqBISoMi0MwtGOcKI6tA61a91AhTVZjCP2iCA67xibuzZgCiUSC/emU4wvQEEJ1h5yXdG/coyS+VaO04qk36N/02YicPKavk+CU8ni/nfem84S2XLANkGFosnU1lKRit13df10l9uZdWhrAZae4VptWez+hDNPL44X4SnVkuPp/PjExXMIq0lXsZxHUDZ5HSLqDtECrlC/l87NCfEdEXvsbbmFS2nrZM1WV7YvMJi6n12rwfdy/VbO1L//+5I7q9rR4PfrzAfzBs3aJlO9jLe1UqjjguoWD7p1ihSmW/6dNgCXFRdut4TaKXB9Owqn9JMQBohBbLPGC7nyGet7yVDK/rwrOhj582PW+meFXicVw8272pcKdxm259heDIZz6ymfZuOT8PZNxvq2CtFz4o7qkL54AG1Hpad4eimc7AGvjKqWo1put8WVmm+OoI8sIR+DD+3mO2YJltByJwJ+O7V+5xAz8PFeDENXxzpqwrfFiDXdIAVqZxHkBxeml9Ojhfh/MW2u3rul3+uH4UzXtA6wYZttZF91AdoC1irELgCbZV9Id3N6seewLzRo/jM8wrsNWgFaPtcz0ZopyjbdI7rs89PaNZM7J7TejdkBTCX5cnywfWAN52X9Ky4ZQ5jnB+epfVZ87NtdXtHfZWAI98LglHfdx/tdb1ea0pYcYCqst+0zSnTdv1j/9F0hQkBjTP8JxUu1N2supWgtIIStTrlDDMU/dZQNMazfEiWnsFx4zpbNQXTgSsuu1lx/1PNLcF2BLdvFkTwRvX6WNlU73mm+uEb1etMbKg3wVtv9Nbdu3vqe3XJSFnBGGleZhkXY8ZXqJ8BsOU/zTZfLaAY28hZlJPUtpBCTPfoKvVAoqrvITnK+S2y0FM1riPC8njvNxF3EAuwYlz9JCO6sUiuOYKSL0U0wmR/2FQOAAmkcI2K2736+VDNOzmNEKdQEe+VH7MI0eKearv9D6ZxFDspIgAA',
--   'Ring Arrangement',
--   'asset1_img.png',
--   'A procedural ring arrangement geometry node setup for Blender.'
-- );

-- -- Another example insert
-- INSERT INTO assets (
--   id, author, creation_date, last_update,
--   asset_data, title, image_data, description
-- ) VALUES (
--   'asset-2',
--   'Jan-Hendrik Müller',
--   '2026-01-16',
--   '2026-01-16',
--   'TreeClipper::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',
--   'Another Node Setup',
--   'asset2_img.png',
--   'Short description here.'
-- );

DROP TABLE assets;