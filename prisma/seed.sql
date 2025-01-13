--Users Table
INSERT INTO Users (name, gender, email, phoneNumber, password, created_at, updated_at, inactiveDate, profilePhoto, level, followerCount, followingCount, points, job, userCategory, ageGroup) VALUES
('John Doe', 'male', 'john@example.com', '1234567890', 'password123', NOW(), NOW(), NULL, 'https://example.com/profile1.jpg', 'bronze', 10, 5, 100, 'officeWorker', 'exercise', 'twenty'),
('Jane Smith', 'female', 'jane@example.com', '0987654321', 'password456', NOW(), NOW(), NULL, 'https://example.com/profile2.jpg', 'silver', 20, 15, 200, 'collegeStudent', 'study', 'thirty');

--Keywords Table
INSERT INTO Keywords (name) VALUES
('motivation'),
('study'),
('health'),
('productivity');

--Badges Table
INSERT INTO Badges (name, icon, description, type, obtainedCount, profileImage) VALUES
('Starter Badge', 'https://example.com/badge1.png', 'Awarded for starting your first challenge', 'category', 100, 'https://example.com/badge1_profile.png'),
('Achiever Badge', 'https://example.com/badge2.png', 'Awarded for completing 5 challenges', 'type', 50, 'https://example.com/badge2_profile.png');

--Challenges Table
INSERT INTO Challenges (owner_id, name, type, description, challengeImage, status, maxParticipants, verificationType, rule, created_at, updated_at) VALUES
(1, '매일 운동', 'basic', 'A challenge to exercise daily for 30 minutes', 'https://example.com/challenge1.png', 'open', 50, 'camera', 'Submit a photo after exercise', NOW(), NOW()),
(2, '같이 공부', 'study', 'Study 2 hours every day for a week', 'https://example.com/challenge2.png', 'ongoing', 30, 'text', 'Submit a text summary of what you studied', NOW(), NOW());

--Posts Table 
INSERT INTO Posts (user_id, board_id, title, content, anonymous, created_at, updated_at) VALUES
(1, 1, 'My First Post', 'Excited to join this community!', FALSE, NOW(), NOW()),
(2, 1, 'Study Tips', 'Sharing my tips for effective studying.', TRUE, NOW(), NOW());

--Comments Table
INSERT INTO Comments (user_id, post_id, verification_id, content, created_at, updated_at) VALUES
(1, 3, 5,'Welcome to the community!', NOW(), NOW()),
(2, 4, 6,'Thanks for the tips!', NOW(), NOW());

--Follows Table
INSERT INTO Follows (follower_id, following_id) VALUES
(1, 2),
(2, 1);

--User Badges Table
INSERT INTO User_Badge (user_id, badge_id, created_at, obtain, updated_at) VALUES
(1, 1, NOW(), TRUE, NOW()),
(2, 2, NOW(), TRUE, NOW());

--User Goals Table 
INSERT INTO User_Goal (user_id, goal_id) VALUES
(1, 1),
(2, 2);

--Alarms Table
INSERT INTO Alarms (user_id, sender_id, alarmType, referenceId, message, isRead, created_at) VALUES
(1, NULL, 'follow', 1, 'You have a new follower!', FALSE, NOW()),
(2, NULL, 'verificationComment', 1, 'Your verification has a new comment!', FALSE, NOW());

-- Challenge Likes Table
INSERT INTO ChallengeLikes (challenge_id, user_id) VALUES
(1, 1),
(2, 2);

-- Post Likes Table 
INSERT INTO PostLikes (post_id, user_id) VALUES
(3, 1),
(4, 2);

-- Messages Table
INSERT INTO Messages (sendUser_id, receivedUser_id, content, created_at) VALUES
(1, 2, 'Hello, how are you?', NOW()),
(2, 1, 'I am fine, thank you!', NOW());

-- Verifications Table 
INSERT INTO Verifications (userChallenge_id, user_id, status, created_at, updated_at) VALUES
(3, 1, 'verified', NOW(), NOW()),
(4, 2, 'unverified', NOW(), NOW());

-- Category Table
INSERT INTO Category (name) VALUES
('운동'),
('학업'),
( '취업준비'),
( '생활습관'),
( '취미');


-- Favor Type Table
INSERT INTO FavorType (name) VALUES
( '베이직'),
( '스터디');

-- User Category Type Table
INSERT INTO User_CategoryType (user_id, category_id) VALUES
(1, 1),
(2, 2);

-- User Challenge Table
INSERT INTO User_Challenge (user_id, challenge_id, status) VALUES
(1, 1, 'active'),
(2, 2, 'kick');

-- Goals Table
INSERT INTO Goals (name) VALUES
('foodControl'),
('smallGoal'),
('studyTogether'),
('buildCapacity'),
('escape_3'),
('qualification');

-- Conditions Table
INSERT INTO Conditions (badge_id, description) VALUES
(1, 'Exercise daily for 30 minutes'),
(2, 'Study 2 hours every day');

--User Badge Condition Table
INSERT INTO UserBadgeCondition (badge_id, condition_id) VALUES
(1, 1),
(2, 2);

-- Boards Table
INSERT INTO Boards (name, description, status) VALUES
('운동게시판', 'A place for general topics', 'basic'),
('학업게시판', 'Important announcements', 'pinned');

--Board Categories Table
INSERT INTO Board_Category (board_id, category_id) VALUES
(1, 8),
(2, 10);

--Challenge Categories Table
INSERT INTO Challenge_Category (challenge_id, category_id) VALUES
(1, 1),
(2, 2);

-- Challenge Keywords Table
INSERT INTO Challenge_Keyword (challenge_id, keyword_id) VALUES
(1, 1),
(2, 2);

-- Frequencies Table
INSERT INTO Frequencies (challenge_id, frequencyType, frequencyValue) VALUES
(1, 'weeklyCount', '{"count": 5}'),
(2, 'specificDays', '{"days": ["Monday", "Wednesday", "Friday"]}');

-- KickOuts Table
INSERT INTO KickOuts (userChallenge_id, challengeType, created_at) VALUES
(3, 'study', NOW()),
(4, 'basic', NOW());

--Scrap Table
INSERT INTO Scraps (user_id, scrapTarget1_id, scrapTarget2_id, scrapType, created_at) VALUES
(1, 5, 6, 'post', NOW()),
(2, 6, 5, 'verification', NOW());

-- Temporary Verification Table
INSERT INTO TemporaryVerifications (user_id, verification_id, challengeType, title, content, created_at, updated_at) VALUES
(1, 1, 'study', 'Temporary Title', 'Temporary content for study', NOW(), NOW()),
(2, 2, 'basic', 'Temporary Title 2', 'Temporary content for basic', NOW(), NOW());
