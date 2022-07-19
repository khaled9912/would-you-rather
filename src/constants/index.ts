export const DEFAULT_LOGIN_IMAGE = 'https://res.cloudinary.com/dmtopd6ps/image/upload/v1654942442/do-you-login_rtt09i.png';
export const DEFAULT_IMAGE = 'https://res.cloudinary.com/dmtopd6ps/image/upload/v1655020245/tuktukdesign200100054_oyla73.jpg';
export const NOT_FOUND_IMAGE = 'https://cdn-icons-png.flaticon.com/512/580/580185.png';
export  interface User {
    id: string,
    name: string,
    avatarURL: string,
    answers: Object,
    questions: Object
}

export  interface Question {
    id: string,
    author: string,
    timestamp: number,
    optionOne: {
      votes: string[],
      text: string,
    },
    optionTwo: {
      votes: string[],
      text: string
    }
}