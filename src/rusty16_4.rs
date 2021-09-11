use regex::Regex;
use std::collections::HashMap;

#[derive(Debug)]
struct Code {
    code: String,
    checksum: String,
    num: usize,
}

#[allow(unused_variables)] // disable unused variable warning
pub fn run() {
    let input_string = match std::fs::read_to_string("./data/2016-puzzle4.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };
    let input: Vec<&str> = input_string.split("\r\n").collect();
    let test = vec![
        "aaaaa-bbb-z-y-x-123[abxyz]", // is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
        "a-b-c-d-e-f-g-h-987[abcde]", // is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
        "not-a-real-room-404[oarel]", // is a real room.
        "totally-real-room-200[decoy]", // is not a real room.
    ];

    // println!("split in: {:#?}", test);
    let no_dashes: Vec<String> = test
        .iter()
        .map(|x| x.to_string().replace("-", ""))
        .map(|x| x.replace("]", ""))
        .map(|x| x.replace("[", ""))
        .collect();
    // println!("removed?!: {:#?}", no_dashes);

    let re1 = Regex::new(r"[a-z]+").unwrap();
    let re2 = Regex::new(r"([0-9])([a-z]+)").unwrap();
    let re3 = Regex::new(r"[0-9]+").unwrap();

    let done: Vec<Code> = no_dashes
        .iter()
        .map(|x| Code {
            code: match re1.find(x) {
                Some(y) => y.as_str().to_string(),
                None => "none".to_string(),
            },
            checksum: match re2.captures(x) {
                Some(y) => y[2].to_string(),
                None => "none".to_string(),
            },
            num: match re3.find(x) {
                Some(y) => y.as_str().to_string().parse().unwrap(),
                None => 0,
            },
        })
        .collect();

    // println!("dfsfsdf {:#?}", done);

    let mut counter = 0;
    for i in done {
        println!("testing {:?}", i.code);
        counter += make_checksum(i);
    }
    println!("\ncorrect ones: {}\n", counter);

    // 162501 wrong
    // 1344 wrong
}

fn _check_entry(entry: Code) -> usize {
    let checksum: Vec<&str> = entry.checksum.split("").filter(|x| !x.is_empty()).collect();

    let mut buffer = 9999;
    for c in checksum.iter() {
        print!("letter: \"{}\" ", c);
        let matching_letters: usize = entry.code.matches(c).collect::<Vec<_>>().len();
        println!("appears {:#?} times", matching_letters);
        if matching_letters > buffer || matching_letters == 0 {
            println!("hot damn!!");
            return 0;
        }
        if matching_letters <= buffer {
            buffer = matching_letters;
        }
    }
    println!("good one..");
    entry.num
}

fn make_checksum(entry: Code) -> usize {
    let control_checksum = entry.checksum;
    // let mut letters = HashMap::new();

    // for ch in entry.code.chars() {
    //     let counter = letters.entry(ch).or_insert(0);
    //     *counter += 1;
    // }

    let mut to_sort: Vec<char> = entry.code.chars().collect();
    to_sort.sort();

    println!("HM: {:?}", to_sort);

    let checksum: String = "oarel".to_string(); // placeholder
    if control_checksum.eq(&checksum) {
        return entry.num;
    } else {
        return 0;
    }
}
