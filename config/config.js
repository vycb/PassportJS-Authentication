module.exports = {
	development: {
//		db: 'mongodb://localhost/passport-tut',
		db: 'mongodb://vycb:123@ds039010.mongolab.com:39010/blog',
		app: {
			name: 'Passport Authentication Tutorial'
		},
		facebook: {
			clientID: "850811634952943",
			clientSecret: "7d6445fead8741bc96da978945b7fde1",
			callbackURL: "/auth/facebook/callback"
		},

		google: {
			clientID: "658341532717-fgi22jfge1n7jkrq8tsum2f6gbka5k1t.apps.googleusercontent.com",
			clientSecret: "8MpI1AKKs67AfyL2VN47VryU",
			callbackURL: "http://devbox.example.com:3000/auth/google/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'Passport Authentication Tutorial'
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: ""
		},
		google: {
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
 	}
}
