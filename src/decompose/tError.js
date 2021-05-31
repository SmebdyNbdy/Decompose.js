export const tError = {
    e801(t, k) {
        console.log(`TERROR-801::Attempted to use Object.defineProperty on ${t}, please use the default setter ('${t}.${k} = ') instead`);
    },
    e821(v) {
        console.log(`TERROR-821::${v} is not a valid callback!`);
    }
}
