<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Retrieve and sanitize data
            $name = htmlspecialchars($_POST['name']);
            $reg_no = htmlspecialchars($_POST['reg_no']);
            $type = htmlspecialchars($_POST['type']);
            $date = htmlspecialchars($_POST['date']);
            
            // Re-format date to readable format (e.g., "20 October 2026")
            if(!empty($date)) {
                $formatted_date = date("j F Y", strtotime($date));
            } else {
                $formatted_date = "Date not specified";
            }

            // Retrieve services array
            $selected_services = isset($_POST['services']) ? $_POST['services'] : [];

            // Server-side Price Dictionary (Prevents HTML manipulation/tampering)
            $prices = [
                "Engine Oil Change" => 3000,
                "Brake Inspection" => 2000,
                "Wheel Alignment" => 2500,
                "Computer Diagnosis" => 3500,
                "Full Service" => 8000,
                "Vehicle Pickup and Delivery" => 1500
            ];

            // Server-side validation and cost calculation
            $total_cost = 0;
            $valid_services = [];

            foreach ($selected_services as $service) {
                if (array_key_exists($service, $prices)) {
                    $total_cost += $prices[$service];
                    $valid_services[] = $service;
                }
            }

            // Basic server-side validation check
            if (empty($name) || empty($reg_no) || empty($valid_services)) {
                echo "<div id='error-box' style='display:block;'>Invalid Request: Essential information is missing. Please go back and try again.</div>";
                echo "<a href='service.html' class='btn'>Go Back</a>";
            } else {
                // Display confirmation receipt exactly as specified
                echo "<h2>SERVICE REQUEST RECEIVED</h2>";
                echo "<div class='receipt'>";
                echo "<p><strong>Customer:</strong> " . $name . "</p>";
                echo "<p><strong>Vehicle:</strong> " . $reg_no . "</p>";
                echo "<p><strong>Vehicle Type:</strong> " . $type . "</p>";
                echo "<p><strong>Service Date:</strong> " . $formatted_date . "</p>";
                
                echo "<p><strong>Selected Services:</strong></p>";
                echo "<ul>";
                foreach ($valid_services as $srv) {
                    echo "<li>" . $srv . "</li>";
                }
                echo "</ul>";
                
                echo "<h3 style='margin-bottom:0;'>ESTIMATED SERVICE COST: KSh " . number_format($total_cost) . "</h3>";
                echo "</div>";
                
                echo "<a href='index.html' class='btn'>Return to Home</a>";
            }
        } else {
            echo "<h2>Access Denied</h2>";
            echo "<p>Please submit the form properly.</p>";
            echo "<a href='service.html' class='btn'>Go to Form</a>";
        }
        ?>
    </div>
</body>
</html>