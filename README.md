# GoodCamps

'GoodCamps' is Camp Reviews Project. It is a web application designed to allow users to view, add, edit, and delete campground information. It features a list of campgrounds with detailed views for each, including descriptions, images, and locations. Built with Node.js, Express, MongoDB, and EJS, it provides a straightforward and interactive experience for camp enthusiasts to share and discover great camping spots.
It is an implementation of YelpCamp by Colt Steele!
# Note
It is still under development!

## Features

- **View Campgrounds**: Users can browse through a list of all available campgrounds.
- **Add Campgrounds**: Users have the ability to add new campgrounds, including images, descriptions, and locations.
- **Edit Campgrounds**: Existing campground information can be updated.
- **Delete Campgrounds**: Campgrounds can be removed from the listing.

## Technologies Used

- Node.js
- Express
- MongoDB
- EJS for templating
- Mongoose for MongoDB object modeling
- ejs-mate for layout support in EJS
- Method-override for supporting PUT and DELETE methods from forms

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB running locally or remotely

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/PabloSczn/Camp-Reviews-Project.git
```

2. Navigate to the project directory:

```bash
cd Camp-Reviews-Project
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Make sure your MongoDB instance is running.

5. Start the application:

```bash
npm start
```

6. Visit `http://localhost:3000` in your web browser to view the application.

## Usage

After launching the application, you can navigate through the site using the provided routes:

- `/`: The home page.
- `/campgrounds`: Displays all the campgrounds.
- `/campgrounds/new`: Form to submit a new campground.
- `/campgrounds/:id`: Shows the details of a single campground.
- `/campgrounds/:id/edit`: Form to edit an existing campground.
