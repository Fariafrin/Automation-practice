import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

// ✅ Generate UTC ID (10-digit)
// ✅ Generate truly unique 10-digit employee ID
function generateUTCId(): string {
    const now = new Date();
    const timestamp = now.getTime().toString(); // millisecond precision
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0"); // 3-digit random
    return (timestamp + random).slice(-10); // Keep last 10 digits
}

// ✅ Generate Employee CSV
export function generateEmployeeCSV(count: number): string {
    const headers =
        "first_name,middle_name,last_name,employee_id,other_id,driver's_license_no,license_expiry_date,gender,marital_status,nationality,date_of_birth,address_street_1,address_street_2,city,state/province,zip/postal_code,country,home_telephone,mobile,work_telephone,work_email,other_email";
    const rows: string[] = [];

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const utcId = generateUTCId();

        rows.push(`${firstName},,${lastName},${utcId},,,,,,,,,,,,,,,,,,`);
    }

    const csvData = [headers, ...rows].join("\n");
    const outputPath = path.join(__dirname, "../data/employee_data.csv");

    fs.writeFileSync(outputPath, csvData);
    console.log("✅ CSV generated at:", outputPath);
    return outputPath;
}
