function * GID() {
    let gid = 0;
    while (true) {
        yield `GID${gid}${Date.now()}${gid}`
        gid += 1;
    }
}
const gidGetter = GID();

export var gid = {
    val: "",
    get() {
        this.val = gidGetter.next().value;
        return this.val;
    }
}
