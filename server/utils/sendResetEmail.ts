import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetEmail = async (
  email: string,
  username: string,
  resetLink: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Link',
    text: `Hello ${username}, to reset your password, please use the following link: ${resetLink}`,
    html: `Hello ${username}! To reset your password please <a href="${resetLink}">click here</a>.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to ' + email);
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

export default sendResetEmail;
