-- DropForeignKey
ALTER TABLE `Alarms` DROP FOREIGN KEY `Alarms_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `Alarms` DROP FOREIGN KEY `Alarms_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Board_Category` DROP FOREIGN KEY `Board_Category_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `Board_Category` DROP FOREIGN KEY `Board_Category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `ChallengeLikes` DROP FOREIGN KEY `ChallengeLikes_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `ChallengeLikes` DROP FOREIGN KEY `ChallengeLikes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Challenge_Category` DROP FOREIGN KEY `Challenge_Category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Challenge_Category` DROP FOREIGN KEY `Challenge_Category_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `Challenge_Keyword` DROP FOREIGN KEY `Challenge_Keyword_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `Challenge_Keyword` DROP FOREIGN KEY `Challenge_Keyword_keyword_id_fkey`;

-- DropForeignKey
ALTER TABLE `Challenges` DROP FOREIGN KEY `Challenges_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_verification_id_fkey`;

-- DropForeignKey
ALTER TABLE `Conditions` DROP FOREIGN KEY `Conditions_badge_id_fkey`;

-- DropForeignKey
ALTER TABLE `Follows` DROP FOREIGN KEY `Follows_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `Follows` DROP FOREIGN KEY `Follows_following_id_fkey`;

-- DropForeignKey
ALTER TABLE `Frequencies` DROP FOREIGN KEY `Frequencies_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `KickOuts` DROP FOREIGN KEY `KickOuts_userChallenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_receivedUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `Messages` DROP FOREIGN KEY `Messages_sendUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `PostLikes` DROP FOREIGN KEY `PostLikes_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `PostLikes` DROP FOREIGN KEY `PostLikes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_board_id_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Scraps` DROP FOREIGN KEY `Scraps_scrapTarget1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Scraps` DROP FOREIGN KEY `Scraps_scrapTarget2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Scraps` DROP FOREIGN KEY `Scraps_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `TemporaryVerifications` DROP FOREIGN KEY `TemporaryVerifications_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `TemporaryVerifications` DROP FOREIGN KEY `TemporaryVerifications_verification_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Badge` DROP FOREIGN KEY `User_Badge_badge_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Badge` DROP FOREIGN KEY `User_Badge_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Badge_Condition` DROP FOREIGN KEY `User_Badge_Condition_condition_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Badge_Condition` DROP FOREIGN KEY `User_Badge_Condition_userBadge_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_CategoryType` DROP FOREIGN KEY `User_CategoryType_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_CategoryType` DROP FOREIGN KEY `User_CategoryType_favorType_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_CategoryType` DROP FOREIGN KEY `User_CategoryType_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Challenge` DROP FOREIGN KEY `User_Challenge_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Challenge` DROP FOREIGN KEY `User_Challenge_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Goal` DROP FOREIGN KEY `User_Goal_goal_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Goal` DROP FOREIGN KEY `User_Goal_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge1_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge2_id_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_userBadge3_id_fkey`;

-- DropForeignKey
ALTER TABLE `Verifications` DROP FOREIGN KEY `Verifications_userChallenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `Verifications` DROP FOREIGN KEY `Verifications_user_id_fkey`;

-- DropIndex
DROP INDEX `Alarms_sender_id_fkey` ON `Alarms`;

-- DropIndex
DROP INDEX `Alarms_user_id_fkey` ON `Alarms`;

-- DropIndex
DROP INDEX `Board_Category_board_id_fkey` ON `Board_Category`;

-- DropIndex
DROP INDEX `Board_Category_category_id_fkey` ON `Board_Category`;

-- DropIndex
DROP INDEX `ChallengeLikes_challenge_id_fkey` ON `ChallengeLikes`;

-- DropIndex
DROP INDEX `ChallengeLikes_user_id_fkey` ON `ChallengeLikes`;

-- DropIndex
DROP INDEX `Challenge_Category_category_id_fkey` ON `Challenge_Category`;

-- DropIndex
DROP INDEX `Challenge_Category_challenge_id_fkey` ON `Challenge_Category`;

-- DropIndex
DROP INDEX `Challenge_Keyword_challenge_id_fkey` ON `Challenge_Keyword`;

-- DropIndex
DROP INDEX `Challenge_Keyword_keyword_id_fkey` ON `Challenge_Keyword`;

-- DropIndex
DROP INDEX `Challenges_owner_id_fkey` ON `Challenges`;

-- DropIndex
DROP INDEX `Comments_post_id_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `Comments_user_id_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `Comments_verification_id_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `Conditions_badge_id_fkey` ON `Conditions`;

-- DropIndex
DROP INDEX `Follows_following_id_fkey` ON `Follows`;

-- DropIndex
DROP INDEX `Frequencies_challenge_id_fkey` ON `Frequencies`;

-- DropIndex
DROP INDEX `KickOuts_userChallenge_id_fkey` ON `KickOuts`;

-- DropIndex
DROP INDEX `Messages_receivedUser_id_fkey` ON `Messages`;

-- DropIndex
DROP INDEX `Messages_sendUser_id_fkey` ON `Messages`;

-- DropIndex
DROP INDEX `PostLikes_post_id_fkey` ON `PostLikes`;

-- DropIndex
DROP INDEX `PostLikes_user_id_fkey` ON `PostLikes`;

-- DropIndex
DROP INDEX `Posts_board_id_fkey` ON `Posts`;

-- DropIndex
DROP INDEX `Posts_user_id_fkey` ON `Posts`;

-- DropIndex
DROP INDEX `Scraps_scrapTarget1_id_fkey` ON `Scraps`;

-- DropIndex
DROP INDEX `Scraps_scrapTarget2_id_fkey` ON `Scraps`;

-- DropIndex
DROP INDEX `Scraps_user_id_fkey` ON `Scraps`;

-- DropIndex
DROP INDEX `TemporaryVerifications_user_id_fkey` ON `TemporaryVerifications`;

-- DropIndex
DROP INDEX `TemporaryVerifications_verification_id_fkey` ON `TemporaryVerifications`;

-- DropIndex
DROP INDEX `User_Badge_badge_id_fkey` ON `User_Badge`;

-- DropIndex
DROP INDEX `User_Badge_user_id_fkey` ON `User_Badge`;

-- DropIndex
DROP INDEX `User_Badge_Condition_condition_id_fkey` ON `User_Badge_Condition`;

-- DropIndex
DROP INDEX `User_Badge_Condition_userBadge_id_fkey` ON `User_Badge_Condition`;

-- DropIndex
DROP INDEX `User_CategoryType_category_id_fkey` ON `User_CategoryType`;

-- DropIndex
DROP INDEX `User_CategoryType_favorType_id_fkey` ON `User_CategoryType`;

-- DropIndex
DROP INDEX `User_CategoryType_user_id_fkey` ON `User_CategoryType`;

-- DropIndex
DROP INDEX `User_Challenge_challenge_id_fkey` ON `User_Challenge`;

-- DropIndex
DROP INDEX `User_Challenge_user_id_fkey` ON `User_Challenge`;

-- DropIndex
DROP INDEX `User_Goal_goal_id_fkey` ON `User_Goal`;

-- DropIndex
DROP INDEX `Users_userBadge1_id_fkey` ON `Users`;

-- DropIndex
DROP INDEX `Users_userBadge2_id_fkey` ON `Users`;

-- DropIndex
DROP INDEX `Users_userBadge3_id_fkey` ON `Users`;

-- DropIndex
DROP INDEX `Verifications_userChallenge_id_fkey` ON `Verifications`;

-- DropIndex
DROP INDEX `Verifications_user_id_fkey` ON `Verifications`;
