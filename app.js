const express = require('express')
const https = require('https');
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport');
const isLoggedIn = require('./Middleware/auth')
require('./passport')


app.use(cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2']
}))
  

app.use(passport.initialize());
app.use(passport.session());


app.get('/',isLoggedIn ,(req,res)=>{
    
    console.log(req.user);
    res.send(`Hello world ${req.user.displayName}`);

})

app.get('/activity', isLoggedIn, (req, res) => {
    const user = req.user.username;
    const options = {
        hostname: 'api.github.com',
        path: '/users/' + user + '/events',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "<paste your token here>"
    }
    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something wnent wrong!');
    })
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  })
  
    

app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/github',passport.authenticate('github',{ scope: [ 'user:email' ] }));

app.get('/auth/github/callback',passport.authenticate('github', 
    { failureRedirect: '/auth/error' }),
    
    function(req, res) {
        res.redirect('/activity');
    });


app.listen(80,()=>{
  console.log('Serve is up and running at the port 80')
})
