import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from "nodemailer";
import { DinerReservation, translateMenuChoice } from './model';
import { BANK_ACCOUNT, DINER_PRICE, DINER_STUDENT_PRICE, END_OF_RESERVATION_DATE_STRING } from './constants';
admin.initializeApp(functions.config().firebase);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Sends an email confirmation when a user changes his mailing list subscription.
export const sendEmailConfirmationForDiner = functions.database.ref('/reservations/diner').onCreate(event => {
  const snapshot = event.data;
  const diner = snapshot.val() as DinerReservation;

  console.log("New diner reservation (key: [" + snapshot.key + "]) found. Sending confirmation email.");

  const userUid = diner.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: "Hageland Galabal - reservatie diner",
      text: `Hallo ${user.displayName},\n` +
            `\n` +
            `We hebben de volgende reservatie voor het Hageland diner genoteerd:\n` +
            `\n` +
            `Naam: ${diner.reserveeName}\n` +
            `Menu: ${translateMenuChoice(diner.menuChoice)}\n` +
            `\n` +
            `Gelieve ${DINER_PRICE} euro (${DINER_STUDENT_PRICE} euro voor actieve studenten) over te schrijven op ${BANK_ACCOUNT} voor ${END_OF_RESERVATION_DATE_STRING}.\n` +
            `Je reservatie is pas definitief als we de betaling ontvangen hebben!\n` +
            `\n` +
            `Tot op het galabal!\n` +
            `\n` +
            `Met vriendelijke groeten\n` +
            ` - Het Hageland Galabalcomité\n`
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => console.log(`Diner confirmation email sent to:`, user.email))
      .catch(error => console.error(`There was an error while sending a Diner confirmation email to ${user.email}`, error));
  });
});