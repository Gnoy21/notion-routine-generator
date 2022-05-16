const { Client } = require('@notionhq/client');
const schedule = require('node-schedule');

require('dotenv').config();

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

var routineList = {}
routineList['운동'] = '일상';
routineList['토익 영단어'] = '공부';

let today = new Date();

//const j = schedule.scheduleJob('* 1 0 * * *', function(){
    for (var key in routineList) {
        (async() => {
            const response = await notion.pages.create({
                parent: {
                    database_id: process.env.NOTION_DATABASE_ID
                },
                properties: {
                    "제목": {
                        title: [
                            {
                                text: {
                                    content: key,
                                },
                            },
                        ],
                    },
                    "날짜": {
                        date: {
                            start: today.toISOString().substring(0, 10),
                        },
                    },
                    "종류": {
                        select: {
                            name: routineList[key],
                        },
                    },
                },
            });
            return response
        })();
    }
//});