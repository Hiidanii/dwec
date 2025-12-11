GRANT USAGE ON * . * TO 'ajax'@'localhost' IDENTIFIED BY 'dbpass' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

CREATE DATABASE IF NOT EXISTS `ajax` ;

GRANT ALL PRIVILEGES ON `ajax` . * TO 'ajax'@'localhost';

use  `ajax`;


CREATE TABLE IF NOT EXISTS `libros` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `editorial` varchar(20) NOT NULL,
  `ano_publi` int(4) NOT NULL,
  `precio` int(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`titulo`, `autor`, `editorial`, `ano_publi`, `precio`) VALUES
('Madame Bovary', 'Gustave Flaubert', 'Anagrama', '1857', '5'),
('La educación sentimental', 'Gustave Flaubert', 'Anagrama', '1869', '5'),
('Romancero gitano', 'Federico García Lorca', 'Alianza', '1928', '12'),
('Cien años de soledad', 'Gabriel García Márquez', 'RM', '1967', '9'),
('El extranjero', 'Albert Camus', 'Taurus', '1942', '10');

