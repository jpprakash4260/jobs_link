'use strict'
const db = require("../Models");
var localStorage = require('local-storage')
const { emailMessage, smsMessage } = require('../constants');
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const smsconfig = require("../config/sms.config");
const Vonage = require('@vonage/server-sdk')
// const fast2sms = require('fast-two-sms')

class LoginRegisterService { };

LoginRegisterService.findseeker_2Field = async (key1, value1, key2, value2) => {
   try {
      const findseeker_2Field = await db.Employee.findOne({ where: { [key1]: value1, [key2]: value2 } })
      return findseeker_2Field
   } catch (err) {
      return err
   }
}

LoginRegisterService.findemp_2Field = async (key1, value1, key2, value2) => {
   try {
      const findemp_2Field = await db.RecutComp.findOne({ where: { [key1]: value1, [key2]: value2 } })
      return findemp_2Field
   } catch (err) {
      return err
   }
}

LoginRegisterService.gen_otp = async () => {
   try {
      let generated_OTP = await Math.floor(100000 + Math.random() * 900000) + 1;
      return generated_OTP
   } catch (err) {
      return err
   }
}

LoginRegisterService.JWT_token = async (data) => {
   try{
      const Token = await JWT.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRESIN });
      return Token
   }catch(err){
      return err
   }
}

LoginRegisterService.email_sender = async (to_email, email_otp, forgot_Password, feedback) => {
   try {
      const transporter = await nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_PASS,
         },
      });
      let subject_ = '';
      let html_ = '';
      if (email_otp) {
         subject_ = emailMessage.subject.verification
         html_ = `<p><b>${email_otp}</b></p>` + emailMessage.html.OTP_extension
      }
      else if(forgot_Password){
         subject_ = emailMessage.subject
         html_ = `<p><b>Dear ${forgot_Password.user_name},</b></p><br>` + emailMessage.html.forgot_pass1 + `<br><br><br>` +
            emailMessage.html.forgot_pass_userName + `  ` + `<b>  ${forgot_Password.mail_id}</b>` + `<br><br>` +
            emailMessage.html.forgot_pass_password + `  ` + `<b>  ${forgot_Password.password}</b>` + `<br><br><br>` +
            emailMessage.html.forgot_pass2+ `<br>` + emailMessage.html.forgot_pass3
      } 
      else  {
         subject_ = emailMessage.subject.some
         html_ = emailMessage.html.some
      }
      const mailOptions = {
         from: process.env.FROM_EMAIL,
         to: to_email,
         subject: subject_,
         html: html_,
      }
      let sendMail = await transporter.sendMail(mailOptions)
      if (sendMail.accepted[0]) {
         return sendMail.accepted[0]
      } else if (sendMail.rejected[0]) {
         return "OTP Sending Failure"
      }
   }
   catch (err) {
      return err
   }
}

LoginRegisterService.sms_sender = async (to_mobile, mobile_otp, feedback) =>{
   try{
      const vonage = new Vonage({
         apiKey: smsconfig.VONAGE_API_KEY,
         apiSecret: smsconfig.VONAGE_API_SECRET,
      })
      const text = mobile_otp
      const from = smsconfig.VONAGE_NAME
      const sms = await vonage.message.sendSms(from, to_mobile, text)
      console.log("sms : ", sms);
      return sms
   }catch(err){
      return err
   }
}

LoginRegisterService.setToLocalstorage = async (Token) =>{
   try{
      const setToken = await localStorage.set('userToken', Token)
      return setToken
   }catch(err){
      return err
   }
}

LoginRegisterService.getToLocalstorage = async (Token) => {
   try {
      const getToken = await localStorage.get('userToken')
      return getToken
   } catch (err) {
      return err
   }
}

module.exports = LoginRegisterService;