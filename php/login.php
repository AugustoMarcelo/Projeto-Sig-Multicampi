<?php
    require("db/db.php");
    session_start();
    $userName = $_POST['user'];
    $pass = $_POST['password'];
    $userName = stripslashes($userName); 
    $pass = stripslashes($pass); 
    $userName = $mysqli->real_escape_string($userName); 
    $pass = $mysqli->real_escape_string($pass); 
    $sql = "SELECT * FROM USER WHERE userName='$userName' and password='$pass'";
    $result = $mysqli->query($sql);
    $array = $result->fetch_assoc();
    $result = array(); 
    if ($resultdb = $mysqli->query($sql)) { 
        $count = $resultdb->num_rows; 
        if($count==1){
            
            $_SESSION['authenticated'] = "yes"; 
            $_SESSION['username'] = $userName;
            $_SESSION['user_id'] = $array['id'];
            $_SESSION['name'] = $array['name'];
            $_SESSION['registration'] = $array['registration'];
            $_SESSION['level'] = $array['level'];
            $_SESSION['grupo_id'] = $array['Group_id'];
            $result['success'] = true; 
            $result['msg'] = 'User authenticated!';

        } else {
            $result['success'] = false; 
            $result['msg'] = 'Senha incorreta.'; 
        }
        $resultdb->close(); 
    }

    $mysqli->close(); 
    echo json_encode($result);
?>