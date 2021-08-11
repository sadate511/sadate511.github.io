<?php
$cnx = mysqli_connect("localhost", "root", "", "senmoneydb");
$id=$_GET['id'];
$query =("SELECT 
  t.montant as montant,
  t.date as `date`,
  c1.numero as `source`,
  c2.numero as destination
  FROM `transaction` t 
  JOIN `compte` c1 ON t.id_compte_source = c1.id
  JOIN `compte` c2 ON t.id_compte_destination = c2.id
  WHERE c1.id = $id OR c2.id = $id
  ORDER BY t.date DESC
  LIMIT 5
");
$result = mysqli_query($cnx, $query);
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));