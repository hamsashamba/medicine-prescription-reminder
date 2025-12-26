import nodemailer from 'nodemailer'

export const sendReminderEmail = async (to, medicineName, dosage) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })

  console.log('Using sender:', process.env.EMAIL)
  console.log('Sending email to:', to)

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: '💊 Medicine Reminder',
    text: `Time to take your medicine:\n\n${medicineName} - ${dosage}`
  })

  console.log('Email sent successfully')
}
