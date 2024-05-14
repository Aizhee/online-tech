<?php include('connection.php'); ?>
<!DOCTYPE html>
<html>
	<head>
		<title> Basic CRUD Application </title>
		<link rel="stylesheet" href="css/style.css">
	</head>
<body>

	<div id="wrapper">
<!-- php files -->
	<?php 

		$id = $_GET['id'];

		$sql_string = "SELECT * FROM tblstudents WHERE studentid = :id LIMIT 1";

		$stmt = $conn->prepare($sql_string);

		$stmt->bindParam(':id', $id, PDO::PARAM_INT);

		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);


		if (isset($_POST['update'])) {

			$lastname = $_POST['lastname'];
			$firstname = $_POST['firstname'];
			$middlename = $_POST['middlename'];
			$course = $_POST['course'];
			$birthplace = $_POST['birthplace'];
		
			$sql_string = "UPDATE tblstudents SET 
			lastname = :lastname, 
			firstname = :firstname, 
			middlename = :middlename, 
			course = :course, 
			birthplace = :birthplace 
			WHERE studentid = :id";

			$stmt = $conn->prepare($sql_string);

			$stmt->bindParam(":lastname", $lastname, PDO::PARAM_STR);
			$stmt->bindParam(":firstname", $firstname, PDO::PARAM_STR);
			$stmt->bindParam(":middlename", $middlename, PDO::PARAM_STR);
			$stmt->bindParam(":course", $course, PDO::PARAM_STR);
			$stmt->bindParam(":birthplace", $birthplace, PDO::PARAM_STR);
			$stmt->bindParam(':id', $id, PDO::PARAM_INT);

			$stmt->execute();

			header("Location: index.php");

		}

	?>

	<form action="update.php?id=<?php echo $result['studentid']; ?>" method="post">
		
		<fieldset>
			<legend> Update Record </legend>
			<div>
					<label for="firstname"> First Name </label>
					<input type="text" name="firstname" id="firstname" value="<?php echo $result['firstname']; ?>">
				</div>
				<div>
					<label for="lastname"> Last Name </label>
					<input type="text" name="lastname" id="lastname" value="<?php echo $result['lastname']; ?>">
				</div>
				<div>
					<label for="middlename"> Middle Name </label>
					<input type="text" name="middlename" id="middlename" value="<?php echo $result['middlename']; ?>">
				</div>
				<div>
					<label for="course"> Course </label>
					<input type="text" name="course" id="course" value="<?php echo $result['course']; ?>">
				</div>
				<div>
					<label for="birthplace"> Birth Place </label>
					<input type="text" name="birthplace" id="birthplace" value="<?php echo $result['birthplace']; ?>">
				</div>
			<div>
				<label for=""> &nbsp;</label>
				<input type="submit" value="UPDATE" name="update">
			</div>

		</fieldset>
		
	</form>

	<hr>
<!--  -->

		<?php 

			$sql_string = "SELECT * FROM tblstudents";
			$stmt_prepare = $conn->prepare($sql_string);

			$stmt_prepare->execute();

			$count = $stmt_prepare->rowCount();

			if ($count > 0) {

				echo "<table>";
					echo "<tr>";
					echo "<td> Last Name</td>";
					echo "<td> First Name </td>";
					echo "<td> Midde Name</td>";
					echo "<td> Course</td>";
					echo "<td> Birthplace </td>";
				echo "</tr>";

				while ($result = $stmt_prepare->fetch(PDO::FETCH_ASSOC)) {

				echo "<tr>";
					echo "<td>" . $result['lastname'] . "</td>";
					echo "<td>" . $result['firstname'] . "</td>";
					echo "<td>" . $result['middlename'] . "</td>";
					echo "<td>" . $result['course'] . "</td>";
					echo "<td>" . $result['birthplace'] . "</td>";
					echo "<td><a href='update.php?id={$result['studentid']}'> UPDATE </a>";
					echo "<td><a href='delete.php?id={$result['studentid']}' onclick=\"return confirm('Are you Sure?')\"> DELETE </a>";
				echo "</tr>";

				}

				echo "</table>";

			} else {

				echo "No Records Found or Database is Empty!";

			}
			
		?>
		
	</div>

</body>
<script src="js/jquery.js"></script>
<script src="js/main.js"></script>
</html>