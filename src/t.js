// SAMPLE: Set up css variables and color palette

let font = "Inter, sans-serif";

export default function () {
    let color = (str) => {
        let colorVal = str[0];
        return {
            a100: `#${colorVal}`,
            a075: `#${colorVal}bf`,
            a050: `#${colorVal}7f`,
            a025: `#${colorVal}3f`,
        }
    }
    let style = {
        // -<< font values >>-
        font32: `200 32px/1 ${font}`,
        font24: `400 24px/1 ${font}`,
        font16: `200 16px/1 ${font}`,
        font16Bold: `400 16px/1 ${font}`,
        font12: `200 12px/1 ${font}`,

        // -<< font feature settings >>-
        fontFeat: "'zero', 'ss01', 'ss02', 'ss03', 'cv01', 'cv05', 'cv06', 'cv07', 'cv11'",
        fontFeatNnum: "'tnum', 'zero', 'ss01', 'ss02', 'ss03', 'cv01', 'cv05', 'cv06', 'cv07', 'cv11'",
        fontFeatHead: "'case', 'zero', 'ss01', 'ss02', 'ss03', 'cv01', 'cv05', 'cv06', 'cv07', 'cv11'",

        // -<< primary color >>-
        prim: color`f7b24a`,
        // -<< secondary color >>-
        scnd: color`106570`,
        // -<< warning color >>-
        warn: color`f74a55`,
        // -<< text color >>-
        text: color`000000`,
        // -<< background color >>-
        bckg: color`ffffff`,
        // -<< box shadow color >>-
        bxsh: color`02132c`,

        // -<< default border radius >>-
        brdr: "24px",
    }

    // -<< box shadow default >>-
    style.fly = `1px 1px 4px 1px ${style.bxsh.a050}`;
    style.modernShadow = (count, color) => {
        switch (count) {
        case 1:
            return `0 0 0 6px ${style[color].a025}`;
        case 2:
            return `0 0 0 4px ${style[color].a025}, 0 0 0 8px ${style[color].a025}`;
        case 3:
            return `0 0 0 4px ${style[color].a075}, 0 0 0 8px ${style[color].a050}, 0 0 0 12px ${style[color].a025}`;
        }

    }

    this.globs.conf = {
        "$$Root": {
            "name": null,
            "prev": "@root@"
        },
        "/": {
            "name": "Lampa.School",
            "prev": "$$Root"
        },
        "/profile/": {
            "name": "Профиль",
            "prev": "/"
        },
        "/profile/login/": {
            "name": "Вход",
            "prev": "/profile/"
        },
        "/profile/register/": {
            "name": "Регистрация",
            "prev": "/profile/"
        },
        "/mycourses/": {
            "name": "Мои курсы",
            "prev": "/"
        },
        "/catalog/": {
            "name": "Каталог",
            "prev": "/"
        },
        "/mycourses/room/": {
            "name": "Кабинет",
            "prev": "/mycourses/"
        },
        "/mycourses/tasks/": {
            "name": "Задания",
            "prev": "/mycourses/"
        },
        "/Users/alexgavrikov/Developer/lampasch/ledit/ledit/test.html": {
            "name": "Хуй знает где",
            "prev": "/profile/"
        }
    }

    this.globs.style = style;

    this.globs.pageColor = (color) => {
        this.style(
            `body {
                background-color: ${color};
            }`)
    }

    this.style(
        `body {
            margin: 0;
            padding: 0;
            font: ${style.font16};
            padding-top: 40px;
            transition: 2s background-color ease-out;
        }`);
}
