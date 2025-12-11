<?php
$a = isset($_GET['a']) ? (float)$_GET['a'] : 0;
$b = isset($_GET['b']) ? (float)$_GET['b'] : 0;
echo $a + $b;
?>
