// Demo data seeder for testing the e-learning platform
import connectDB from './mongodb';
import User from './models/User';
import Course from './models/Course';
import Announcement from './models/Announcement';

export async function seedDatabase() {
  await connectDB();
  
  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  await Announcement.deleteMany({});
  
  // Create demo users
  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'password123',
    role: 'admin',
  });
  await adminUser.save();
  
  const teacherUser = new User({
    name: 'Teacher Johnson',
    email: 'teacher@demo.com',
    password: 'password123',
    role: 'teacher',
  });
  await teacherUser.save();
  
  const studentUser = new User({
    name: 'Student Smith',
    email: 'student@demo.com',
    password: 'password123',
    role: 'student',
    grade: 'Grade 11',
  });
  await studentUser.save();
  
  // Create demo courses
  const mathCourse = new Course({
    title: 'Advanced Mathematics',
    description: 'Master complex mathematical concepts with clear, structured lessons including calculus, algebra, and statistics.',
    targetGrades: ['Grade 11', 'Grade 12'],
    createdBy: teacherUser._id,
    lessons: [
      {
        title: 'Introduction to Calculus',
        videoUrl: 'https://placehold.co/1920x1080?text=Advanced+Mathematics+Lesson+1+Introduction+to+Calculus+concepts',
        transcription: 'Welcome to our calculus course. In this lesson, we will explore the fundamental concepts of limits, derivatives, and integrals. Calculus is the mathematical study of continuous change...',
        summary: '• Introduction to limits and continuity\n• Understanding derivatives as rates of change\n• Basic integration concepts\n• Real-world applications of calculus',
        resources: ['https://example.com/calculus-workbook.pdf', 'https://example.com/practice-problems'],
        order: 1,
        duration: 1800, // 30 minutes
      },
      {
        title: 'Derivatives and Applications',
        videoUrl: 'https://placehold.co/1920x1080?text=Advanced+Mathematics+Lesson+2+Derivatives+and+practical+applications',
        transcription: 'In this lesson, we dive deeper into derivatives. We will learn the power rule, product rule, and chain rule for finding derivatives...',
        summary: '• Power rule for derivatives\n• Product and quotient rules\n• Chain rule applications\n• Optimization problems\n• Related rates',
        resources: ['https://example.com/derivatives-guide.pdf'],
        order: 2,
        duration: 2100, // 35 minutes
      },
    ],
  });
  await mathCourse.save();
  
  const scienceCourse = new Course({
    title: 'Scientific Thinking',
    description: 'Develop critical thinking skills through scientific methodology, hypothesis testing, and analytical reasoning.',
    targetGrades: ['University - Year 1', 'University - Year 2'],
    createdBy: teacherUser._id,
    lessons: [
      {
        title: 'The Scientific Method',
        videoUrl: 'https://placehold.co/1920x1080?text=Scientific+Thinking+Lesson+1+Scientific+Method+and+research+principles',
        transcription: 'The scientific method is a systematic approach to understanding the natural world. It involves observation, hypothesis formation, experimentation, and analysis...',
        summary: '• Steps of the scientific method\n• Forming testable hypotheses\n• Designing controlled experiments\n• Analyzing and interpreting data\n• Drawing valid conclusions',
        resources: ['https://example.com/scientific-method.pdf', 'https://example.com/lab-protocols'],
        order: 1,
        duration: 1500, // 25 minutes
      },
    ],
  });
  await scienceCourse.save();
  
  // Enroll student in math course
  studentUser.enrolledCourses.push(mathCourse._id);
  mathCourse.enrolledStudents.push(studentUser._id);
  await studentUser.save();
  await mathCourse.save();
  
  // Create demo announcements
  const announcement1 = new Announcement({
    title: 'Welcome to the New Semester!',
    content: 'Welcome to the new academic semester! We are excited to have you join our Abstract Learning platform. Please review your enrolled courses and familiarize yourself with the platform interface.\n\nImportant reminders:\n- Check your course schedules\n- Download required resources\n- Join our online study groups\n\nIf you have any questions, please don\'t hesitate to reach out to your instructors.',
    link: 'https://example.com/student-handbook',
    targetGrades: ['Grade 11', 'Grade 12'],
    author: teacherUser._id,
  });
  await announcement1.save();
  
  const announcement2 = new Announcement({
    title: 'Upcoming Mathematics Workshop',
    content: 'Join us for an interactive mathematics workshop this Friday at 2:00 PM. We will cover advanced problem-solving techniques and exam preparation strategies.\n\nWorkshop agenda:\n- Review of key concepts\n- Practice problems session\n- Q&A with instructors\n- Study tips and techniques',
    link: 'https://example.com/zoom-workshop',
    targetGrades: ['Grade 11', 'Grade 12'],
    author: teacherUser._id,
  });
  await announcement2.save();
  
  console.log('✅ Database seeded successfully!');
  console.log('Demo accounts created:');
  console.log('- Admin: admin@demo.com / password123');
  console.log('- Teacher: teacher@demo.com / password123');
  console.log('- Student: student@demo.com / password123');
}