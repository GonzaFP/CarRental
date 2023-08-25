# CarRental
A car renting website in which a user can do the following:
* Search available cars and book them.
* Cancel a trip for whatever reason.
The site has an admin who can:
* Track all events related to car for example, admin can know which cars are booked so that users can't book them.
* Charge a user a cancel fee if they cancel a trip after it has started.
* Colect late fee for cars returned after due date.
* Send a user a notification when reservation is approaching pick up date, when car is nearing due date or has not been returned within due date.
All payments are collected using stripe API
#Setup
* git clone https://github.com/GonzaFP/CarRental
* npm install
* npm run dev
* Pull requests are welcome
