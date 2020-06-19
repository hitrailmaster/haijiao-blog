import * as types from './types';
// export const ArticleData: types.Article[] = [
//     {
//         pid: "342342374234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },
//     {
//         pid: "342342364234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "342342444234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "342333334234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "342224234234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "3334234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "3434234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "342234234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     },{
//         pid: "34234234",
//         date: "2020-05",
//         commentNumber: 3,
//         author: "XXXXX",
//         articleName: "测试",
//         content: "11111"
//     }
// ];
// export const UserData: types.User[] = [
//     {
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342634234",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 0,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },
//     {
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342345234",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 1,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },{
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342342434",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 2,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },{
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342342343",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 0,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },{
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342342342",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 1,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },{
//         nickname: '测试',
//         email: "XXXXX@XX.com",
//         uid: "342342342341",
//         status: 0,
//         rdate: "2020-05",
//         points: 120,
//         fans: 0,
//         type: 2,
//         description: "你覅我爱上才开始覅欧文放牛娃i封你为服务非法那我覅实地考察司法那我i放牛娃"
//     },
// ];
// export const CommentData: types.Comment[] = [
//     {
//         cid: 1,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },
//     {
//         cid: 2,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },{
//         cid: 3,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },{
//         cid: 34234234234,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },{
//         cid: 34234234234,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },{
//         cid: 34234234234,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },{
//         cid: 34234234234,
//         create_date: "2020-05",
//         username: "XXXXX",
//         title: "测试",
//         content: "11111",
//         upcount: 12,
//         downcount: 2
//     },
// ];
// export const TopicData: types.Topic[] = [
//     {
//         mainID: 342346234,
//         subID: 34234222346,
//         subTitle: "测试",
//         mainTitle: "测试",
//         managerEmail: "XXXXX@xxxx",
//         count: 12,
//         subTopics: [
//             {
//                 mainID: 34234623411,
//                 subID: 34234222346,
//                 subTitle: "测试",
//                 mainTitle: "测试",
//                 managerEmail: "XXXXX@xxxx",
//                 count: 12,
//                 subTopics: []
//             },
//             {
//                 mainID: 34234623411,
//                 subID: 34234222346,
//                 subTitle: "测试",
//                 mainTitle: "测试",
//                 managerEmail: "XXXXX@xxxx",
//                 count: 12,
//                 subTopics: []
//             }
//         ]
//     }
// ];