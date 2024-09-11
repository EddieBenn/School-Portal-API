import { Router } from "express";
import { getSingleStudent } from "../../controllers/students/getSingleStudent";
import { upload2 } from "../../middleware/uploads";
import { createCourse } from "../../controllers/courses/createCourses";
import { getAllCourses } from "../../controllers/courses/getAllCourses";
import { getSingleCourse } from "../../controllers/courses/getSingleCourse";

const router = Router()

router.post('/create', upload2.single("course_image"), createCourse)
router.get('/all_courses', getAllCourses)
router.get('/single_course/:course_code', getSingleCourse)

export default router