-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-01-2020 a las 20:50:40
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ajax`
--
CREATE DATABASE IF NOT EXISTS `ajax` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `ajax`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE `alumnos` (
  `idAlumno` int(11) NOT NULL,
  `alumno` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `puntuacion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `alumno`, `puntuacion`) VALUES
(1, 'oscar', 8),
(2, 'María', 6),
(3, 'jesús', 4),
(4, 'Antonio', 2),
(5, 'Alicia', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros`
--

DROP TABLE IF EXISTS `centros`;
CREATE TABLE `centros` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombrecentro` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `provincia` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `fechavisita` date NOT NULL,
  `numvisitantes` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `centros`
--

INSERT INTO `centros` (`id`, `nombrecentro`, `localidad`, `provincia`, `telefono`, `fechavisita`, `numvisitantes`) VALUES
(1, 'IES Ramon Mª Aller Ulloa', 'Lalin', 'Pontevedra', '986780114', '2010-11-26', 90),
(2, 'IES A Piringalla', 'Lugo', 'Lugo', '982212010', '2010-11-26', 85),
(3, 'IES San Clemente', 'Santiago de Compostela', 'A Coruña', '981580496', '2010-11-26', 60),
(4, 'IES de Teis', 'Vigo', 'Pontevedra', '986373811', '2010-11-27', 72),
(6, 'IES Cruceiro Baleares', 'Culleredo', 'A Coruña', '981660700', '2010-11-26', 30),
(7, 'IES Leliadoura', 'Ribeira', 'A Coruña', '981874633', '2010-11-25', 50),
(9, 'IES As Lagoas', 'Ourense', 'Ourense', '988391325', '2010-11-26', 35),
(10, 'IES As Fontiñas', 'Santiago de Compostela', 'A Coruña', '981573440', '2010-11-27', 64);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`);

--
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `centros`
--
ALTER TABLE `centros`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
