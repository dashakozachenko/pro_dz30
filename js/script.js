'use strict';

const users = {
    UsersName: 'Alex'
};

function info(phone, email) {
    console.log(`Name: ${this.UsersName}, Phone: ${phone}, Email: ${email}`);
}

function bind  (fn, ctx) {
    const rest = [].slice.call(arguments, 2);

    return function () {
        const args = [].slice.call(arguments);

        return fn.apply(ctx, rest.concat(args));
    };
}

bind(info, users)('012345', 'Alex@gmail.com');
bind(info, users, '012345')('Alex@gmail.com');
bind(info, users, '012345', 'Alex@gmail.com')();


function bind2 (fn , ctx, ...rest) {
    return function (...args) {
        const id = Date.now().toString()

        ctx [id] = fn

        const result = ctx [id] (...rest.concat(args))

        delete ctx[id]

        return result
    }
}

bind2(info, users)('012345', 'Alex@gmail.com');
bind2(info, users, '012345')('Alex@gmail.com');
bind2(info, users, '012345', 'Alex@gmail.com')();
