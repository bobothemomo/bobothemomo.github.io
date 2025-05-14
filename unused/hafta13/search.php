<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$searchName = $_GET['name'];

$sql = "SELECT * FROM kisi WHERE ad LIKE '%$searchName%'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Ad: " . $row['ad'] . " - Soyad: " . $row['soyad'] . " - Email: " . $row['email'] . "<br>";
    }
} else {
    echo "Sonuç bulunamadı.";
}

$conn->close();
?>
