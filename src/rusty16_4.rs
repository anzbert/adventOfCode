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
    let input: Vec<&str> = input_string.split("\n").collect();
    let test = vec![
        "aaaaa-bbb-z-y-x-123[abxyz]", // is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
        "a-b-c-d-e-f-g-h-987[abcde]", // is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
        "not-a-real-room-404[oarel]", // is a real room.
        "totally-real-room-200[decoy]", // is not a real room.
    ];

    // println!("split in: {:#?}", test);
    let no_dashes: Vec<String> = input
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

    println!("prepared input {:#?}", done);

    let mut counter = 0;
    for i in done {
        counter += make_checksum(i);
    }
    println!("\ncorrect ones: {}\n", counter);

    // RESULT PART ONE: 158835
}

fn make_checksum(entry: Code) -> usize {
    println!("testing {:?} - value: {}", entry.code, entry.num);
    let mut letters = HashMap::new();

    for ch in entry.code.chars() {
        let counter = letters.entry(ch).or_insert(0);
        *counter += 1;
    }

    let mut coll: Vec<char> = Vec::new();
    for i in (1..99).rev() {
        let mut new: Vec<_> = letters
            .iter()
            .filter(|entry| *entry.1 == i)
            .map(|x| *x.0)
            .collect();
        new.sort();
        coll.append(&mut new);
    }

    let mut to_sort: Vec<char> = coll.into_iter().collect();

    to_sort.dedup();
    to_sort.resize(5, 'z');

    let checksum: String = to_sort.iter().collect();
    println!("provided checksum: {:?}", entry.checksum);
    print!("  -> created checksum: {:?} -> ", checksum);

    if entry.checksum.eq(&checksum) {
        println!("match! add {}\n", entry.num);
        return entry.num;
    } else {
        println!("no match...\n");
        return 0;
    }
}
