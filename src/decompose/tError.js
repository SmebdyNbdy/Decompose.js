export const tError = {
    e703() {
        console.log(`TERROR-903::invalid value, can't store functions and symbols in state!`);
    },
    e801(t, k) {
        console.log(`TERROR-801::Attempted to use Object.defineProperty on ${t}, please use the default setter ('${t}.${k} = ') instead`);
    },
    e821(v) {
        console.log(`TERROR-821::${v} is not a valid callback!`);
    },
    e903(v) {
        console.log(`TERROR-903::invalid style, ${v} is not a string value!`);
    },
}
