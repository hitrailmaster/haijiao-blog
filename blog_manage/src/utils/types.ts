import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
export interface User {
    nickname: string
    email: string
    description: string
    status: number
    fans: number
    points: number
    rdate: string
    uid: string
    type: number
    create_date: string
    forbid: boolean
}
export interface RouterProps extends RouteComponentProps {
    history: History
    [name: string]: any
    match: any
}
export interface Article {
    author: string
    date: string
    pid: number
    commentNumber: number
    articleName: string
    content: string
}
export interface UserContextType {
    userName: string
    setName: Function
    displayName?: string
}
export interface Topic {
    mainTitle: string
    subTitle: string
    mainID: number 
    subID: number
    managerEmail?: string
    count?: number
    masters: Master[]
    subTopics: Topic[]
}
export interface Master {
    uid: string,
    nickname: string
}
export interface Comment {
    commenttitle: string
    commentdate: string
    commentContent: string
    username: string
    upcount: number
    downcount: number
    commentID: number
    commentuserID: number
}
export interface response {
    data: []
}
export interface EVENT {
    target: {
        value: string
    }
}
export interface ModalProps {
    refresh: Function
}