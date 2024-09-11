import { Router } from "express";
import { createStudent } from "../../controllers/students/createStudent";
import { getAllStudents } from "../../controllers/students/getAllStudents";
import { getSingleStudent } from "../../controllers/students/getSingleStudent";
import { upload } from "../../middleware/uploads";

const router = Router()

router.post('/register', upload.single("student_image"), createStudent)
router.get('/all_students', getAllStudents)
router.get('/single_student/:reg_no', getSingleStudent)

export default router