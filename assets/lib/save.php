<?php

$path = $_POST["filename"];

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $dataUrl = str_replace("data:video/webm;base64,",'',$_POST["data"]);
    $encodedData = str_replace(' ','+',$dataUrl);
    $decodedData = base64_decode($encodedData);
    
    echo file_put_contents($path, $decodedData);
}

?>