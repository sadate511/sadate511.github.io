<?php
$cnx = mysqli_connect("localhost", "root", "", "senmoneydb");
$id=$_GET['id'];
$query = sprintf("SELECT id, numero FROM compte 
  WHERE id='%s'",
  mysqli_real_escape_string($cnx, $id));
$result = mysqli_query($cnx, $query);
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));