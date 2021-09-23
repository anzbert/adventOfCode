use fancy_regex::Regex;

pub fn run() {
    let _input_string = match std::fs::read_to_string("./data/2016-puzzle7.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let _test = "abba[mnop]qrstabba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\niooooj[asaaaadfgh]zxiaaicvbn\n";
    let _test_text = "abba[mnop]qrst";

    let input: Vec<&str> = _input_string.lines().collect();
    // println!("input: {:#?}", input);

    let re_tls = Regex::new(r"(\w)(?!\1)(\w)\2\1").unwrap();
    let re_in_brackets = Regex::new(r"(\[.+?\])").unwrap();
    let re_out_brackets = Regex::new(r"(?<=\b)\w+?(?=\[|$)").unwrap();

    let mut split: Vec<_> = Vec::new();
    for string in input {
        let mut out_b_vec: Vec<&str> = vec![];
        for i in re_out_brackets.find_iter(string) {
            out_b_vec.push(i.unwrap().as_str());
        }
        let out_b: String = out_b_vec.join("-");

        let mut in_b_vec: Vec<&str> = vec![];
        for i in re_in_brackets.find_iter(string) {
            in_b_vec.push(i.unwrap().as_str());
        }
        let in_b: String = in_b_vec.join("-");

        split.push(vec![out_b, in_b]);
    }
    println!("split: {:#?}", split);

    let mut counter = 0;
    for ip in split {
        // println!("testing: {:?},", ip);
        if !test_tls(&ip[1], &re_tls) {
            if test_tls(&ip[0], &re_tls) {
                counter += 1;
                // println!("passed: {:?}\n", ip);
            }
        }
    }

    println!("counter: {:?}", counter); // part one result: 105
}

fn test_tls(ip: &str, re: &Regex) -> bool {
    match re.find(ip).unwrap() {
        Some(_x) => true,
        None => false,
    }
}
