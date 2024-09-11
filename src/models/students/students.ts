import {Model, DataTypes} from 'sequelize';
import {database} from '../../config/database'

export interface StudentAttributes {
    id: string;
    reg_no: string;
    firstName: string;
    lastName: string;
    year: string;
    faculty: string;
    department: string;
    email: string;
    student_image?: string;
}

class Students extends Model<StudentAttributes>{}

Students.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: false
    },
    reg_no: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.STRING,
    },
    faculty: {
        type: DataTypes.STRING,
    },
    department: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    student_image: {
        type: DataTypes.STRING,
    }
},
{
    sequelize: database,
    modelName: "Students",
    timestamps: true
}
)

export default Students