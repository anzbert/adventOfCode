use fancy_regex::Regex;

pub fn run() {
    let _input_string = match std::fs::read_to_string("./data/2016-puzzle7.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let _test = "aba[mnbabop]qrstabba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\niooooj[asaaaadfgh]zxiaaicvbn\n";
    let _test_text = "abba[mnop]qrst";

    let input: Vec<&str> = _input_string.lines().collect();
    // println!("input: {:#?}", input);

    let re_tls = Regex::new(r"(\w)(?!\1)(\w)\2\1").unwrap();
    let re_sls = Regex::new(r"(\w)(?!\1)(\w)\1").unwrap();

    let re_in_brackets = Regex::new(r"(\[.+?\])").unwrap();
    let re_out_brackets = Regex::new(r"(?<=\b)\w+?(?=\[|$)").unwrap();

    let mut split: Vec<_> = Vec::new();
    for string in input {
        let mut out_b_vec: Vec<&str> = vec![];
        for i in re_out_brackets.find_iter(string) {
            out_b_vec.push(i.unwrap().as_str());
        }
        let out_b: String = out_b_vec.join("--");

        let mut in_b_vec: Vec<&str> = vec![];
        for i in re_in_brackets.find_iter(string) {
            in_b_vec.push(i.unwrap().as_str());
        }
        let in_b: String = in_b_vec.join("--");

        split.push(vec![out_b, in_b]);
    }
    println!("split: {:#?}", split);

    let mut counter = 0;
    for ip in split.iter() {
        if !test_tls(&ip[1], &re_tls) {
            if test_tls(&ip[0], &re_tls) {
                counter += 1;
            }
        }
    }
    println!("counter: {:?}", counter); // part one result: 105

    let mut counter2 = 0;
    for ip in split.iter() {
        match test_sls(&ip[0], &ip[1], &re_sls) {
            true => {
                counter2 += 1;
            }
            false => {}
        }
    }
    println!("counter2: {:?}", counter2); // part two result: 258
}

fn test_tls(ip: &str, re: &Regex) -> bool {
    match re.find(ip).unwrap() {
        Some(_x) => true,
        None => false,
    }
}

fn test_sls<'a>(out_ip: &str, in_ip: &str, re: &Regex) -> bool {
    for i in 0..out_ip.len() - 2 {
        let shorter = &out_ip[i..out_ip.len()];

        let matches = re.find_iter(shorter);

        for m in matches {
            let st: Vec<char> = m.unwrap().as_str().chars().collect();
            let flip: String = vec![st[1], st[0], st[1]].iter().collect();

            let reg_flip = Regex::new(&flip as &str).unwrap();

            match reg_flip.find(in_ip).unwrap() {
                Some(_x) => {
                    return true;
                }
                None => {}
            };
        }
    }
    false
}
