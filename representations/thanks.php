<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	if(isset($_POST['submit'])){
		
	
		$n = count(scandir("results/"));
		
		$myfile = fopen("results/$n.txt", "w");
		
		$txt = $_POST['previous_answers'] . "\r\n ------------------------------ \r\nQ1: " . $_POST['Q1'] . ";\r\nQ2: " . $_POST['Q2'] . ";\r\nQ3: " . $_POST['Q3'] . ";\r\nQ4: " . $_POST['Q4'];
    $txt = $txt . ";\r\nQ5: " . $_POST['Q5'] . ";\r\nQ6: " . $_POST['Q6'] . ";\r\nQ7: " . $_POST['Q7'] . ";\r\nQ8: " ;
    if(!empty($_POST['Q8'])) {  
      for ($i = 0; $i < count($_POST['Q8']); $i++) { 

          $txt = $txt . $_POST['Q8'][$i];
          if($i != (count($_POST['Q8']) - 1)) {
            $txt = $txt . ", ";
          } else {
            $txt = $txt . " ";
          }
          
      }
    } 
    $txt =  $txt . $_POST['Q8_Other_textfield'];
    $txt =  $txt . ";\r\nQ9: " . $_POST['Q9'] . ";\r\nQ10: " . $_POST['Q10']  . ";\r\nQ11: " . $_POST['Q11'] . ";\r\nQ12: " . $_POST['Q12'] . ";\r\nQ13: " . $_POST['Q13'] . ";\r\nQ14: " . $_POST['Q14'];


		fwrite($myfile, $txt);
	}
?>

<html>
  <head>
    <meta charset="utf-8">
    <title>Questionnaire</title>
    <script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
    <script src="https://d3js.org/d3-selection-multi.v1.min.js"></script> 
    <link href="./public/styles.css" rel="stylesheet">
    <script type="text/javascript" src="public/myD3app.js" defer></script>
  </head>
  
  <body>

    <div class="beginning">
        <h1>Thank you for participating in the survey. You can now close this window.</h1>
        <br><br><br>
        <h3>Representations used in this study are based on 'Synthesis of ATP' animation by Drew Berry.</h3>
        <img class="img" src="images/video credits.png" alt="video credits">
        <br>
        <br>
        <a href="https://www.wehi.edu.au/wehi-tv" target="_blank">WEHI.TV</a>
    </div> 
</body>