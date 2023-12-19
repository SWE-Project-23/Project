const ctrlRooms = require("../Controllers/ctrlRooms");
const ctrlReservations = require("../Controllers/ctrlReservations");
const ctrlOptions = require("../Controllers/ctrlOptions");
const ctrlUsers = require("../Controllers/ctrlUsers");
const ctrlCharacteristics = require("../Controllers/ctrlCharacteristics");
const ctrlQuestion = require("../Controllers/ctrlQuestions");

const login = (req, res) => {
  res.render("login", { layout: false });
};
const signup = (req, res) => {
  res.render("signup", { layout: false });
};
const basma = (req, res) => {
  res.render("basma", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null,
  });
};
const about = (req, res) => {
  res.render("aboutUs", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null,
  });
};
const facilities = (req, res) => {
  res.render("facilities", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null,
  });
};
const privacy = (req, res) => {
  res.render("privacyPolicy", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: null,
  });
};
const dashboard = async (req, res) => {
  if(req.session.user != null && (req.session.user.role =="Staff" || req.session.user.role =="Admin")){
  res.render("dashboard", {
    layout: false,
    user: req.session.user ,
    reservations: await ctrlReservations.staff.getReservations(req, res) || [],
    users: await ctrlUsers.admin.getAllUsers(req, res) || [],
  });
  }
  else res.redirect("/user/login")
};
const users = async (req, res) => {
  if(req.session.user != null && req.session.user.role =="Admin"){
    res.render("users", {
      layout: false,
      user: req.session.user,
      users: await ctrlUsers.admin.getAllUsers(req, res) || [],
    })
  }
    else if (req.session.user != null && req.session.user.role =="Staff"){
      res.render("guests", {
        layout: false,
        user: req.session.user,
        guests: await ctrlUsers.staff.getAllGuests(req, res) || [],
      })
    }
    else res.redirect("/user/login")
}

const options = async (req, res) => {
  if(req.session.user != null && (req.session.user.role =="Admin" || req.session.user.role =="Staff")){
  res.render("options", {
    layout: false,
    user: req.session.user,
    options: await ctrlOptions.admin.getOptions(req, res) || [ ],
  });
}
else res.redirect("/user/login")

};

const rooms = async (req, res) => {
  if(req.session.user != null && (req.session.user.role =="Admin" || req.session.user.role =="Staff")){
    res.render("rooms", {
      layout: false,
      user: req.session.user,
      rooms: await ctrlRooms.admin.getRoomsAndCharacteristics(req, res) || [],
      characteristics: await ctrlCharacteristics.admin.getCharacteristics(req,res) || []
    });
  }
  else res.redirect("/user/login")
};
const characteristics = async (req, res) => {
  if(req.session.user != null && req.session.user.role =="Admin" ){
    res.render("charecteristics", {
      layout: false,
      user: req.session.user,
      characteristics: await ctrlCharacteristics.admin.getCharacteristics(req, res) || []
    });
  }
  else res.redirect("/user/login")
};

const questions = async (req, res) => {
  if(req.session.user != null && (req.session.user.role =="Admin" || req.session.user.role =="Staff")){
    res.render("questions", {
      layout: false,
      user: req.session.user,
      questions: await ctrlQuestion.staff.getQuestions(req, res) || []
    });
  }
  else res.redirect("/user/login")
};

const myProfile = async (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/user/login");
  } else {
    console.log(req.session.user);
    await ctrlReservations.guest
      .getUserReservations(req, res)
      .then((result) => {
        res.render("myProfile", {
          layout: false,
          user: req.session.user === undefined ? "" : req.session.user,
          reservations: result === null ? [] : result,
        });
      });
  }
};

const viewRooms = async (req, res) => {
  let pageNumber = parseInt(req.params.page);
  if (!pageNumber) pageNumber = 1;
  let rooms = null;
  let result = await ctrlRooms.public.getRooms();
  if (pageNumber > result.length / 6) pageNumber = result.length / 6;
  if (pageNumber < 1) pageNumber = 1;
  rooms = result;
  rooms = result.slice((pageNumber - 1) * 6, (pageNumber - 1) * 6 + 6);
  res.render("allRooms", {
    user: req.session.user === undefined ? "" : req.session.user,
    rooms: rooms === null ? "" : rooms,
    current_page: Math.ceil(pageNumber),
    total_page: Math.ceil(result.length / 6),
  });
};

const viewRoom = async (req, res) => {
  let room = null,
    characteristics = null;
  await ctrlRooms.public.getRoom(req, res).then(async (result) => {
    room = result;
    if (room === null) res.redirect("/room");
    characteristics = await ctrlRooms.public.getRoomCharacteristics(req, res);
    res.render("room", {
      user: req.session.user === undefined ? "" : req.session.user,
      room: room === null ? "" : room,
      characteristics: characteristics === null ? "" : characteristics,
      rooms: null,
    });
  });
};

const covid = (req, res) => {
  res.render("covid-19", {
    rooms: null,
    user: req.session.user === undefined ? "" : req.session.user,
  });
};
const logout = (req, res) => {
  if (req.session.user !== undefined) req.session.destroy();
  res.redirect("/");
};

const booking = async (req, res) => {
 let records = await ctrlOptions.admin.getOptions(req, res)
    if (req.session.user !== undefined)
      res.render("booking", {
        user: req.session.user,
        roomTitle: req.body.roomTitle,
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
        options: records=== null ? "" :records,
        rooms: null
      });
    else res.redirect("/user/login");
};

const payment = async (req, res) => {
  console.log("inside function")
  if (req.session.user !== undefined){
    res.render("payment", {
      user: req.session.user,
      room: await ctrlRooms.public.sessionedRoom(req, res),
      reservation: await ctrlReservations.guest.sessionedReservation(req, res),
      options: await ctrlReservations.guest.getUserReservationOptions(req, res),
      rooms: null,
    });
  }
  else res.redirect("/user/login");
};

module.exports = {
  public: {
    basma,
    about,
    facilities,
    privacy,
    covid,
    viewRooms,
    viewRoom,
  },

  user: { myProfile , logout,login, signup, },
  guest:{booking,payment},
  admin: { dashboard, characteristics,options },
  staff:{users,questions,rooms}


};
