pub fn run() {
    let _input = match std::fs::read_to_string("./data/2016-puzzle9.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };
}
