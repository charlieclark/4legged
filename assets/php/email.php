<?php

$theEmail = $_GET["email"];

$con = mysql_connect("fourlegged.db.8301646.hostedresource.com" , "fourlegged" , "C4c4c4c4");
 // $con = mysql_connect("localhost" , "root" , "2c4c4c4c4");

if(!$con)
{
    die("could not connect" . mysql_error() );
}
else
{
	echo("hello");
}



mysql_select_db("fourlegged" , $con);

//CREATING NEW email


mysql_query("INSERT INTO emails(email) VALUES('$theEmail')");
echo("success");

	

?>