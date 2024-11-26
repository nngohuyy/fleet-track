const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Thay bằng SMTP của bạn (ví dụ: smtp.office365.com cho Outlook)
    port: 587,
    secure: false, // True nếu dùng cổng 465
    auth: {
        user: 'thanh727242@gmail.com', // Thay bằng email của bạn
        pass: 'yxaz ymqy nfqx edss', // Mật khẩu hoặc mật khẩu ứng dụng (App Password)
    },
});

const mailOptions = {
    from: 'thanh727242@gmail.com', // Người gửi
    to: 'thanh0886872339@gmail.com', // Người nhận
    subject: 'SMTP Test Email',
    text: 'This is a test email to check SMTP configuration.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error sending email:', error);
    }
    console.log('Email sent successfully:', info.response);
});
