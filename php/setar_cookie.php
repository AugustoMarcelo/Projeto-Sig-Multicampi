<?php
    if(isset($_COOKIE['multicampi'])) {
        echo "<p>{$_COOKIE['multicampi']}</p>";
    } else {
        $cookie = setcookie("multicampi", "autorizado", time()+(60*60*24*365));
        if($cookie) {
            echo "<p>Cookie criado com sucesso</p>";
        }
    }
?>