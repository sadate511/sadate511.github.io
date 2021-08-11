<?php
$cnx = mysqli_connect("localhost", "root", "", "senmoneydb");
$id=$_POST['id'];
$code=$_POST['code'];

$query = ("UPDATE compte SET code = $code WHERE id = $id");
$result = mysqli_query($cnx, $query);

echo json_encode($_POST);