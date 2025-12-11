use  `ajax`;

CREATE TABLE IF NOT EXISTS `vehiculos` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`marca` varchar(50) not null,
	`modelo` varchar(50) not null,
	`combustible` varchar(20) not null,
	`cilindrada` varchar(50) NOT NULL,
	`numPuertas` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`marca`, `modelo`, `combustible`, `cilindrada`, `numPuertas`) VALUES
('Ford', 'Focus', 'Gasolina', '1200', '5'),
('Ford', 'Kuga', 'Diesel', '1600', '5'),
('BMW', 'X5', 'Diesel', '2000', '5'),
('Renault', 'Megane', 'Gasolina', '1200', '5'),
('Renault', 'Clio', 'Gasolina', '1000', '3');

