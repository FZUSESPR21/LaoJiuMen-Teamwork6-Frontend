import Vue from 'vue'
import Router from 'vue-router'
import coursePlan from "../components/teacher/source/coursePlan";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const Home = () =>
    import ('../components/student/home')
const Source = () =>
    import ('../components/student/source/sourcelist')
const Activity = () =>
    import ('../components/student/activity/activitymain')
const Signin = () =>
    import ('../components/student/signin/signinmain')
const Result = () =>
    import ('../components/student/result/resultshow')
const Comment = () =>
    import ('../components/student/comment/commentmain')
const SetPassword = () =>
    import ('../components/Login/SetPassword')
const Login = () =>
    import ('../components/Login/Login')
const Student = () =>
    import ('../components/student/student')
const LoginBox = () =>
    import ('../components/Login/LoginBox')
const TeacherHome = () =>
    import ('../components/teacher/home')
const TeacherSource = () =>
    import ('../components/teacher/source/sourcelist')
const TeacherActivity = () =>
    import ('../components/teacher/activity/activitymain')
const TeacherSignin = () =>
    import ('../components/teacher/signin/signinlist')
const TeacherResult = () =>
    import ('../components/teacher/result/resultmain')
const TeacherComment = () =>
    import ('../components/teacher/comment/commentmain')
const TeacherSetPassword = () =>
    import ('../components/Login/SetPassword')
const TeacherLogin = () =>
    import ('../components/Login/Login')
const Teacher = () =>
    import ('../components/teacher/teacher')
const TeacherLoginBox = () =>
    import ('../components/Login/LoginBox')
const TeacherManage = () =>
    import ('../components/teacher/manage/studentmanage')
const StudySource = () =>
    import ('../components/student/source/studysource')
const OtherSource = () =>
    import ('../components/student/source/othersource')
const NoticeList = () =>
    import ('../components/student/activity/noticelist')
const HomeworkList = () =>
    import ("../components/student/activity/homeworklist")
const NoticeDetail = () =>
    import ('../components/student/activity/noticedetail')
const HomeworkDetail = () =>
    import ('../components/student/activity/homeworkdetail')
const SubmittedHomeworkList = () =>
    import ('../components/student/activity/submittedhomeworklist')
const SubmittedHomeworkDetail = () =>
    import ('../components/student/activity/submittedhomeworkdetail')
const Quiz = () =>
    import ('../components/student/activity/quiz')
const commentlist = () =>
    import ('../components/student/comment/commentlist')
const commentdetail = () =>
    import ('../components/student/comment/commentdetail')
const owncommentlist = () =>
    import ('../components/student/comment/owncommentlist')
const owncommentdetail = () =>
    import ('../components/student/comment/owncommentdetail')
const studentlist = () =>
    import ('../components/teacher/manage/studentlist')
const createstudent = () =>
    import ('../components/teacher/manage/createstudent')
const createclass = () =>
    import ('../components/teacher/manage/createclass')

const tchcommentlist = () =>
    import ('../components/teacher/comment/commentlist')
const tchcommentdetail = () =>
    import ('../components/teacher/comment/commentdetail')
const tchowncommentlist = () =>
    import ('../components/teacher/comment/owncommentlist')
const tchowncommentdetail = () =>
    import ('../components/teacher/comment/owncommentdetail')

/*教师成绩页面跳转路由*/
const TeacherInputMain = () =>
    import ('../components/teacher/result/inputmain')
const TeacherResultList = () =>
    import ('../components/teacher/result/resultlist')
const TeacherResultTaskAnalysis = () =>
    import ('../components/teacher/result/taskanalysis')
const TeacherResultFinalAnalysis = () =>
    import ('../components/teacher/result/finalanalysis')

const TeacherResultInput = () =>
    import ('../components/teacher/result/resultinput')
const TeacherDailyScore = () =>
    import ('../components/teacher/result/dailyscore')
const TeacherInputSingle = () =>
    import ('../components/teacher/result/inputsingle')
const TeacherSearchDaily = () =>
    import ('../components/teacher/result/searchdaily')


// 教师作业页面跳转路由
const teacherHomeworkList = () =>
    import ('../components/teacher/activity/homeworklist')
const teacherHomeworkDetail = () =>
    import ('../components/teacher/activity/homeworkdetail')
const teacherSubmittedHomeworkDetail = () =>
    import ('../components/teacher/activity/submittedhomeworkdetail')
const publishHomework = () =>
    import ('../components/teacher/activity/publishhomework')

// 教师资源页面跳转路由
const teacherStudySource = () =>
    import ('../components/teacher/source/studysource')
const teacherOtherSource = () =>
    import ('../components/teacher/source/othersource')
const teacherAddSource = () =>
    import ('../components/teacher/source/addsource')


const teacherNoticeList = () =>
    import ('../components/teacher/activity/noticelist')
const noticeDeliver = () =>
    import ('../components/teacher/activity/noticedeliver')
const teacherNoticeDetail = () =>
    import ('../components/teacher/activity/noticedetail')
const teacherCoursePlan = () =>
    import ('../components/teacher/source/coursePlan')
    //1.安装插件
Vue.use(Router)


const routes = [{
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        children: [{
                path: '',
                redirect: '/login/login'
            },
            {
                path: '/login/login',
                component: LoginBox
            },
            {
                path: '/login/setPassword',
                component: SetPassword
            }
        ]
    },
    {
        path: '/student',
        component: Student,
        children: [{
                path: '',
                redirect: '/student/home'
            },
            {
                path: '/student/source',
                component: Source,
                children: [{
                        path: '',
                        redirect: '/student/source/study'
                    },
                    {
                        path: '/student/source/study',
                        component: StudySource
                    },
                    {
                        path: '/student/source/other',
                        component: OtherSource
                    }
                ]
            },
            {
                path: '/student/home',
                component: Home
            },
            {
                path: '/student/activity',
                component: Activity,
                children: [{
                        path: '',
                        redirect: '/student/activity/homeworklist'
                    },
                    {
                        path: '/student/activity/homeworklist',
                        component: HomeworkList
                    },
                    {
                        path: '/student/activity/noticelist',
                        component: NoticeList
                    },
                    {
                        path: '/student/activity/noticedetail',
                        component: NoticeDetail
                    },
                    {
                        path: '/student/activity/quiz',
                        component: Quiz
                    },
                    {
                        path: '/student/activity/homeworkdetail',
                        component: HomeworkDetail
                    },
                    {
                        path: '/student/activity/submittedhomeworklist',
                        component: SubmittedHomeworkList
                    },
                    {
                        path: '/student/activity/submittedhomeworkdetail',
                        component: SubmittedHomeworkDetail
                    }
                ]
            },
            {
                path: '/student/signin',
                component: Signin
            },
            {
                path: '/student/result',
                component: Result
            },
            {
                path: '/student/comment',
                component: Comment,
                children: [{
                        path: '',
                        redirect: '/student/comment/commentlist'
                    },
                    {
                        path: '/student/comment/commentlist',
                        component: commentlist
                    },
                    {
                        path: '/student/comment/commentdetail',
                        component: commentdetail
                    },
                    {
                        path: '/student/comment/owncommentlist',
                        component: owncommentlist
                    },
                    {
                        path: '/student/comment/owncommentdetail',
                        component: owncommentdetail
                    }
                ]
            }
        ]
    },



    {
        path: '/teacher',
        component: Teacher,
        children: [{
                path: '',
                redirect: '/teacher/home'
            },
            {
                path: '/teacher/source',
                component: TeacherSource,
                children: [{
                        path: '',
                        redirect: '/teacher/source/study'
                    },
                    {
                        path: '/teacher/source/study',
                        component: teacherStudySource
                    },
                    {
                        path: '/teacher/source/other',
                        component: teacherOtherSource
                    },
                    {
                        path: '/teacher/source/add',
                        component: teacherAddSource
                    },
                    {
                        path: '/teacher/source/courseplan',
                        component: teacherCoursePlan
                    }
                ]
            },
            {
                path: '/teacher/home',
                component: TeacherHome
            },
            {
                path: '/teacher/activity',
                component: TeacherActivity,
                children: [{
                        path: '',
                        redirect: '/teacher/activity/homeworklist'
                    },
                    {
                        path: '/teacher/activity/homeworklist',
                        component: teacherHomeworkList
                    },
                    {
                        path: '/teacher/activity/homeworkdetail',
                        component: teacherHomeworkDetail
                    },
                    {
                        path: '/teacher/activity/submittedhomeworkdetail',
                        component: teacherSubmittedHomeworkDetail
                    },
                    {
                        path: '/teacher/activity/publish',
                        component: publishHomework
                    },
                    {
                        path: '/teacher/activity/noticelist',
                        component: teacherNoticeList,

                    },
                    {
                        path: '/teacher/activity/noticedeliver',
                        component: noticeDeliver
                    },
                    {
                        path: '/teacher/activity/noticedetail',
                        component: teacherNoticeDetail
                    },
                ]
            },
            {
                path: '/teacher/signin',
                component: TeacherSignin
            },
            {
                path: '/teacher/result',
                component: TeacherResult,
                children: [{
                        path: '',
                        redirect: '/teacher/result/resultlist'
                    },
                    {
                        path: '/teacher/result/resultlist',
                        component: TeacherResultList,
                    },
                    {
                        path: '/teacher/result/inputmain',
                        component: TeacherInputMain,
                        children: [{
                                path: '',
                                redirect: '/teacher/result/resultinput'
                            },
                            {
                                path: '/teacher/result/resultinput',
                                component: TeacherResultInput,
                            },
                            {
                                path: '/teacher/result/dailyscore',
                                component: TeacherDailyScore,
                            },
                            {
                                path: '/teacher/result/inputsingle',
                                component: TeacherInputSingle,
                            },
                            {
                                path: '/teacher/result/searchdaily',
                                component: TeacherSearchDaily,
                            }
                        ]

                    },
                    {
                        path: 'finalanalysis',
                        component: TeacherResultFinalAnalysis
                    },
                    {
                        path: 'taskanalysis',
                        component: TeacherResultTaskAnalysis
                    }
                ]
            },
            {
                path: '/teacher/comment',
                component: TeacherComment,
                children: [{
                        path: '',
                        redirect: '/teacher/comment/commentlist'
                    },
                    {
                        path: '/teacher/comment/commentlist',
                        component: tchcommentlist
                    },
                    {
                        path: '/teacher/comment/commentdetail',
                        component: tchcommentdetail
                    },
                    {
                        path: '/teacher/comment/owncommentlist',
                        component: tchowncommentlist
                    },
                    {
                        path: '/teacher/comment/owncommentdetail',
                        component: tchowncommentdetail
                    }
                ]
            },
            {
                path: '/teacher/manage',
                component: TeacherManage,
                children: [{
                        path: '',
                        redirect: '/teacher/manage/studentlist'
                    },
                    {
                        path: '/teacher/manage/studentlist',
                        component: studentlist
                    },
                    {
                        path: '/teacher/manage/createstudent',
                        component: createstudent
                    },
                    {
                        path: '/teacher/manage/createclass',
                        component: createclass
                    }
                ]
            },


        ]
    },


]





//2.创建Router对象,export default导出
export default new Router({
    //配置路由和组件之间的关系，
    routes,
    mode: "history"
})



//3.在vue里挂载