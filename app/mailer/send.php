<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$mail = $_POST['mail'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'dimon.tsu@gmail.com';
$mail->Password = 'barbariska25';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('dimon.tsu@gmail.com', 'Test site');
$mail->addAddress('barbariska2502@gmail.com');
$mail->isHTML(true);

$mail->Subject = 'Нова заявка';
$mail->Body    = '
	Користувач залишив свої дані <br> 
	Ім"я: ' . $name . ' <br> 
	Телефон: ' . $phone . ' <br> 
	E-mail: ' . $mail . '';
$mail->AltBody = 'Alternative text';

if (!$mail->send()) {
	echo 'Error';
} else {
	echo 'Yes';
}
