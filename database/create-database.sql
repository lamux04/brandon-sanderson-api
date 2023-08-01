CREATE TABLE books (
  ISBN varchar(17) NOT NULL,
  name varchar(50) NOT NULL,
  publication_date date NOT NULL,
  saga varchar(50),
  planet varchar(20) NOT NULL,
  pages int,
  shortNovel boolean NOT NULL,
  urlImage varchar(255),
  PRIMARY KEY (ISBN),
  CHECK (pages > 0)
);

CREATE TABLE shopsUrl (
  id int NOT NULL AUTO_INCREMENT,
  ISBN varchar(17) NOT NULL,
  urlBuy varchar(1000) NOT NULL,
  shop varchar(50),
  PRIMARY KEY (id),
  FOREIGN KEY (ISBN) REFERENCES books(ISBN)
);

-- Insert into books
INSERT INTO books (ISBN, name, publication_date, saga, planet, pages, shortNovel, urlImage)
VALUES 
  ('978-0-7653-2635-5', 'The Way of Kings', '2010-08-31', 'The Stormlight Archive', 'Roshar', 1007, FALSE, '/img/The-Stormlight-Archive/1.jpg'),
  ('978-0-7653-2636-2', 'Words of Radiance', '2014-03-04', 'The Stormlight Archive', 'Roshar', 1087, FALSE, '/img/The-Stormlight-Archive/2.jpg'),
  ('978-1-250-16654-8', 'Edgedancer', '2016-11-22', 'The Stormlight Archive', 'Roshar', 268, TRUE, '/img/The-Stormlight-Archive/2.5.jpg'),
  ('978-0-7653-2637-9', 'Oathbringer', '2017-11-14', 'The Stormlight Archive', 'Roshar', 1248, FALSE, '/img/The-Stormlight-Archive/3.jpg'),
  ('978-1-8033-6133-8', 'Dawnshard', '2020-11-10', 'The Stormlight Archive', 'Roshar', 171, TRUE, '/img/The-Stormlight-Archive/3.5.jpg'),
  ('978-0-7653-2638-6', 'Rhythm of War', '2020-11-17', 'The Stormlight Archive', 'Roshar', 1232, FALSE, '/img/The-Stormlight-Archive/4.jpg');
  
-- Insert into shopsUrl
INSERT INTO shopsUrl (ISBN, urlBuy, shop)
VALUES 
  ('978-0-7653-2635-5', 'https://www.amazon.es/KINGS-Stormlight-Archive-BRANDON-SANDERSON/dp/0765326353', 'Amazon'),
  ('978-0-7653-2636-2', 'https://www.amazon.es/Words-Radiance-Books-Brandon-Sanderson/dp/0765365286/ref=sr_1_2?&sprefix=words+of+radiance%2Caps%2C99&sr=8-2', 'Amazon'),
  ('978-1-250-16654-8', 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi82bjrk7uAAxXEV6QEHb8RB8cQFnoECC8QAQ&url=https%3A%2F%2Fwww.amazon.es%2FEdgedancer-Brandon-Sanderson%2Fdp%2F1473225035&usg=AOvVaw0HPqVL-tGySqvd_JeSS1RC&opi=89978449', 'Amazon'),
  ('978-0-7653-2637-9', 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjr69iClLuAAxXJTKQEHQtnACYQFnoECDIQAQ&url=https%3A%2F%2Fwww.amazon.es%2FOathbringer-Stormlight-Archive-Brandon-Sanderson%2Fdp%2F076532637X&usg=AOvVaw3Q40sEQCNEFrHn3x11HHmo&opi=89978449', 'Amazon'),
  ('978-1-8033-6133-8', 'https://www.amazon.es/Dawnshard-Stormlight-Archive-Brandon-Sanderson-ebook/dp/B08MXXWYT7', 'Amazon'),
  ('978-0-7653-2638-6', 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiL4vWulLuAAxVKRqQEHbO3Cu4QFnoECDAQAQ&url=https%3A%2F%2Fwww.amazon.es%2FRHYTHM-Stormlight-Archive-Brandon-Sanderson%2Fdp%2F0765326388&usg=AOvVaw0iLnd3F-qu4EEJTZNPWThQ&opi=89978449', 'Amazon');