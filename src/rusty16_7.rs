use fancy_regex;

pub fn run() {
    let _input_string = match std::fs::read_to_string("./data/2016-puzzle7.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let _test = "abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn\n";

    let input: Vec<&str> = _test.lines().collect();

    println!("input: {:?}", input);
    let re_split = fancy_regex::Regex::new(r"(\w+)[(\w+)](\w+)").unwrap();

    let mapped: Vec<_> = input
        .iter()
        .map(|line| re_split.captures(line).unwrap().unwrap())
        .collect();

    let mapped2: Vec<_> = mapped
        .iter()
        .map(|entry| {
            vec![
                entry.get(0).unwrap().as_str(),
                entry.get(1).unwrap().as_str(),
                entry.get(2).unwrap().as_str(),
            ]
        })
        .collect();

    println!("input: {:?}", mapped2);
}
