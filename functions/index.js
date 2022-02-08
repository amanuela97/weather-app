import admin from 'firebase-admin'
import functions from 'firebase-functions'
import nodemailer  from 'nodemailer'
import fetch from 'node-fetch'

admin.initializeApp()
const firestore = admin.firestore()
const APP_NAME = 'Weather-App'
const mailTransport  = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mail.username,
    pass: functions.config().mail.password,
  }
})

// runs daily At 12:00 AM
export const dailyEmail = functions.pubsub.schedule('0 0 * * *').onRun(handleDailyTask)
// runs At 12:00 AM, on day 1 of the month
export const monthlyEmail = functions.pubsub.schedule('0 0 1 * *').onRun(handleMonthlyTask)

async function handleDailyTask(context) {
  const query = firestore
    .collection('Accounts')
    .where('status', '==', true)
    .where('frequency', '==', 'Daily')

  return await handleTask(query)
}

async function handleMonthlyTask(context) {
  const query = firestore
    .collection('Accounts')
    .where('status', '==', true)
    .where('frequency', '==', 'Monthly')

  return await handleTask(query)

}

async function handleTask(query) {
  const tasks = await query.get()
  const jobs = []

  tasks.forEach( async (snapshot) => {
    const { email , name: displayName , location } = snapshot.data()
    const weather = await getWeather(location)
    if(!weather) return
    const job = await sendEmail(email, displayName, weather)
    jobs.push(job)
  })

  return await Promise.all(jobs)
}

async function sendEmail(email, displayName, weather) {
  const mailOptions = {
    from: `👻 ${APP_NAME} ${functions.config().mail.username}`,
    to: email,
  }

  // The user subscribed to the weather updates.
  mailOptions.subject = 'Weather updates'
  mailOptions.text = `
    Hey ${displayName || ''}! Your weather update for tomorrow.\n
    address: ${weather?.address ? weather?.address : '-'} \n
    timezone: ${weather?.timezone ? weather?.timezone : '-' } \n
    datetime: ${weather?.days[0]?.datetime ? weather?.days[0]?.datetime  : '-'} \n
    temperature: ${weather?.days[0]?.temp ? weather?.days[0]?.temp : '-'}°C \n
    humidity:  ${weather?.days[0]?.humidity ? weather?.days[0]?.humidity : '-'}% \n
    precipitation:  ${weather?.days[0]?.precipprob ? weather?.days[0]?.precipprob : '-' }% \n
    wind: ${weather?.days[0]?.windspeed ? weather?.days[0]?.windspeed : '-'}m/s \n
    conditions: ${weather?.days[0]?.conditions ? weather?.days[0]?.conditions : '-'} \n
    `
  return await mailTransport.sendMail(mailOptions , (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    functions.logger.log('New weather update sent to:', email)
  })
}

async function getWeather(location) {
  const url =  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/tomorrow?unitGroup=metric&include=current%2Cdays&key=${functions.config().visualcrossing.key}&contentType=json`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error , 'errr')
    return false
  }
}