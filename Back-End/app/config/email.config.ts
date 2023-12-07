/* eslint-disable prettier/prettier */
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path, {join} from "path"
import * as Handlebars from "handlebars"
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access"
import {MailerModule} from "@nestjs-modules/mailer"
const transport = nodemailer.createTransport({
  host: "mail.electems.com",
  port: 465,
  ssl: false,
  tls: true,
  auth: {
    user: "shashi@electems.com",
    pass: "cybRVE12#"
  }
})
transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: global.__basedir + "../.././views/",
      layoutsDir: global.__basedir + "../.././views/",
      defaultLayout: "",
      handlebars: allowInsecurePrototypeAccess(Handlebars)
    },
    viewPath: global.__basedir + "../.././views/",
    extName: ".hbs"
  })
)
export default transport
