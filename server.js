const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/api/users');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/keys');

const app = express();
//CORS MidleWare 
app.use(cors());
//Bodyparser Midleware
app.use(bodyParser.json());

//Passport Midleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected... '))
    .catch(err => console.log(err));

//Use routes
app.use('/api/users', users);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set a static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));