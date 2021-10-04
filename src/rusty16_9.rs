use regex::Regex;

pub fn run() {
    let _input = match std::fs::read_to_string("./data/2016-puzzle9.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let _test_input = "AA(8x2)(3x3)ABCEXTRA";

    check_input(&_input);
    // part one answer: 70186
}

fn check_input(input: &str) -> (String, usize) {
    let re_check_brackets = Regex::new(r"\((\d+)x(\d+)\)").unwrap();
    let re_check_letters = Regex::new(r"[A-Z]+").unwrap();
    let re_get_numbers = Regex::new(r"\d+").unwrap();

    let mut output = String::new();
    let mut offset = 0;

    loop {
        match re_check_letters.find_at(input, offset) {
            Some(x) => {
                if x.start() == offset {
                    let string = x.as_str();
                    output.push_str(string);

                    offset = x.end(); // set offset for next loop
                } else {
                }
            }
            None => {}
        }

        match re_check_brackets.find_at(input, offset) {
            Some(y) => {
                if y.start() == offset {
                    let instruct: Vec<regex::Match> =
                        re_get_numbers.find_iter(y.as_str()).collect();
                    let times = instruct[1].as_str().parse::<usize>().unwrap();
                    let length = instruct[0].as_str().parse::<usize>().unwrap();
                    for _ in 0..times {
                        output.push_str(&input[y.end()..y.end() + length]);
                    }

                    offset = y.end() + length; // set offset for next loop
                }
            }
            None => {}
        }

        if offset == input.len() {
            // println!("input.len() -1 : {} offset: {}", input.len() - 1, offset);
            break;
        }
        // println!("output: {} offset: {}", output, offset);
    }

    let length = output.len();
    println!("\ninput: {}", input);
    println!("output: {}\nlength: {}", output, length);
    (output, length)
}

#[test]
fn test_string1() {
    assert_eq!(
        check_input("(8x2)(3x3)ABC"),
        ("(3x3)ABC(3x3)ABC".to_string(), 16)
    );
}
#[test]
fn test_string2() {
    assert_eq!(
        check_input("AS(8x2)(3x3)ABC"),
        ("AS(3x3)ABC(3x3)ABC".to_string(), 18)
    );
}
#[test]
fn test_string3() {
    assert_eq!(
        check_input("AS(8x2)(3x3)ABCEXTRA"),
        ("AS(3x3)ABC(3x3)ABCEXTRA".to_string(), 23)
    );
}
