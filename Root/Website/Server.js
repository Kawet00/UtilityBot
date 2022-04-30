const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const { Strategy } = require('passport-discord');
const Config = require('../Storage/json/Config.json')
const chalk = require("chalk")
const Box = require("cli-box")
const colors = require('../Storage/json/colors.json')
const MongoStore = require('connect-mongo');
const db = require('../Storage/db/manager')

module.exports = async function (client) {
    const cookieExpire = 1000 * 60 * 60 * 24 * 7 // 1 week
    app.use(
        session({
            secret: Config.website.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: cookieExpire,
                secure: false,
                maxAge: cookieExpire,
            },
            store: MongoStore.create({
                mongoUrl: Config.MONGODB_WEB_URI,
                autoReconnect: true,
                autoRemove: 'native',
                stringify: false,
            }),
        })
    );
	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({ extended: true }));
	app.engine('html', ejs.renderFile);
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '/views'));
	app.use(express.static(path.join(__dirname, '/public')));

	app.use(async function(req, res, next) {
		req.client = client;
		next();
	});

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});
	passport.use(new Strategy({
		clientID: Config.clientID,
		clientSecret: Config.secret_keyT,
		callbackURL: Config.website.callbackURL,
		scope: [ 'identify', 'guilds' ],
	}, function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			return done(null, profile);
		});
	}));

	app.use('/', require('./routes/index'));
	app.use('/dashboard', require('./routes/dashboard'));

	app.get('*', (req, res) => {
		res.render('../views/404', {
			bot: req.client,
			user: req.user,
		});
	});

    app.locals.db = db

	app.listen(Config.website.port, () => {const WebsiteBox = new Box({
        w: Math.floor(`Website`.length + 70),
        h: 5,
        stringify: false,
        marks: {
            nw: '╭',
            n: '─',
            ne: '╮',
            e: '│',
            se: '╯',
            s: '─',
            sw: '╰',
            w: '│'
        },
        hAlign: "left",
    }, `W E B S I T E   I N I T I A T I N G
    
    Website URL                 ::    ${Config.website.domain}
    Port                        ::    ${Config.website.port}
    Callback URL                ::    ${Config.website.callbackURL}
    `).stringify()
    console.log(chalk.bold.hex(colors.PERSO)(WebsiteBox))
	});
};