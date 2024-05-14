<?php
	
	define("DSN","mysql:host=sql111.infinityfree.com;dbname=if0_36518205_studentdb");
	define("DBUSER","if0_36518205");
	define("DBPASS","isaw712003333");

	try {

		$conn = new PDO(DSN, DBUSER, DBPASS);

	} catch (PDOException $e) {

		print "Error: " . $e->getMessage()  . "<br>";

		die();

	}

?>