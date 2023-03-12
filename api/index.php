<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connection.php';

$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode("/", $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $id = $path[3];
            $sql .= " WHERE id = $id";
            $result = mysqli_query($conn,$sql);
            $users = mysqli_fetch_assoc($result);
        }else {
            $result = mysqli_query($conn,$sql);
            $users = mysqli_fetch_all($result);
        }
        
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents("php://input"));
        $name = $user->name;
        $mobile = $user->mobile;
        $email = $user->email;
        $errors = [];
        if(empty($name)){
            $errors[] = "User Name is required";
        }
        elseif(strlen($name) < 3){
            $errors[] = "User Name is less than 3 char";
        }

        if(empty($mobile)){
            $errors[] = "Mobile is required";
        }
        elseif(strlen($mobile) < 10){
            $errors[] = "Mobile is less than 10 char";
        }

        if(empty($email)){
            $errors[] = "E-Mail is required";
        }
        elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors[] = "enter valid E-Mail";
        }
        if(empty($errors)){
            $sql = "INSERT INTO users(name,email,phone) VALUES('$name','$email','$mobile')";
        $result = mysqli_query($conn,$sql);
        if($result){
            $response = ['status' => 1, 'message' => ['Record created successfully.']];
        }else {
            $response = ['status' => 0, 'message' => ['Failed to create record.']];
        }
        }else {
            $response = ['status' => 0, 'message' => $errors];
        }
        
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode(file_get_contents("php://input"));
        $name = $user->name;
        $email = $user->email;
        $mobile = $user->phone;
        $id = $user->id;
        $errors = [];
        if(empty($name)){
            $errors[] = "User Name is required";
        }
        elseif(strlen($name) < 3){
            $errors[] = "User Name is less than 3 char";
        }

        if(empty($mobile)){
            $errors[] = "Mobile is required";
        }
        elseif(strlen($mobile) < 10){
            $errors[] = "Mobile is less than 10 char";
        }

        if(empty($email)){
            $errors[] = "E-Mail is required";
        }
        elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors[] = "enter valid E-Mail";
        }
        if(empty($errors)){
            $updated_at = date('Y-m-d');
            $sql = "UPDATE users set name='$name', email='$email',phone='$mobile', updated_at=DEFAULT WHERE id='$id'";
        $result = mysqli_query($conn,$sql);
        if($result){
            $response = ['status' => 1, 'message' => ['Record updated successfully.']];
        }else {
            $response = ['status' => 0, 'message' => ['Failed to update record.']];
        }
        // $path = explode("/", $_SERVER['REQUEST_URI']);
        // print_r($path);
    }else {
        $response = ['status' => 0, 'message' => $errors];
    }
        
        echo json_encode($response);
        break;

    case "DELETE":
        $path = explode("/", $_SERVER['REQUEST_URI']);
        $id = $path[3];
        $sql = "DELETE from users WHERE id = $id";
        $result = mysqli_query($conn,$sql);
        if($result){
            $response = ['status' => 1, 'message' => 'user deleted successfully'];
        }else {
            $response = ['status' => 0, 'message' => 'Failed to delete user.'];
        }

        echo json_encode($response);
}


