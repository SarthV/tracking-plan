# Tracking Plan Dashboard:

This is a basic application allowing an user to create and view tracking plans adn its associated events.

<img width="1266" alt="image" src="https://github.com/SarthV/tracking-plan/assets/52134948/f9d33564-9981-420a-800a-65897f148268">

<img width="1223" alt="image" src="https://github.com/SarthV/tracking-plan/assets/52134948/6134f86d-f5ff-46d1-b1f0-37c812daf588">



Initial DB Setup: 
The application uses MySQL as its main database. Please use the below credentials to connect to the DB instance or change the values as per your credentials in the code.

```
username: "root", 
host: process.env.MYSQL_HOST,
database: "tracking_plan",
password: "password",
port: 3306,
```

Once the MySQL setup is complete, the below SQL commands need to be executed so as to create the required tables.
```
CREATE TABLE event (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  rules JSON NOT NULL,
  is_deleted TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tracking_plan (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  is_deleted TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE tracking_plan_event (
  tracking_plan_id VARCHAR(255) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (tracking_plan_id, event_id),
  FOREIGN KEY (tracking_plan_id) REFERENCES tracking_plan(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

```

To run this backend service, clone the repo and runt the below commands:
``` npm run build && npm run start```
