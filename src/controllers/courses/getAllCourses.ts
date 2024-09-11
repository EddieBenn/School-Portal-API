import {Request, Response} from 'express';
import Courses from '../../models/courses/courses';
import { Op } from 'sequelize';

// export const getAllCourses = async(req:Request, res:Response)=>{
//     try{
//         const allCourses = await Courses.findAll({})
//         if(allCourses) {return res.status(200).json({
//             message: `All Courses`,
//             data: allCourses
//         })}else{return res.status(400).json({
//             message: `Unable to fetch courses`
//         })
//     }
//     }catch(err:any){
//         console.log(err.message)
//         return res.status(500).json({
//             message: `Internal Server Error`
//         })
//     }
// }

// External API function with query parameters
export const getAllCourses = async (req: Request, res: Response) => {
    try {
      const { search } = req.query;
  
      // Use the search parameter for filtering
      let whereClause: any = {};
      if (search) {
        whereClause[Op.or] = [
          { name_of_course: { [Op.iLike]: `%${search}%` } },
          { course_code: { [Op.iLike]: `%${search}%` } },
          { name_of_instructor: { [Op.iLike]: `%${search}%` } },
        ];
      }
  
      const allCourses = await Courses.findAll({
        where: whereClause,
      });
  
      if (allCourses.length > 0) {
        return res.status(200).json({
          message: `Matching Courses`,
          data: allCourses,
        });
      } else {
        return res.status(404).json({
          message: 'No matching courses found',
        });
      }
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  };
  