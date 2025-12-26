import cron from 'node-cron'
import Medicine from '../models/Medicine.js'
import User from '../models/User.js'
import { sendReminderEmail } from '../config/mailer.js'

cron.schedule('* * * * *', async () => {
  const now = new Date()
  const currentTime = now.toTimeString().slice(0, 5) // HH:MM

  console.log('Checking reminders for', currentTime)

  const medicines = await Medicine.find({
    times: currentTime,
    isActive: true
  })

  for (const med of medicines) {
    const user = await User.findById(med.userId)
    if (user) {
      await sendReminderEmail(
        user.email,
        med.name,
        med.dosage
      )
      console.log(`Reminder sent to ${user.email}`)
    }
  }
})
