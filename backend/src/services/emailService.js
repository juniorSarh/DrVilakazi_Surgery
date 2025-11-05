import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: appointment.email,
      subject: 'Appointment Confirmation - Dr. Vilakazi Surgery',
      html: generateAppointmentConfirmationEmail(appointment),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Appointment confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending appointment confirmation:', error);
    throw error;
  }
};

// Send appointment reminder email
export const sendAppointmentReminder = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: appointment.email,
      subject: 'Appointment Reminder - Dr. Vilakazi Surgery',
      html: generateAppointmentReminderEmail(appointment),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Appointment reminder email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending appointment reminder:', error);
    throw error;
  }
};

// Send appointment cancellation confirmation
export const sendAppointmentCancellationConfirmation = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: appointment.email,
      subject: 'Appointment Cancelled - Dr. Vilakazi Surgery',
      html: generateAppointmentCancellationEmail(appointment),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Appointment cancellation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending appointment cancellation:', error);
    throw error;
  }
};

// Generate appointment confirmation email template
function generateAppointmentConfirmationEmail(appointment) {
  const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const appointmentTime = formatTime12(appointment.appointment_time);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1976d2; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .appointment-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .cta { background: #1976d2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .emergency { background: #ffebee; border: 1px solid #d32f2f; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .emergency h3 { color: #d32f2f; margin: 0 0 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Confirmed</h1>
          <p>Dr. Vilakazi Surgery Center</p>
        </div>

        <div class="content">
          <h2>Dear ${appointment.first_name} ${appointment.last_name},</h2>
          <p>Your appointment has been successfully scheduled. Here are the details:</p>

          <div class="appointment-details">
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${appointmentDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${appointmentTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Doctor:</span>
              <span class="detail-value">Dr. ${appointment.doctor_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Specialty:</span>
              <span class="detail-value">${appointment.specialty}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Appointment Type:</span>
              <span class="detail-value">${appointment.appointment_type}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value">${appointment.status}</span>
            </div>
          </div>

          <h3>Reason for Visit:</h3>
          <p>${appointment.reason_for_visit}</p>

          ${appointment.notes ? `<h3>Additional Notes:</h3><p>${appointment.notes}</p>` : ''}

          <div class="emergency">
            <h3>🚨 Emergency Contact</h3>
            <p>If you need to cancel or reschedule, please call us at least 24 hours in advance:</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Emergency:</strong> (555) 123-4568</p>
          </div>

          <div style="text-align: center;">
            <a href="#" class="cta">View Appointment Details</a>
          </div>

          <div class="footer">
            <p><strong>Dr. Vilakazi Surgery Center</strong></p>
            <p>123 Medical Plaza, Suite 100, Johannesburg, SA 2000</p>
            <p>Phone: (555) 123-4567 | Email: info@drvilakazisurgery.co.za</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate appointment reminder email template
function generateAppointmentReminderEmail(appointment) {
  const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const appointmentTime = formatTime12(appointment.appointment_time);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Reminder</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1976d2; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .reminder-box { background: #e3f2fd; border: 1px solid #1976d2; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .appointment-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Reminder</h1>
          <p>Dr. Vilakazi Surgery Center</p>
        </div>

        <div class="content">
          <h2>Dear ${appointment.first_name} ${appointment.last_name},</h2>

          <div class="reminder-box">
            <h3>⏰ This is a reminder of your upcoming appointment:</h3>
          </div>

          <div class="appointment-details">
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${appointmentDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${appointmentTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Doctor:</span>
              <span class="detail-value">Dr. ${appointment.doctor_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">123 Medical Plaza, Suite 100, Johannesburg</span>
            </div>
          </div>

          <h3>What to Bring:</h3>
          <ul>
            <li>Valid ID document</li>
            <li>Medical aid card (if applicable)</li>
            <li>List of current medications</li>
            <li>Previous medical records (if first visit)</li>
          </ul>

          <h3>Important Information:</h3>
          <p>Please arrive 15 minutes before your scheduled appointment time. If you need to cancel or reschedule, please call us at least 24 hours in advance.</p>

          <div class="footer">
            <p><strong>Dr. Vilakazi Surgery Center</strong></p>
            <p>Phone: (555) 123-4567 | Emergency: (555) 123-4568</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate appointment cancellation email template
function generateAppointmentCancellationEmail(appointment) {
  const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const appointmentTime = formatTime12(appointment.appointment_time);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Cancelled</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #d32f2f; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .cancellation-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .cta { background: #1976d2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Cancelled</h1>
          <p>Dr. Vilakazi Surgery Center</p>
        </div>

        <div class="content">
          <h2>Dear ${appointment.first_name} ${appointment.last_name},</h2>
          <p>Your appointment has been cancelled as requested. Here are the details of the cancelled appointment:</p>

          <div class="cancellation-details">
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${appointmentDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${appointmentTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Doctor:</span>
              <span class="detail-value">Dr. ${appointment.doctor_name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value">Cancelled</span>
            </div>
          </div>

          <p>If you would like to reschedule your appointment, please call our office or use our online booking system.</p>

          <div style="text-align: center;">
            <a href="#" class="cta">Book New Appointment</a>
          </div>

          <div class="footer">
            <p><strong>Dr. Vilakazi Surgery Center</strong></p>
            <p>Phone: (555) 123-4567 | Email: info@drvilakazisurgery.co.za</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to format time in 12-hour format
function formatTime12(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default {
  sendAppointmentConfirmation,
  sendAppointmentReminder,
  sendAppointmentCancellationConfirmation
};