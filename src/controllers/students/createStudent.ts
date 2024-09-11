import { Request, Response } from 'express';
import { v4 } from 'uuid';
import Students from '../../models/students/students';

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, year, faculty, reg_no, department, email, image } = req.body;

        const existingStudent = await Students.findOne({ where: { email: email } });

        if (existingStudent) {
            return res.status(400).json({ message: `Student with ${email} already exists` });
        }

        const newStudent = await Students.create({
            id: v4(),
            student_image: req?.file?.path,
            firstName,
            lastName,
            year,
            faculty,
            reg_no,
            department,
            email
        });

        await newStudent.save();

        if (newStudent) {
            return res.status(200).json({
                message: `Student created successfully`,
                data: newStudent
            });
        } else {
            return res.status(400).json({
                message: `Unable to create`
            });
        }
    } catch (error:any) {
        console.error(error.message);
        res.status(500).json({ message: `Internal Server Error` });
    }
};
