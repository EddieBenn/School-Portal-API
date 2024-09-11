import {Request, Response} from 'express';
import Courses from '../../models/courses/courses';

export const getSingleCourse = async(req:Request, res:Response)=>{
    try{
        const course_code = req.params.course_code
        const singleCourse = await Courses.findOne({where: {course_code:course_code}})
        if(singleCourse) return res.status(200).json({
            message: `Course Found`,
            data: singleCourse
        })
        return res.status(400).json({
            message: `Course not found`
        })
    }catch(err:any){
        console.log(err.message)
        return res.status(500).json({
            message: `Internal Server Error`
        })
    }
}