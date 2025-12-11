<?php
$c = isset($_POST['c']) ? (float)$_POST['c'] : 0;
$f = $c * 9/5 + 32;
echo $f;
?>
