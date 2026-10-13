import argon2 from 'argon2';

async function hashPassword(password) {
    return await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 65536, // 64 MiB
        timeCost: 3,       // Iterations
        parallelism: 4     // Threads
    });
}

async function verifyPassword(hash, password) {
    try {
        return await argon2.verify(hash, password); // Returns true or false
    } catch (err) {
        return false;
    }
}

export default{
    hashPassword,
    verifyPassword
}