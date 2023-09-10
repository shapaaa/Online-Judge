import nodemailer from 'nodemailer';
const verifyUserEmail = async (name, email, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.AUTH_EMAIL,
			pass: process.env.AUTH_PASS,
		},
	});
	try {
		const info = await transporter.sendMail({
			from: process.env.AUTH_EMAIL, // sender address
			to: email, // list of receivers
			subject: `Hi 👋 ${name} please verify your account`, // Subject line
			html: `http://localhost:3000/emailverification/${name}/${token}`, // html body
		});
		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.log(error.message);
	}
};
export default verifyUserEmail;
