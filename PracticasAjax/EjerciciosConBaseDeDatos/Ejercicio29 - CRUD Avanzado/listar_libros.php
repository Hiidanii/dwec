<?php
require '../db.php';

// Parámetros seguros y normalización
$pagina = max(1, (int)($_GET['pagina'] ?? 1));
$limite = 10;
$offset = ($pagina - 1) * $limite;

$busqueda = $_GET['busqueda'] ?? '';
$ano_min = isset($_GET['ano_min']) ? (int)$_GET['ano_min'] : 0;
$ano_max = isset($_GET['ano_max']) ? (int)$_GET['ano_max'] : 9999;
$precio_min = isset($_GET['precio_min']) ? (float)$_GET['precio_min'] : 0;
$precio_max = isset($_GET['precio_max']) ? (float)$_GET['precio_max'] : 999999;
$orden = $_GET['orden'] ?? 'titulo';

// Whitelist de columnas permitidas para ORDER BY (evita inyección SQL)
$allowed = ['id','titulo','autor','editorial','ano','precio'];
if (!in_array($orden, $allowed, true)) {
    $orden = 'titulo';
}

header('Content-Type: application/json; charset=utf-8');

try {
    // Consulta para contar total (paginación)
    $countSql = "
        SELECT COUNT(*) AS total FROM libros
        WHERE (titulo LIKE ? OR autor LIKE ? OR editorial LIKE ?)
        AND ano BETWEEN ? AND ?
        AND precio BETWEEN ? AND ?
    ";
    $countStmt = $conexion->prepare($countSql);
    $like = "%$busqueda%";
    $countStmt->bindValue(1, $like, PDO::PARAM_STR);
    $countStmt->bindValue(2, $like, PDO::PARAM_STR);
    $countStmt->bindValue(3, $like, PDO::PARAM_STR);
    $countStmt->bindValue(4, $ano_min, PDO::PARAM_INT);
    $countStmt->bindValue(5, $ano_max, PDO::PARAM_INT);
    $countStmt->bindValue(6, $precio_min); // no PARAM_FLOAT
    $countStmt->bindValue(7, $precio_max);
    $countStmt->execute();
    $total = (int)$countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Consulta principal con LIMIT/OFFSET bindeados como enteros
    $sql = "
        SELECT * FROM libros
        WHERE (titulo LIKE ? OR autor LIKE ? OR editorial LIKE ?)
        AND ano BETWEEN ? AND ?
        AND precio BETWEEN ? AND ?
        ORDER BY `$orden` ASC
        LIMIT ? OFFSET ?
    ";
    $stmt = $conexion->prepare($sql);
    $stmt->bindValue(1, $like, PDO::PARAM_STR);
    $stmt->bindValue(2, $like, PDO::PARAM_STR);
    $stmt->bindValue(3, $like, PDO::PARAM_STR);
    $stmt->bindValue(4, $ano_min, PDO::PARAM_INT);
    $stmt->bindValue(5, $ano_max, PDO::PARAM_INT);
    $stmt->bindValue(6, $precio_min);
    $stmt->bindValue(7, $precio_max);
    $stmt->bindValue(8, (int)$limite, PDO::PARAM_INT);
    $stmt->bindValue(9, (int)$offset, PDO::PARAM_INT);

    $stmt->execute();
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['libros' => $libros, 'total' => $total]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
