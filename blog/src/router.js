import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Profile from './views/Profile'
import Topic from './views/TopicPage'
import MyCollection from './views/MyCollection'
import MyFollow from './views/MyFollow'
import MyFans from './views/MyFans'
import MyPost from './views/MyPost'
import ChangePWD from './views/ChangePWD'
import MyProfile from './views/MyProfile'
import NewPost from './views/NewPost'
import Rank from './views/Rank'
import Message from './views/Message'
import PostDetail from './views/PostDetail'
import MyAnswer from './views/MyAnswer'
import ForgetPWD from './views/ForgetPWD'
import OtherProfile from './views/OtherProfile'
import Search from './views/Search'
import TopicIndex from './views/TopicIndex'
Vue.use(Router);

export default new Router({
    routes: [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect: '/login',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'register',
                name: 'Register',
                component: Register
            },
            {
                path: 'forgetpwd',
                name: 'ForgetPWD',
                component: ForgetPWD
            }
        ]
    }, 
    {
        path: "/home",
        name: "Home",
        component: Home,
        redirect: "/home/topic",
        children: [
            {
                path: "profile",
                name: "Profile",
                component: Profile,
                redirect: "/home/profile/myprofile",
                children: [
                    {
                        path: 'mycollection',
                        name: 'MyCollection',
                        component: MyCollection
                    },
                    {
                        path: 'myfans',
                        name: 'MyFans',
                        component: MyFans
                    },
                    {
                        path: 'myfollow',
                        name: 'MyFollow',
                        component: MyFollow
                    },
                    {
                        path: 'mypost',
                        name: 'MyPost',
                        component: MyPost
                    },
                    {
                        path: 'myprofile',
                        name: 'MyProfile',
                        component: MyProfile
                    },
                    {
                        path: 'changepwd',
                        name: 'ChangePWD',
                        component: ChangePWD
                    },
                    {
                        path: 'myanswer',
                        name: 'MyAnswer',
                        component: MyAnswer
                    }
                ]
            },
            {
                path: "topic",
                name: "TopicIndex",
                component: TopicIndex
            },
            {
                path: "newpost",
                name: "NewPost",
                component: NewPost
            },
            {
                path: "rank",
                name: "Rank",
                component: Rank
            },
            {
                path: "message",
                name: 'Message',
                component: Message
            },
            {
                path: 'postdetail',
                name: "PostDetail",
                component: PostDetail
            },
            {
                path: 'otherprofile',
                name: 'OtherProfile',
                component: OtherProfile
            },
            {
                path: 'search',
                name: 'Search',
                component: Search
            }
        ]
    }]
})