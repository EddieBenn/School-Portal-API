import {Request, Response} from 'express';
import Students from '../../models/students/students';

export const getSingleStudent = async(req:Request, res:Response)=>{
    try{
        const reg_no = req.params.reg_no
        const singleStudents = await Students.findOne({where: {reg_no:reg_no}})
        if(singleStudents) return res.status(200).json({
            message: `Student Found`,
            data: singleStudents
        })
        return res.status(404).json({
            message: `Student not found`
        })
    }catch(err:any){
        console.log(err.message)
        return res.status(500).json({
            message: `Internal Server Error`
        })
    }
}