use regex::Regex;

pub fn run() {
    // triangle inequality theorem:
    // the sum of any 2 sides of a trinagle must be greater than the third.

    #[allow(unused_variables)] // disable unused variable warning
    let input = match std::fs::read_to_string("./data/2016-puzzle3.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let test1 = "    5   10   25"; // -> invalid
                                   // parse(test1);

    let test2 =
        "101 301 501 \n 102 302 502 \n 103 303 503 \n 201 401 601 \n 202 402 602 \n 203 403 603";
    // test answer is 6

    let split: Vec<&str> = input.split("\n").collect();

    let mut parsed: Vec<Vec<u32>> = Vec::new();
    for i in &split {
        parsed.push(parse(i));
    }
    // println!("parsed: {:?}", parsed);

    let mut counter = 0;
    for t in &parsed {
        if t[0] + t[1] > t[2] && t[0] + t[2] > t[1] && t[1] + t[2] > t[0] {
            counter += 1;
        }
    }
    println!("counter: {} of {}", counter, parsed.len()); // RESULT ONE: 983

    // PART TWO:
    let mut counter2 = 0;
    for f in parsed.chunks(3) {
        // println!("{:?}", f);
        for i in 0..3 {
            if f[0][i] + f[1][i] > f[2][i]
                && f[0][i] + f[2][i] > f[1][i]
                && f[1][i] + f[2][i] > f[0][i]
            {
                counter2 += 1;
            }
        }
    }
    println!("counter2: {:?} of {}", counter2, parsed.len()); // RESULT PART TWO: 1836
}

fn parse(input: &str) -> Vec<u32> {
    let re = Regex::new(r"\d+").unwrap();
    let mut result: Vec<u32> = Vec::new();
    for n in re.find_iter(input) {
        let text = n.as_str();
        let num: u32 = text.parse().unwrap();
        result.push(num);
    }
    // println!("got: {:?}", result);
    result
}
