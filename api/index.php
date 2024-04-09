<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");
    header("Access-Control-Allow-Credentials: true"); 
    header('Access-Control-Max-Age: 86400');

    include 'DbConnect.php';
    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == "OPTIONS") {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization");
        header('Access-Control-Max-Age: 86400');
        header('Content-Length: 0');
        header('Content-Type: application/json; charset=UTF-8');
        exit();
    }

    switch($method) {

        case "GET":{

            $path = explode('/', $_SERVER['REQUEST_URI']);

            //echo print_r($path);

            if($path[3] == 'estados'){

                if(isset($path[4]) && is_numeric($path[4])) {

                    $sql = "SELECT 
                        s.id, 
                        s.name,
                        s.country_name
                    FROM states s 
                    WHERE s.country_id = :id
                    ORDER BY s.name
                    ";

                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $path[4]);
                    $stmt->execute();
                    $estados = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "SELECT 
                        c.name,
                        c.emoji
                    FROM countries c 
                    WHERE c.id = :id
                    ";

                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':id', $path[4]);
                    $stmt->execute();
                    $info = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    echo json_encode(array('estados' => $estados, 'info' => $info));

                    break;
                }

            }

            $sql = "SELECT 
                    c.id, 
                    c.name,
                    c.emoji
                FROM countries c 
            ";

            if(isset($path[4]) && is_numeric($path[4])) {

                $sql .= " WHERE c.id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[4]);
                $stmt->execute();
                $paises = $stmt->fetch(PDO::FETCH_ASSOC);

            } else {

                $sql .= " ORDER by c.name";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $paises = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            /*$path[] = array (

                'path' => $path

            );*/
    
            // echo json_encode(array('paises' => $users, 'path' => $path));

            echo json_encode($paises);

            break;
        }

        case "POST":

            $pais = json_decode( file_get_contents('php://input') );

            $sql = "INSERT INTO countries(id, name) VALUES(null, :name)";

            $stmt = $conn->prepare($sql);

            //$created_at = date('Y-m-d');

            $stmt->bindParam(':name', $pais->name);
            /*$stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':mobile', $user->mobile);
            $stmt->bindParam(':created_at', $created_at); */

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Se agrego nuevo pais'];
            } else {
                $response = ['status' => 0, 'message' => 'fallo al agregar nuevo pais'];
            }

            echo json_encode($response);
            
            break;
    
        case "PUT":
            $user = json_decode( file_get_contents('php://input') );
            $sql = "UPDATE countries SET name= :name WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $updated_at = date('Y-m-d');
            $stmt->bindParam(':id', $user->id);
            $stmt->bindParam(':name', $user->name);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'pais actualizado correctamente'];
            } else {
                $response = ['status' => 0, 'message' => 'fallo al actualizar pais'];
            }
            echo json_encode($response);
            break;
    
        case "DELETE":

            $sql = "DELETE FROM countries WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'pais eliminado correctamente'];
            } else {
                $response = ['status' => 0, 'message' => 'fallo al eliminar pais'];
            }

            break;

    }


?>
