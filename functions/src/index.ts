import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { BusReservation, DinerReservation, translateMenuChoice, ReservationStatus } from './model';
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
export const sendEmailConfirmationForDiner = functions.database.ref('/reservations/diner/{dinerKey}').onCreate(event => {
  const snapshot = event.data;
  const diner = snapshot.val() as DinerReservation;

  console.log('New diner reservation (key: [' + event.params.dinerKey + ']) found. Sending confirmation email.');

  const userUid = diner.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: 'Hageland Galabal - reservatie diner',
      text: `Hallo ${user.displayName},\n` +
            `\n` +
            `We hebben de volgende reservatie voor het galabal diner genoteerd:\n` +
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
      .catch(error => console.error(`There was an error while sending a diner confirmation email to ${user.email}`, error));
  });
});

export const sendEmailConfirmationForDinerCancellation = functions.database.ref('/reservations/diner/{dinerKey}').onDelete(event => {
  const snapshot = event.data;
  const diner = snapshot.previous.val() as DinerReservation;

  console.log('Diner reservation removed (key: [' + event.params.dinerKey + ']) found. Sending cancellation email.');

  const userUid = diner.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: 'Hageland Galabal - annulatie reservatie diner',
      text: `Hallo ${user.displayName},\n` +
      `\n` +
      `We hebben de volgende reservatie voor het galabal diner geannuleerd:\n` +
      `\n` +
      `Naam: ${diner.reserveeName}\n` +
      `Menu: ${translateMenuChoice(diner.menuChoice)}\n` +
      `\n` +
      `Met vriendelijke groeten\n` +
      ` - Het Hageland Galabalcomité\n`
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => console.log(`Diner cancellation email sent to:`, user.email))
      .catch(error => console.error(`There was an error while sending a Diner cancellation email to ${user.email}`, error));
  });
});

export const sendEmailConfirmationForBus = functions.database.ref('/reservations/bus/{busKey}').onCreate(event => {
  const snapshot = event.data;
  const busReservation = snapshot.val() as BusReservation;

  console.log('New bus reservation (key: [' + event.params.busKey + ']) found. Sending confirmation email.');

  const userUid = busReservation.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: 'Hageland Galabal - reservatie bus',
      text: `Hallo ${user.displayName},\n` +
      `\n` +
      `We hebben de volgende reservatie voor de bus van/naar het galabal genoteerd:\n` +
      `\n` +
      `Naam: ${busReservation.reserveeName}\n` +
      `Busritten:\n` +
      (busReservation.dinerBus ? `Bus voor het diner: Gerechtsgebouw Leuven (17:00) -> Lindenhof Baal (18:00)\n` : '') +
      (busReservation.partyBus ? `Bus voor het avondfeest: Gerechtsgebouw Leuven (21:00) -> Lindenhof Baal, (22:00)\n` : '') +
      (busReservation.nightBus ? `Bus terug naar Leuven: Lindenhof Baal (03:45) -> Gerechtsgebouw Leuven (04:30))\n` : '') +
      `\n` +
      `Tot op het galabal!\n` +
      `\n` +
      `Met vriendelijke groeten\n` +
      ` - Het Hageland Galabalcomité\n`
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => console.log(`Bus confirmation email sent to:`, user.email))
      .catch(error => console.error(`There was an error while sending a bus confirmation email to ${user.email}`, error));
  });
});

export const sendEmailConfirmationForBusCancellation = functions.database.ref('/reservations/bus/{busKey}').onDelete(event => {
  const snapshot = event.data;
  const busReservation = snapshot.previous.val() as BusReservation;

  console.log('Deleted bus reservation (key: [' + event.params.busKey + ']) found. Sending cancellation email.');

  const userUid = busReservation.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: 'Hageland Galabal - annulatie reservatie bus',
      text: `Hallo ${user.displayName},\n` +
      `\n` +
      `We hebben de volgende reservatie voor de bus van/naar het galabal geannuleerd:\n` +
      `\n` +
      `Naam: ${busReservation.reserveeName}\n` +
      `Busritten:\n` +
      (busReservation.dinerBus ? `Bus voor het diner: Gerechtsgebouw Leuven (17:00) -> Lindenhof Baal (18:00)\n` : '') +
      (busReservation.partyBus ? `Bus voor het avondfeest: Gerechtsgebouw Leuven (21:00) -> Lindenhof Baal, (22:00)\n` : '') +
      (busReservation.nightBus ? `Bus terug naar Leuven: Lindenhof Baal (03:45) -> Gerechtsgebouw Leuven (04:30))\n` : '') +
      `\n` +
      `Tot op het galabal!\n` +
      `\n` +
      `Met vriendelijke groeten\n` +
      ` - Het Hageland Galabalcomité\n`
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => console.log(`Bus cancellation email sent to:`, user.email))
      .catch(error => console.error(`There was an error while sending a bus cancellation email to ${user.email}`, error));
  });
});

export const sendEmailConfirmationForPaymentReceived = functions.database.ref('/reservations/diner/{dinerKey}').onUpdate(event => {
  const snapshot = event.data;
  const dinerBefore = snapshot.previous.val() as DinerReservation;
  const dinerAfter = snapshot.current.val() as DinerReservation;

  const dinerJustGotPaid = (dinerBefore.status !== ReservationStatus.PAID && dinerAfter.status === ReservationStatus.PAID);

  if (!dinerJustGotPaid) {
    return Promise.resolve();
  }

  console.log('Diner was paid (key: [' + event.params.dinerKey + ']) found. Sending confirmation email.');

  const userUid = dinerAfter.createdBy;
  const userPromise = admin.auth().getUser(userUid);

  return userPromise.then(user => {
    const mailOptions = {
      from: '"Hageland Galabalcomité" <hagelandgalabal@gmail.com>',
      to: user.email,
      subject: 'Hageland Galabal - bevestiging ontvangst betaling',
      text: `Hallo ${user.displayName},\n` +
      `\n` +
      `We hebben de betaling voor het onderstaande galabal diner goed ontvangen:\n` +
      `\n` +
      `Naam: ${dinerAfter.reserveeName}\n` +
      `Menu: ${translateMenuChoice(dinerAfter.menuChoice)}\n` +
      `\n` +
      `Je reservatie is nu definitief!\n` +
      `\n` +
      `Tot op het galabal!\n` +
      `\n` +
      `Met vriendelijke groeten\n` +
      ` - Het Hageland Galabalcomité\n`
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => console.log(`Diner payment confirmation email sent to:`, user.email))
      .catch(error => console.error(`There was an error while sending a diner payment confirmation email to ${user.email}`, error));
  });
});