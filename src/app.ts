import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {database} from './config/database'
import { HttpError } from "http-errors"
import studentRoutes from './routes/students/studentsRoutes';
import courseRoutes from './routes/courses/coursesRoutes'
import Students from './models/students/students';
import Courses from './models/courses/courses';
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())
app.use(logger("dev"))
app.use(cookieParser())
app.use('/student', studentRoutes)
app.use('/courses', courseRoutes)

database.sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

  app.get('/', async (req:Request, res:Response)=>{
    const allStudents = await Students.findAll({})
    const allCourses = await Courses.findAll({})
    return res.status(200).json({
        message: `All Data Fetched`,
        Students: allStudents,
        Courses: allCourses
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App is listening on Port ${process.env.PORT || 3000}`)
})