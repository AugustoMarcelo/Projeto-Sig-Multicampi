<?php
    use Otp\GoogleAuthenticator;
    use Otp\Otp;
    use Base32\Base32;
    include("otp-master/src/GoogleAuthenticator.php");
    include("otp-master/src/Otp.php");
    include("base32-master/src/Base32.php");
    require("db/db.php");
    
    if(isset($_COOKIE["multicampi"])) {
        session_start();
        if (isset($_POST['key'])) {
            if ($_POST['qrcode'] != "") {
                $secret = $_SESSION['secret'];
                $user_id = $_SESSION['user_id'];
                $sql = "UPDATE USER SET totp_key = '$secret' WHERE id = '$user_id'";
                $mysqli->query($sql);
            }
            $otp = new Otp();
            $secret = $_SESSION['secret'];
            if ($otp->checkTotp(Base32::decode($secret), $_POST['key'])) {
                $result['success'] = true;
                $result['msg'] = 'User authenticated!';
            } else {
                $result['success'] = false;
                $result['codigo'] = 2; //Codigo de erro referente a falha na chave
                $result['msg'] = 'Falha na chave';
            }
        } else {
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
                if ($count == 1) {
                    if (!$array['totp_key']) {
                        $secret = GoogleAuthenticator::generateRandom();
                        $_SESSION['secret'] = $secret;
                        $_SESSION['authenticated'] = "yes";
                        $_SESSION['username'] = $userName;
                        $_SESSION['user_id'] = $array['id'];
                        $_SESSION['name'] = $array['name'];
                        $_SESSION['registration'] = $array['registration'];
                        $_SESSION['level'] = $array['level'];
                        $_SESSION['grupo_id'] = $array['Group_id'];
                        $qrcode = GoogleAuthenticator::getQrCodeUrl('totp', "Chave da EMCM", $secret);
                        $result['qrcode'] = $qrcode;
                        $result['success'] = true;
                    } else {
                        $_SESSION['authenticated'] = "yes";
                        $_SESSION['username'] = $userName;
                        $_SESSION['user_id'] = $array['id'];
                        $_SESSION['name'] = $array['name'];
                        $_SESSION['registration'] = $array['registration'];
                        $_SESSION['level'] = $array['level'];
                        $_SESSION['grupo_id'] = $array['Group_id'];
                        $_SESSION['secret'] = $array['totp_key'];
                        $result['success'] = true;
                    }
                } else {
                    $result['success'] = false;
                    $result['codigo'] = 3; //C�digo de erro referente a falha no login e senha
                    $result['msg'] = 'Login ou Senha incorreta.';
                }
                $resultdb->close();
                //$mysqli->close();
            }
        }
    } else {
        $result['success'] = false;
        $result['codigo'] = "1"; //C�digo de erro referente a computador n�o autorizado
    }

    $mysqli->close();
    echo json_encode($result);
?>