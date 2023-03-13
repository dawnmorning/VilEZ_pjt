CREATE DATABASE  IF NOT EXISTS `vilez` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vilez`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: i8d111.p.ssafy.io    Database: vilez
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `share_user_id` int NOT NULL,
  `not_share_user_id` int NOT NULL,
  `appointment_start` date NOT NULL,
  `appointment_end` date NOT NULL,
  `state` int DEFAULT '0',
  `type` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  KEY `fk_appointment_user_idx` (`share_user_id`),
  KEY `fk_appointment_not_user_idx` (`not_share_user_id`),
  CONSTRAINT `fk_appointment_not_user` FOREIGN KEY (`not_share_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_appointment_share_user` FOREIGN KEY (`share_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,3,1,'2023-02-15','2023-02-21',-1,2,'2023-02-15 07:10:49'),(2,8,4,7,'2023-02-15','2023-02-18',-1,2,'2023-02-15 08:11:45'),(3,7,4,7,'2023-02-15','2023-02-21',0,2,'2023-02-15 08:11:52'),(4,6,4,7,'2023-02-15','2023-02-22',0,2,'2023-02-15 08:11:58'),(5,5,4,7,'2023-02-15','2023-02-23',0,2,'2023-02-15 08:12:56'),(6,4,4,7,'2023-02-24','2023-02-27',-1,2,'2023-02-15 08:13:01'),(7,3,4,7,'2023-02-15','2023-02-22',0,2,'2023-02-15 08:13:08'),(8,9,4,7,'2023-02-15','2023-03-04',0,2,'2023-02-15 08:17:46'),(9,2,7,4,'2023-02-15','2023-02-25',0,1,'2023-02-15 08:21:14'),(10,1,3,8,'2023-02-15','2023-02-22',0,2,'2023-02-15 08:40:11'),(11,10,3,9,'2023-02-15','2023-02-22',0,2,'2023-02-15 14:01:28'),(12,11,9,3,'2023-02-17','2023-02-23',-2,2,'2023-02-15 14:03:44'),(13,4,4,7,'2023-02-16','2023-03-04',-1,2,'2023-02-15 16:29:42'),(14,4,4,7,'2023-02-16','2023-03-03',0,2,'2023-02-15 16:31:26'),(15,13,12,8,'2023-02-16','2023-02-19',-2,2,'2023-02-16 01:32:14'),(16,14,14,13,'2023-02-16','2023-03-03',0,2,'2023-02-16 01:35:23'),(17,14,14,1,'2023-03-04','2023-03-19',0,2,'2023-02-16 01:40:42'),(18,4,13,14,'2023-03-24','2023-03-31',0,1,'2023-02-16 01:58:36'),(19,1,3,1,'2023-02-24','2023-03-02',-1,2,'2023-02-16 05:17:45'),(20,17,23,3,'2023-02-16','2023-02-17',-1,2,'2023-02-16 06:29:20'),(21,1,3,23,'2023-04-20','2023-04-29',0,2,'2023-02-16 06:38:59'),(22,18,3,24,'2023-02-16','2023-02-22',-1,2,'2023-02-16 07:31:53'),(23,19,24,3,'2023-02-17','2023-02-24',-1,2,'2023-02-16 07:41:57'),(24,19,24,3,'2023-02-16','2023-02-23',-1,2,'2023-02-16 08:00:18'),(25,5,4,10,'2023-02-24','2023-03-04',-2,2,'2023-02-16 08:11:46'),(26,16,5,6,'2023-02-20','2023-02-24',-2,2,'2023-02-16 12:04:04');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ask_board`
--

DROP TABLE IF EXISTS `ask_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ask_board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(300) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hope_area_lat` varchar(20) NOT NULL,
  `hope_area_lng` varchar(20) NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `state` int NOT NULL DEFAULT '0',
  `address` varchar(200) DEFAULT '"확인불가"',
  PRIMARY KEY (`id`),
  KEY `fk_shared_stuff_user_idx` (`user_id`),
  CONSTRAINT `fk_shared_stuff_user0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ask_board`
--

LOCK TABLES `ask_board` WRITE;
/*!40000 ALTER TABLE `ask_board` DISABLE KEYS */;
INSERT INTO `ask_board` VALUES (1,6,'여가/생활편의','티빙 계정 공유할 분 찾아요','티빙 계정 같이 공유하실 분 찾아요 !!','2023-02-15 16:31:02','36.106559776931','128.4227761265404','2023-02-15','2023-07-26',0,'경북 구미시 인의동 387-2'),(2,4,'디지털/가전','갤럭시 핸드폰 잠시만 빌려주세요','갤럭시 핸드폰 기종 상관없이 아무거나 필요해요!\n지금 빌려주실 수 있는 분 바로 채팅 부탁드립니다 감사합니다!','2023-02-15 17:20:30','36.10248146486325','128.42321337120225','2023-02-15','2023-03-04',0,'경북 구미시 인의동 849-6'),(3,12,'화장품/미용','나 구미로 해줘...구경하고싶어....','GU GEONG HAL LE','2023-02-16 09:40:15','35.157047382453406','128.66922400644398','2023-02-16','2023-02-17',-1,'경남 창원시 진해구 태백동 13-15'),(4,14,'출산/육아','실습코치 첼시 인형 훔쳐주실분','저거 맨날 쳐다보고 인스타올린다고 꼴보기 싫어서 요청드립니다~~^^','2023-02-16 10:54:35','36.10710877505393','128.41598981379735','2023-02-16','2023-02-24',0,'경북 구미시 임수동 94-1');
/*!40000 ALTER TABLE `ask_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ask_board_imgs`
--

DROP TABLE IF EXISTS `ask_board_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ask_board_imgs` (
  `board_id` int NOT NULL,
  `path` varchar(500) NOT NULL,
  PRIMARY KEY (`path`),
  KEY `fk_board_imgs_ask_board1_idx` (`board_id`),
  CONSTRAINT `fk_board_imgs_ask_board1` FOREIGN KEY (`board_id`) REFERENCES `ask_board` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ask_board_imgs`
--

LOCK TABLES `ask_board_imgs` WRITE;
/*!40000 ALTER TABLE `ask_board_imgs` DISABLE KEYS */;
/*!40000 ALTER TABLE `ask_board_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ask_view`
--

DROP TABLE IF EXISTS `ask_view`;
/*!50001 DROP VIEW IF EXISTS `ask_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ask_view` AS SELECT 
 1 AS `id`,
 1 AS `user_id`,
 1 AS `category`,
 1 AS `title`,
 1 AS `content`,
 1 AS `date`,
 1 AS `hope_area_lat`,
 1 AS `hope_area_lng`,
 1 AS `start_day`,
 1 AS `end_day`,
 1 AS `state`,
 1 AS `nickname`,
 1 AS `manner`,
 1 AS `address`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `my_share`
--

DROP TABLE IF EXISTS `my_share`;
/*!50001 DROP VIEW IF EXISTS `my_share`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `my_share` AS SELECT 
 1 AS `appointment_id`,
 1 AS `board_id`,
 1 AS `title`,
 1 AS `hope_area_lat`,
 1 AS `hope_area_lng`,
 1 AS `start_day`,
 1 AS `end_day`,
 1 AS `date`,
 1 AS `appointment_start`,
 1 AS `appointment_end`,
 1 AS `share_user_id`,
 1 AS `not_share_user_id`,
 1 AS `share_state`,
 1 AS `appointment_state`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `board_id` int NOT NULL,
  `share_user_id` int NOT NULL,
  `not_share_user_id` int NOT NULL,
  `state` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_room_user_idx` (`share_user_id`),
  KEY `fk_room_user2_idx` (`not_share_user_id`),
  CONSTRAINT `fk_room_user` FOREIGN KEY (`share_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_room_user2` FOREIGN KEY (`not_share_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,2,1,3,1,-1),(2,2,7,4,1,-1),(3,2,3,4,1,-1),(4,1,1,1,6,-1),(5,1,1,4,6,-1),(6,2,2,1,5,-1),(7,2,8,4,7,-1),(8,2,7,4,7,0),(9,2,6,4,7,0),(10,2,5,4,7,0),(11,2,4,4,7,-1),(12,2,3,4,7,0),(13,2,9,4,7,0),(14,1,2,7,4,0),(15,2,1,3,8,-1),(16,2,1,3,8,0),(17,2,1,3,1,-1),(18,2,9,4,5,-1),(19,2,9,4,5,-1),(20,2,10,3,9,0),(21,2,9,4,5,-1),(22,2,11,9,3,-1),(23,2,4,4,7,-1),(24,2,4,4,7,0),(25,2,5,4,5,-1),(26,2,4,4,9,0),(27,2,12,9,11,-1),(28,2,12,9,11,0),(29,2,12,9,12,-1),(30,2,6,4,12,0),(31,2,13,12,8,-1),(32,2,14,14,13,0),(33,2,14,14,15,0),(34,2,14,14,1,0),(35,2,15,1,14,0),(36,1,4,13,14,0),(37,2,15,1,8,-1),(38,2,1,3,1,-1),(39,2,15,1,15,0),(40,2,17,23,3,-1),(41,2,1,3,23,0),(42,2,18,3,24,-1),(43,2,19,24,3,-1),(44,2,19,24,3,-1),(45,2,19,24,3,-1),(46,2,19,24,3,-1),(47,2,5,4,10,-1),(48,2,15,1,24,0),(49,2,5,4,10,0),(50,1,1,5,6,-1),(51,2,16,5,6,-1);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharing_board`
--

DROP TABLE IF EXISTS `sharing_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sharing_board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(300) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hope_area_lat` varchar(20) NOT NULL,
  `hope_area_lng` varchar(20) NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `state` int NOT NULL DEFAULT '0',
  `address` varchar(200) DEFAULT '"확인불가"',
  PRIMARY KEY (`id`),
  KEY `fk_shared_stuff_user_idx` (`user_id`),
  CONSTRAINT `fk_shared_stuff_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharing_board`
--

LOCK TABLES `sharing_board` WRITE;
/*!40000 ALTER TABLE `sharing_board` DISABLE KEYS */;
INSERT INTO `sharing_board` VALUES (1,3,'여가/생활편의','드라이버 공유합니다.','집에서 굴러다니는 드라이버 공유합니다 ㅠㅠ\n꼭 필요하신분들 사용하세요!!','2023-02-15 16:06:46','36.104659736212085','128.41924391534093','2023-02-15','2023-02-22',0,'경북 구미시 진평동 623-1'),(2,1,'디지털/가전','아이패드 공유합니다~','안녕하세여 주먹밥 정은이에여~\n제가 주먹밥 만큼 좋아하는게 아이패드 인데여\n이런 아이패드가 지금 먼지만 쌓여가는게 넘 맘아파요.....\n공유해서 새로운 사람도 만나고 같이 친하게 지내고 싶어요~','2023-02-15 16:07:39','36.106835012682','128.42312256604865','2023-02-15','2023-04-01',0,'경북 구미시 인의동 387-2'),(3,4,'여가/생활편의','전동드릴 빌려드려요?','전동드릴 빌려드립니다~\n만남 장소는 아래 지도 확인해주세요^^\n인동초등학교 근처입니다','2023-02-15 16:12:16','36.105532782654016','128.4242678424311','2023-02-19','2023-03-04',0,'경북 구미시 인의동 483'),(4,4,'여가/생활편의','50m 줄자 빌려드릴게요! 두 개 있어요','줄자 빌려드릴게요!\n파란색 한 개 노란색 한 개 있습니다.\n채팅 주세요?','2023-02-15 16:14:08','36.10726742649311','128.41781387395588','2023-02-19','2023-03-18',0,'경북 구미시 진평동 1023-2'),(5,4,'여가/생활편의','기타 공유할게요','통기타 공유합니다\n상태 좋고 소리 잘 납니다ㅎㅎ','2023-02-15 16:24:15','36.10632619447242','128.40284985588391','2023-02-15','2023-03-04',0,'경북 구미시 임수동 92-30'),(6,4,'디지털/가전','삼성 무선 마우스 빌려가실분','삼성 무선 마우스 검정색입니다\n급하게 필요하신 분들 빌려가시면 좋을 것 같아요!\n강동교회 근처에서 만나길 희망합니다?','2023-02-15 16:25:32','36.104502992265914','128.41916336351488','2023-02-15','2023-03-04',0,'경북 구미시 진평동 623-1'),(7,4,'디지털/가전','c타입 고속 충전기 공유해요!','C타입 고속 충전기 공유합니다\n공유 장소는 채팅으로 조율해봐요ㅎㅎ\n편하게 채팅 주세요!','2023-02-15 16:29:16','36.10656109552384','128.42266510188','2023-02-19','2023-03-18',0,'경북 구미시 인의동 387-2'),(8,4,'생활/건강','치약 지금 당장 필요한 사람 찾습니다!','치약 한번 필요하신 분~ 빌려드릴게요\n현재 삼성전자 후문 근처에 있습니다\n채팅 주세요!','2023-02-15 16:36:15','36.10604675727882','128.41892462145813','2023-02-15','2023-03-04',0,'경북 구미시 진평동 985-35'),(9,4,'스포츠/레저','테니스 라켓 공유해요','테니스 라켓 필요하신 분 빌려가세요~\n인동 도서관 근처에서 뵈어요','2023-02-15 17:16:48','36.09919624048228','128.4236426796644','2023-02-15','2023-03-04',0,'경북 구미시 진평동 14'),(10,3,'식품','당근 공유합니다.','제가 당근을 너무 좋아해서 ㅎㅎ \n많이 샀는데 20톤을 사버렸네요 ㅠㅠ\n','2023-02-15 23:00:02','36.09928481752528','128.42528764275642','2023-02-16','2023-02-22',0,'경북 구미시 진평동 198'),(11,9,'디지털/가전','안타는 킥보드 공유합니다','집에 두니 방치라 잠시 빌려드링게요 ','2023-02-15 23:03:09','36.098289489746094','128.42596435546875','2023-02-16','2023-02-28',0,'경북 구미시 진평동 11-10'),(12,9,'식품','발렌타인데이 초콜릿 공유합니다','달달합니당','2023-02-16 09:25:48','36.10752868652344','128.41941833496094','2023-02-16','2023-02-23',0,'경북 구미시 황상동 312-1'),(13,12,'스포츠/레저','애마 람보루귀니 빌려드립니다.','색이 질려서 별로 안 타고 싶네요.','2023-02-16 09:55:00','36.10181128264788','128.41893727737235','2023-02-16','2023-02-19',0,'경북 구미시 진평동 333-4'),(14,14,'가구/인테리어','실습코치 나눔합니다.','하루종일 EPL 첼시 패배 경기 보느라 업무는 안해서, 그냥 넘겨버립니다.\n\n- 첼시 강등 기원 142일차 -','2023-02-16 10:32:07','36.107149753279266','128.41633480244255','2023-02-17','2027-12-04',0,'경북 구미시 임수동 94-1'),(15,1,'여가/생활편의','저 공유합니다~ (주먹밥정은)','저 주먹밥 먹는거 제일 자신있구요.\n누구보다 귀에 피나실 정도로 떠드는거 자신있습니다.\n\n스펙 :\n- 토익 : 100점\n- 한국사 1급 : 불합격\n- Window 그림판 : 상','2023-02-16 10:46:22','36.10910068201418','128.41213874699963','2023-02-16','2023-03-04',0,'경북 구미시 임수동 94-1'),(16,5,'가구/인테리어','허먼밀러 의자 공유드려요','허먼밀러 의자 공유드려요 ~\n\n허먼밀러 뉴 에어론 풀 의자 B 제품이고, 쿠팡에서 200만원주고 구매했어요 !\n\n깨끗하게 써주실분 최대 5일 빌려드릴 수 있어요 ^-^\n\n편하게 채팅 주세요~','2023-02-16 11:01:39','36.10611258452949','128.41869260500025','2023-02-20','2023-03-04',0,'경북 구미시 진평동 985-35'),(17,23,'디지털/가전','갤럭시 S22 공유해요','저는 이번에 s23 살거라 갤럭시 써보고 싶으신 분들 연락주세요^^','2023-02-16 15:12:49','36.10688400268555','128.4180908203125','2023-02-16','2023-03-31',0,'경북 구미시 진평동 1024-1'),(18,3,'화장품/미용','시연용 테스트글','시연용 테스트글','2023-02-16 16:20:07','36.10612198838639','128.41865945975928','2023-02-16','2023-02-23',-1,'경북 구미시 진평동 1035'),(19,24,'화장품/미용','시연용','ㅇㅇ','2023-02-16 16:36:23','36.1063232421875','128.4192352294922','2023-02-16','2023-02-28',0,'경북 구미시 진평동 1021-11');
/*!40000 ALTER TABLE `sharing_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharing_board_imgs`
--

DROP TABLE IF EXISTS `sharing_board_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sharing_board_imgs` (
  `board_id` int NOT NULL,
  `path` varchar(500) NOT NULL,
  PRIMARY KEY (`path`,`board_id`),
  KEY `fk_sharing_board_imgs_sharing_board1_idx` (`board_id`),
  CONSTRAINT `fk_sharing_board_imgs_sharing_board1` FOREIGN KEY (`board_id`) REFERENCES `sharing_board` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharing_board_imgs`
--

LOCK TABLES `sharing_board_imgs` WRITE;
/*!40000 ALTER TABLE `sharing_board_imgs` DISABLE KEYS */;
/*!40000 ALTER TABLE `sharing_board_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sharing_view`
--

DROP TABLE IF EXISTS `sharing_view`;
/*!50001 DROP VIEW IF EXISTS `sharing_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `sharing_view` AS SELECT 
 1 AS `id`,
 1 AS `user_id`,
 1 AS `category`,
 1 AS `title`,
 1 AS `content`,
 1 AS `date`,
 1 AS `hope_area_lat`,
 1 AS `hope_area_lng`,
 1 AS `start_day`,
 1 AS `end_day`,
 1 AS `state`,
 1 AS `nickname`,
 1 AS `manner`,
 1 AS `address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(500) NOT NULL,
  `password` varchar(120) NOT NULL,
  `nickname` varchar(500) NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `point` int DEFAULT '100',
  `manner` int DEFAULT '21',
  `profile_img` varchar(100) DEFAULT 'https://kr.object.ncloudstorage.com/vilez/basicProfile.png',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `oauth` varchar(45) DEFAULT NULL,
  `access_token` varchar(45) DEFAULT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `state` int DEFAULT '0',
  `area_lng` varchar(45) DEFAULT NULL,
  `area_lat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2639167170','b7096242425625909b63cb58d09ce653c5a9944e05d9c0f0ac1e578affa090e7','주먹밥정은','cAQN9-etR4u5XtaS0RtjRo:APA91bEjJCZvACPSIWVZkR-5B6Wr6fHSL21HBRzDmbBus3R-PdPjIevixBMzYlz-9j7rntff3pc6XpwAyfkDqGyt7KqvpQik36OHdMOX3ulHtdvL-MqtJ2spIdrgpSzN7ONkHHjZY_oS',10,27,'https://kr.object.ncloudstorage.com/vilez/profile/1232096641774085.png','2023-02-15 16:04:47','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoi7KO866i567Cl7KCV7J2AIiwiZXhwaXJlIjoxNjg0MzEzNDExNzc0LCJpYXQiOjE2NzY1Mzc0MTF9.WppRbgoOJsHwdKxXCnUOvOHErTL6-lXWHtAJJWSII5c',0,'128.4164316','36.1071628'),(2,'2654512607','d800c67a4759435cb526e8c445330a4ba090ebd83b916618e2f6aaf62bedd60b','쿵이',NULL,100,21,'http://k.kakaocdn.net/dn/bV9Hhb/btrX8iapahC/XTLYouidNP95kjTFyGAo51/img_640x640.jpg','2023-02-15 16:04:47','kakao',NULL,'',0,NULL,NULL),(3,'2661401058','d3271e5e95c2efbb300dd29c17c905153b3a754ea9c590409b14f5d8c7204ff6','종혁쿤','c3_9e5_vS1GnjVvOCXR5Ls:APA91bFu_IoQLrRyFG-OnNUB1GXrBrDRAuM04Qz21Ru7qxkgGWvHsjS8K78Pi6tLK74SRxPbjMqREiKGzkOloX6-1xH9iYQ6DdkQdyBcjb5craJcCJAiIvLRKl7bG8nR7gpmdv2LuB-e',160,30,'https://kr.object.ncloudstorage.com/vilez/profile/1232088491955717.png','2023-02-15 16:04:54','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsIm5pY2tuYW1lIjoi7KKF7ZiB7L-kIiwiZXhwaXJlIjoxNjg0MzI5MjIyOTY3LCJpYXQiOjE2NzY1NTMyMjJ9.yfAl0U5gqKLXmAqF-6DjHGfcclfMtPAwVXxauGyyAOM',0,'128.4165773679551','36.107198288361566'),(4,'2639181936','64b04818bf9bd4009937a6f4f938b9c7ec57b0a0cd9b38076e9abe09cdf362bb','이웃','ewZrB0nMQ3a4HXAYi0E3ua:APA91bFRWfUgM8MNrJLcLMzZr73b4jhzEfvV5TLi-gV0EjmDwvCNDF-UGAcmFKQ5yQkpLobNi24bwnhd0gjTQ0_piS0UqezVJebyhxIZ4gtgaf8Hjay-pBzqFQ0JWKeYDhkcij_iPvwd',340,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-15 16:08:38','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQsIm5pY2tuYW1lIjoi7J207JuDIiwiZXhwaXJlIjoxNjg0MzI1OTQ4MjA1LCJpYXQiOjE2NzY1NDk5NDh9.Mgkfti_qhCuYmG3se-Cs9PUoumkYtsKioaYPQ665TuQ',0,'128.4164235','36.1071521'),(5,'jeeun1208@gmail.com','55c723f2557144148c0bc5fc5fdb46cf19098aa44061f3ed7623b67445430608','지은',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-15 16:11:59',NULL,NULL,'',0,'128.41654626694447','36.10711996900121'),(6,'jeeun1208@naver.com','55c723f2557144148c0bc5fc5fdb46cf19098aa44061f3ed7623b67445430608','동길',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/profile/1233002206863869.jpg','2023-02-15 16:19:46',NULL,NULL,'',0,'128.41664217608908','36.10719671711559'),(7,'hororolorlor@naver.com','77903f98fdcb2fbfbb445712dd20b9c1b1740a0ec2c1953381d840f17bf2c129','현영',NULL,9849,33,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-15 17:08:48',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsIm5pY2tuYW1lIjoi7ZiE7JiBIiwiZXhwaXJlIjoxNjg0MzEzNTYyNjY0LCJpYXQiOjE2NzY1Mzc1NjJ9.nNN1kF2IhGMNwR6Dhj7VJD-ClVEZMt0Ugx6PwI25kD8',0,'128.4192837','36.1040952'),(8,'_-EtTn93NojcSUlpnSmkbnGGUI6w2rN8LA8G-PPEIZo','6cc3b464e4ef69d7996d381e20354bdb487c017a441e3e4c9fbd9842ffa4c132','진짜정은임','dJcH8KPNTr2bUm7oOJ3j-I:APA91bF4x8ncw-_r-pHZ_usODvtv0zFIzzh_ehGbqhC0R3jXzmpP28LMRAMZXSnswm2iLFQp1N9nmqu_PYB0Cs1yZfK97wcUfjvalMIC3bP97kFBScJ5KC5ccOoX8hK1WaG4YfZtJRrH',70,21,'https://kr.object.ncloudstorage.com/vilez/profile/1316110667491534.png','2023-02-15 17:35:58','naver',NULL,'',0,'128.4164454','36.1071573'),(9,'gch03944@gmail.com','937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244','홍길동무','c3_9e5_vS1GnjVvOCXR5Ls:APA91bFu_IoQLrRyFG-OnNUB1GXrBrDRAuM04Qz21Ru7qxkgGWvHsjS8K78Pi6tLK74SRxPbjMqREiKGzkOloX6-1xH9iYQ6DdkQdyBcjb5craJcCJAiIvLRKl7bG8nR7gpmdv2LuB-e',70,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-15 22:54:36','',NULL,'',0,'128.4164456','36.1071616'),(10,'notify9637@naver.com','72ab994fa2eb426c051ef59cad617750bfe06d7cf6311285ff79c19c32afd236','밥먹고올게',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 09:02:09',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEwLCJuaWNrbmFtZSI6IuuwpeuoueqzoOyYrOqyjCIsImV4cGlyZSI6MTY4NDMyNjk3MzQzMywiaWF0IjoxNjc2NTUwOTczfQ.Pyuubu9-NeRl7igsrDi_95Nz93vlyY-Lb4Nuet7TeMQ',0,'128.41553838754922','36.108108108108105'),(11,'2668127751','6878ad1b22392d70d04ea1d55c79c88cd697b5bd3318c06943714102bed42943','hihi',NULL,100,21,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','2023-02-16 09:27:11','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjExLCJuaWNrbmFtZSI6ImhpaGkiLCJleHBpcmUiOjE2ODQyOTU5OTY2ODMsImlhdCI6MTY3NjUxOTk5Nn0.BCCQ_IW2oVg1VW2pswstABopCg8h21M1RNgsubUpxXQ',0,'128.4164904','36.1070868'),(12,'2668135019','06b62b75b815c5c61faf2c64c7801d324c984ea1fdcf10c1dbd315e9a42aa4d8','부왁정은','dsJj-vXkRnKXAqwXOv_cpX:APA91bFmgEN913hNJuIphrm_oHUBh-L-Oiq0k0wzJ2KUgKIPMwGxK73Vm_CJtUUylFUWx0y-0jwDOl109892lsShnSGY1OQjt_wdASvJFyEWl1BM_jAeUmedKVGjGk0uJ_1d5FqXOxTf',100,21,'http://k.kakaocdn.net/dn/bmTPQa/btrYqSwjeKl/MbmdBN8y30rGtigVBKCe9K/img_640x640.jpg','2023-02-16 09:34:15','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyLCJuaWNrbmFtZSI6Iuu2gOyZgeygleydgCIsImV4cGlyZSI6MTY4NDMxNDE4NDgxOCwiaWF0IjoxNjc2NTM4MTg0fQ.p7lZC5QeOluKZDtNufXaUnqW_zRdbgfQBVe3xDIjkBs',0,'128.6578218','35.1542827'),(13,'rIsJMMU0VBKH0zDxsL_oNJVjlNxwHIjl99whJdATkY0','2079cf2374ebf8021482a50fe75033599e5eca14b094556e309f0aa842eb44b6','실코 박승원',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/profile/1297931602416702.jpg','2023-02-16 10:22:16','naver',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEzLCJuaWNrbmFtZSI6IuyLpOy9lCDrsJXsirnsm5AiLCJleHBpcmUiOjE2ODQyODkyOTU4NjQsImlhdCI6MTY3NjUxMzI5NX0.u8hXZXB8cHCCMLqGQnjvinfiZxK4R2n6BJKZO9UljcU',0,'128.41675649867565','36.10732681963293'),(14,'p9a3r5k0@gmail.com','60e12537f06a7ce4805ef9d1ed55c369cb163ab723d12fc8e5c50f3f1a909c5a','실코박승원2',NULL,130,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 10:25:17',NULL,NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE0LCJuaWNrbmFtZSI6IuyLpOy9lOuwleyKueybkDIiLCJleHBpcmUiOjE2ODQyODk0NzExODEsImlhdCI6MTY3NjUxMzQ3MX0.MbOedXKfRHcIogVUH_HlWThNYFj_YuLnhqNlxfsErns',0,'128.41673307565497','36.107223463737185'),(15,'2664684280','28874373efe111724c712e89564805ac5d7e0e9fc9fc48127de39e318f56a9c8','지현이','dC4osXp7T9yJsxKiEIVJ-n:APA91bHODWFhpLx6cfrVyd2pw0cNcQ9WFZgIjhHQ4RjtbnnJqZRMNR2mC-dhIFdPrpZUULpgZLWov9SKKEmqXTUZUWayujllOSb0VAUVvnyHy6-DALo4SdQOso3O67jWbYZRmHs7LZoW',100,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 10:32:05','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE1LCJuaWNrbmFtZSI6IuyngO2YhOydtCIsImV4cGlyZSI6MTY4NDMwMTEyNjM3MiwiaWF0IjoxNjc2NTI1MTI2fQ.Cw1ee3ufBxW5fPjZm0oV0mcntkCrBZds3lVHmglTLUs',0,'128.4164526','36.1071503'),(16,'AwIoz6-Lx0D2brTQQHxMukwN09S01KROe1GWIkbJjy8','d5658fb5098b8b598962c2617ef5d7f224956a53f6d8112914899f185e3f7f41','봑장은',NULL,100,21,'https://ssl.pstatic.net/static/pwe/address/img_profile.png','2023-02-16 11:07:11','naver',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE2LCJuaWNrbmFtZSI6Iuu0keyepeydgCIsImV4cGlyZSI6MTY4NDI5NTk2NTQzMywiaWF0IjoxNjc2NTE5OTY1fQ.9PIL6yeS0f-t1J-iWfkMPIGFUapkoEAhHhzF2wCOFnU',0,NULL,NULL),(17,'y4HIzM-ih6hmOezTrFWJVCJAkaLsdszUAM8ebZMkMlQ','7f6bfdc41773339abfb76dc5027f2a578bfb10e42bd6e6e24359b6af4156946f','지현',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 12:01:04','naver',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE3LCJuaWNrbmFtZSI6IiNOQVZFUnk0SEl6TS1paDZobU9lelRyRldKVkNKQWthTHNkc3pVQU04ZWJaTWtNbFEiLCJleHBpcmUiOjE2ODQyOTI0NjQxMTEsImlhdCI6MTY3NjUxNjQ2NH0.ltP1wIXEp-33uRontytgxOz2MeI38XkYLs5wSIhmo68',0,NULL,NULL),(18,'2668323335','6c9d287703e555b83038522679168250388c908d5fa69e7d16b544d99c737d71','놀러왔어요',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/profile/1304063553015335.png','2023-02-16 12:03:52','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE4LCJuaWNrbmFtZSI6IuuGgOufrOyZlOyWtOyalCIsImV4cGlyZSI6MTY4NDI5MjkzMjIzMCwiaWF0IjoxNjc2NTE2OTMyfQ.DwGw-cXvHrnPWzkGB3CPL7t5J2yOyet_7aRMSVcuW-Q',0,'128.4164475','36.1071567'),(19,'2661407730','cca89da9015d477691eb92e85717334d33b28dac8db305c7d5e2fc71197cfece','밥먹고올게2',NULL,100,21,'http://k.kakaocdn.net/dn/bgb0DK/btrWfRNfu5F/dp86VKYANC2IqeeK7ggnd1/img_640x640.jpg','2023-02-16 12:39:38','kakao',NULL,'',0,NULL,NULL),(20,'4IShXc4G6pmA5q-sBFt4mzQrVzenXilPsYgjjSuVMyk','f63de933e10381c528a390c91fc2a49d65168b660e149a0a4a90f4c37b5c8b71','#NAVER4IShXc4G6pmA5q-sBFt4mzQrVzenXilPsYgjjSuVMyk',NULL,100,21,'https://phinf.pstatic.net/contact/20220730_168/1659109757894zscX3_JPEG/20220725_214412.jpg','2023-02-16 12:41:25','naver',NULL,'',0,NULL,NULL),(21,'DRdTKFS31HlrnXYTw9H-jNo_Lc9vSi2Ik6UiPp4VMQk','52ea9b6e5c220f243041ada774507a84b93d544452a169db9ba352d7b3303674','네이버선용',NULL,100,21,'https://ssl.pstatic.net/static/pwe/address/img_profile.png','2023-02-16 12:50:14','naver',NULL,'',0,NULL,NULL),(22,'test@naver.com','9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08','테스트계정',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/profile/1306973740944877.png','2023-02-16 12:51:31',NULL,NULL,'',0,'128.4164351','36.1071591'),(23,'2644350427','3f4adedd8e943666559415618965225b1ad7b88f41867866b3956f669d3114a5','진짜정은','dJcH8KPNTr2bUm7oOJ3j-I:APA91bF4x8ncw-_r-pHZ_usODvtv0zFIzzh_ehGbqhC0R3jXzmpP28LMRAMZXSnswm2iLFQp1N9nmqu_PYB0Cs1yZfK97wcUfjvalMIC3bP97kFBScJ5KC5ccOoX8hK1WaG4YfZtJRrH',100,24,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 15:10:12','kakao',NULL,'',0,'128.4164311','36.1071443'),(24,'je991025@gmail.com','312433c28349f63c4f387953ff337046e794bea0f9b9ebfcb08e90046ded9c76','나는정은','dJcH8KPNTr2bUm7oOJ3j-I:APA91bF4x8ncw-_r-pHZ_usODvtv0zFIzzh_ehGbqhC0R3jXzmpP28LMRAMZXSnswm2iLFQp1N9nmqu_PYB0Cs1yZfK97wcUfjvalMIC3bP97kFBScJ5KC5ccOoX8hK1WaG4YfZtJRrH',130,24,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 15:46:24','',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjI0LCJuaWNrbmFtZSI6IuuCmOuKlOygleydgCIsImV4cGlyZSI6MTY4NDMxMTM0MzcwOSwiaWF0IjoxNjc2NTM1MzQzfQ.fS1q70YJp16KvX4tyo_ILscI2KCa2IQ-h25NnvuR8Ug',0,'128.4163656','36.1071141'),(25,'gonii0821@naver.com','55c723f2557144148c0bc5fc5fdb46cf19098aa44061f3ed7623b67445430608','시연용 계정',NULL,100,21,'https://kr.object.ncloudstorage.com/vilez/basicProfile.png','2023-02-16 16:34:01',NULL,NULL,NULL,0,NULL,NULL),(26,'jfxzSWVBqXA4wCRjtzDtLed4-xdZgzrEIZ101s8UBDQ','86e658b625f463c06a5458c446dd378a16f49210dae9b420f26131fd61201690','#NAVERjfxzSWVBqXA4wCRjtzDtLed4-xdZgzrEIZ101s8UBDQ',NULL,100,21,'https://phinf.pstatic.net/contact/20201218_18/1608270269501rzhx5_JPEG/profileImage.jpg','2023-02-16 17:19:00','naver',NULL,'',0,NULL,NULL),(27,'2669085989','819a6787d92f0c8f2bc442885b123f29de682ce5aed6c16c28a04f196a3997e4','익명이','ddg9edpgT8GZf40FxcgpmO:APA91bHn5Kngay5CZwiyPfc19jTIDIVyxgIDC200jggytmzbNXwaZTgj1JfEBwdIjYhoQFCt6ZjUnw9TcoEa_gzXcK2z22B3eFv1oFrX7w_styzgW5zw_5vrzsyzt5HGjxcDeJjM-vua',100,21,'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','2023-02-16 21:17:42','kakao',NULL,'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjI3LCJuaWNrbmFtZSI6IuydteuqheydtCIsImV4cGlyZSI6MTY4NDMyNjEzMDM4NiwiaWF0IjoxNjc2NTUwMTMwfQ.4I-jcQcPNtjgO4s2SuV7Fnpk6q4HfIAtpgg0g7hyb6c',0,'128.4059341','36.1052766');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `ask_view`
--

/*!50001 DROP VIEW IF EXISTS `ask_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`14.46.142.%` SQL SECURITY DEFINER */
/*!50001 VIEW `ask_view` AS select `ask`.`id` AS `id`,`ask`.`user_id` AS `user_id`,`ask`.`category` AS `category`,`ask`.`title` AS `title`,`ask`.`content` AS `content`,`ask`.`date` AS `date`,`ask`.`hope_area_lat` AS `hope_area_lat`,`ask`.`hope_area_lng` AS `hope_area_lng`,`ask`.`start_day` AS `start_day`,`ask`.`end_day` AS `end_day`,`ask`.`state` AS `state`,`user`.`nickname` AS `nickname`,`user`.`manner` AS `manner`,`ask`.`address` AS `address` from (`ask_board` `ask` join `user` on((`ask`.`user_id` = `user`.`id`))) where ((`ask`.`state` <> -(1)) and (`user`.`state` <> -(1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `my_share`
--

/*!50001 DROP VIEW IF EXISTS `my_share`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`14.46.142.%` SQL SECURITY DEFINER */
/*!50001 VIEW `my_share` AS select `a`.`appointment_id` AS `appointment_id`,`a`.`board_id` AS `board_id`,`s`.`title` AS `title`,`s`.`hope_area_lat` AS `hope_area_lat`,`s`.`hope_area_lng` AS `hope_area_lng`,`s`.`start_day` AS `start_day`,`s`.`end_day` AS `end_day`,`s`.`date` AS `date`,`a`.`appointment_start` AS `appointment_start`,`a`.`appointment_end` AS `appointment_end`,`a`.`share_user_id` AS `share_user_id`,`a`.`not_share_user_id` AS `not_share_user_id`,`s`.`state` AS `share_state`,`a`.`state` AS `appointment_state` from ((select `sharing_board`.`id` AS `id`,`sharing_board`.`user_id` AS `user_id`,`sharing_board`.`category` AS `category`,`sharing_board`.`title` AS `title`,`sharing_board`.`content` AS `content`,`sharing_board`.`date` AS `date`,`sharing_board`.`hope_area_lat` AS `hope_area_lat`,`sharing_board`.`hope_area_lng` AS `hope_area_lng`,`sharing_board`.`start_day` AS `start_day`,`sharing_board`.`end_day` AS `end_day`,`sharing_board`.`state` AS `state` from `sharing_board`) `s` left join `appointment` `a` on((`a`.`board_id` = `s`.`id`))) where ((`s`.`state` <> -(1)) and (`a`.`state` <> -(1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sharing_view`
--

/*!50001 DROP VIEW IF EXISTS `sharing_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`14.46.142.%` SQL SECURITY DEFINER */
/*!50001 VIEW `sharing_view` AS select `sharing`.`id` AS `id`,`sharing`.`user_id` AS `user_id`,`sharing`.`category` AS `category`,`sharing`.`title` AS `title`,`sharing`.`content` AS `content`,`sharing`.`date` AS `date`,`sharing`.`hope_area_lat` AS `hope_area_lat`,`sharing`.`hope_area_lng` AS `hope_area_lng`,`sharing`.`start_day` AS `start_day`,`sharing`.`end_day` AS `end_day`,`sharing`.`state` AS `state`,`user`.`nickname` AS `nickname`,`user`.`manner` AS `manner`,`sharing`.`address` AS `address` from (`sharing_board` `sharing` join `user` on((`sharing`.`user_id` = `user`.`id`))) where ((`sharing`.`state` <> -(1)) and (`user`.`state` <> -(1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 22:16:12
