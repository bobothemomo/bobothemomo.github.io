<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rastgele Sayılar Tablosu</title>
</head>
<body>

    <h2>Rastgele Sayılar Tablosu</h2>

    <?php
    // Form gönderildi mi kontrolü
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Satır ve sütun sayılarını al
        $satir_sayisi = $_POST["satir"];
        $sutun_sayisi = $_POST["sutun"];

        // Tabloyu oluştur
        echo "<table border='1'>";
        for ($i = 1; $i <= $satir_sayisi; $i++) {
            echo "<tr>";
            for ($j = 1; $j <= $sutun_sayisi; $j++) {
                // Her hücreye 1-100 arasında rastgele bir sayı ata
                $rastgele_sayi = rand(1, 100);
                echo "<td>{$rastgele_sayi}</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }
    ?>

    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="satir">Satır Sayısı:</label>
        <input type="number" name="satir" min="1" required>
        <br>
        <label for="sutun">Sütun Sayısı:</label>
        <input type="number" name="sutun" min="1" required>
        <br>
        <input type="submit" value="Tabloyu Oluştur">
    </form>

</body>
</html>
