use md5;
pub fn run() {
    let input = "ugkcyxxp";

    /*For example, if the Door ID is abc:
        The first index which produces a hash that starts with five zeroes is 3231929,
            which we find by hashing abc3231929; the sixth character of the hash,
            and thus the first character of the password, is 1.

            5017308 produces the next interesting hash, which starts with 000008f82...,
            so the second character of the password is 8.

        The third time a hash starts with five zeroes is for abc5278568, discovering the character f.

    In this example, after continuing this search a total of eight times, the password is 18f47a30.
    */

    let test = "abc";

    // md5 crate usage:
    let digest = md5::compute(b"abcdefghijklmnopqrstuvwxyz");
    println!("{:x}", digest); // "c3fcd3d76192e4007dfb496cca67e13b"
}
