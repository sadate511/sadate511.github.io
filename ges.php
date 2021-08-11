<?php
$cnx = mysqli_connect("localhost", "root", "", "senmoneydb");
$query = 'SELECT id, numero FROM compte';
$result = mysqli_query($cnx, $query);
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));