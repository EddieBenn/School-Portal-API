import {Request, Response} from 'express';
import Students from '../../models/students/students';

export const getAllStudents = async(req:Request, res:Response)=>{
    try{
        const allStudents = await Students.findAll({})
        if(allStudents) {return res.status(200).json({
            message: `All students`,
            data: allStudents
        })}else{return res.status(400).json({
            message: `Unable to fetch students`
        })
    }
    }catch(err:any){
        console.log(err.message)
        return res.status(500).json({
            message: `Internal Server Error`
        })
    }
}