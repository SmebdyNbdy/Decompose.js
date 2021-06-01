// Set up css variables and color palette

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
    }
    this.globs.style = style;
}
