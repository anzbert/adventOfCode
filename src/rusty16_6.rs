pub fn run() {
    let _input_string = match std::fs::read_to_string("./data/2016-puzzle6.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let _test = "eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar";

    let input: Vec<&str> = _test.lines().collect();
    println!("input: {:?}", input);
}
