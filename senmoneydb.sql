-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 août 2021 à 13:10
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `senmoneydb`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE IF NOT EXISTS `compte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `solde` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id`, `numero`, `code`, `solde`) VALUES
(1, 777324572, 1234, 6285),
(2, 775676066, 1235, 46050),
(3, 773273434, 1236, 15625);
-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` int(11) NOT NULL,
  `id_compte_source` int(11) NOT NULL,
  `id_compte_destination` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_compte_source` (`id_compte_source`),
  KEY `fk_compte_destination` (`id_compte_destination`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `transaction`
--

INSERT INTO `transaction` (`id`, `montant`, `id_compte_source`, `id_compte_destination`, `date`) VALUES
(1, 50, 1, 6, '2021-08-05 00:00:00'),
(2, 5500, 1, 3, '2021-08-03 00:00:00'),
(3, 51, 1, 1, '0000-00-00 00:00:00'),
(4, 54, 1, 2, '2021-08-05 05:30:09'),
(5, 156, 1, 6, '2021-08-05 00:00:00'),
(6, 8000, 1, 6, '2021-08-05 07:00:30'),
(7, 5000, 2, 1, '2021-08-05 00:00:00'),
(8, 58, 1, 3, '2021-08-05 00:00:00'),
(9, 514, 1, 5, '2021-08-05 00:00:00'),
(10, 500, 2, 1, '2021-08-05 00:00:00'),
(11, 500, 2, 1, '2021-08-05 18:41:16'),
(12, 50, 1, 2, '2021-08-06 14:50:06'),
(13, 1125, 2, 3, '2021-08-06 14:50:49'),
(14, 500, 3, 4, '2021-08-06 14:51:32'),
(15, 550, 4, 1, '2021-08-06 14:52:11');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `fk_compte_destination` FOREIGN KEY (`id_compte_destination`) REFERENCES `compte` (`id`),
  ADD CONSTRAINT `fk_compte_source` FOREIGN KEY (`id_compte_source`) REFERENCES `compte` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
