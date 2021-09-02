use std::fs;

pub fn run() {
    let input = match fs::read_to_string("./data/2016-puzzle2.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };
    println!("input: {}", input);

    let test = "ULLRRDDDLURDLUUUUD"; // result 5
}
