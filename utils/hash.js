import {format} from "date-fns";
import bcrypt from "bcrypt";
import md5 from "md5";

async function createRandomHash() {
    const datetime = format(new Date(), 'yyyyMMddssmm')
    const salt = bcrypt.genSaltSync()
    return md5(`${datetime}_${salt.toString()}`)
}

export {
    createRandomHash
}
