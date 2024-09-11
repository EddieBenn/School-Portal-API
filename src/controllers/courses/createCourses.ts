import {Request, Response} from 'express';
import {v4} from 'uuid';
import Courses from '../../models/courses/courses';

export const createCourse = async(req:Request, res:Response) => {
    try{
        const {course_code, 
            name_of_course, 
            name_of_instructor, 
            description, 
            enrollment_status, 
            course_image,
            duration,
            schedule,
            location,
            perequisites,
            syllabus} = req.body

            const availableCourseCode = await Courses.findOne({where: {course_code}})
            const availableCourseName = await Courses.findOne({where: {name_of_course}})
            if(availableCourseCode || availableCourseName) return res.status(400).json({message: `Course Already Exists`})
            const studentz = [
        {reg_no: 'RSC-MAT-1211', firstName: 'Akem', lastName: 'Ben', email: 'akemini.ndaobong@gmail.com'},
        {reg_no: 'RSC-CHE-1213', firstName: 'Benny', lastName: 'Steve', email: 'abn4reel@gmail.com'}
    ]
    console.log(req.body)
                const newCourse = await Courses.create({
                    id: v4(),
                    course_code,
                    name_of_course,
                    name_of_instructor,
                    description,
                    enrollment_status,
                    course_image: req?.file?.path,
                    duration,
                    schedule,
                    location,
                    perequisites: [perequisites],
                    syllabus: [syllabus],
                    students: studentz
                })
                await newCourse.save()

                if(newCourse) return res.status(200).json({message: `Course created successfully`, data: newCourse})
                return res.status(400).json({message: `Unable to create`})
    }catch(err:any){
        console.log(err)
        return res.status(500).json({
            message: `Internal Server Error`
        })
    }
}