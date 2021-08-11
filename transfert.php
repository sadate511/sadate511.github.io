<?php
$cnx = mysqli_connect("localhost", "root", "", "senmoneydb");
$from=$_POST['from'];
$to=$_POST['to'];
$amount=$_POST['amount'];
$now=date("Y-m-d H:i:s");
$now = strval($now);

$query1 = ("UPDATE compte SET solde = solde - $amount WHERE id = $from");
$result1 = mysqli_query($cnx, $query1);

$query2 = ("UPDATE compte SET solde = solde + $amount WHERE id = $to");
$result2 = mysqli_query($cnx, $query2);

$query3 = ("INSERT INTO `transaction` VALUES(NULL, $amount, $from, $to, CURRENT_TIMESTAMP())");
$result3 = mysqli_query($cnx, $query3);

echo json_encode($result3);