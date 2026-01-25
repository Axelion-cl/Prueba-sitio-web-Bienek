<?php
// Script de Diagnóstico Simple
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    "status" => "success", 
    "message" => "El servidor responde correctamente",
    "details" => "PHP está ejecutándose y los permisos son correctos."
]);
?>
