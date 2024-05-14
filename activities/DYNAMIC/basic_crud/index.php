<?php include('connection.php'); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title> Basic CRUD Application </title>
		<link rel="stylesheet" href="css/style.css">
		<link rel="icon" href="favicon.ico" type="image/x-icon">
	</head>
<body>

	<div id="wrapper">
		
		<form action="add.php" method="post">
			
			<fieldset>
				<legend><strong> Add Record </strong></legend>
				<div>
					<label for="firstname"> First Name </label>
					<input type="text" name="firstname" id="firstname">
				</div>
				<div>
					<label for="lastname"> Last Name </label>
					<input type="text" name="lastname" id="lastname">
				</div>
				<div>
					<label for="middlename"> Middle Name </label>
					<input type="text" name="middlename" id="middlename">
				</div>
				<div>
					<label for="course"> Course </label>
					<input type="text" name="course" id="course">
				</div>
				<div>
					<label for="birthplace"> Birth Place </label>
					<input type="text" name="birthplace" id="birthplace">
				</div>
				<div>
					<label> &nbsp; </label>
					<input type="submit" value="CREATE">
				</div>

			</fieldset>
			
		</form>

		<hr>

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