<?php include('connection.php'); ?>
<?php 
    $lastname = $_POST['lastname'];
	$firstname = $_POST['firstname'];
	$middlename = $_POST['middlename'];
    $course = $_POST['course'];
    $birthplace = $_POST['birthplace'];

	$sql_string = "INSERT INTO tblstudents(lastname, firstname, middlename, course, birthplace) VALUES (:lastname, :firstname, :middlename, :course, :birthplace)";
	$stmt_prepare = $conn->prepare($sql_string);

	$stmt_prepare->bindParam(":lastname", $lastname, PDO::PARAM_STR);
	$stmt_prepare->bindParam(":firstname", $firstname, PDO::PARAM_STR);
	$stmt_prepare->bindParam(":middlename", $middlename, PDO::PARAM_STR);
    $stmt_prepare->bindParam(":course", $course, PDO::PARAM_STR);
    $stmt_prepare->bindParam(":birthplace", $birthplace, PDO::PARAM_STR);

	$stmt_prepare->execute();

	header("Location: index.php");

?>