pub fn run() {
    #[allow(unused_variables)] // disable unused variable warning
    let input_string = match std::fs::read_to_string("./data/2016-puzzle4.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let input: Vec<&str> = input_string.split("\n").collect();
    let test = vec![
        "aaaaa-bbb-z-y-x-123[abxyz]", // is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
        "a-b-c-d-e-f-g-h-987[abcde]", // is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
        "not-a-real-room-404[oarel]", // is a real room.
        "totally-real-room-200[decoy]",
    ]; // is not a real room.

    println!("split in: {:#?}", test);
}
