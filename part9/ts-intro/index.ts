const myObject = JSON.parse("{}");



declare function debug(value: any): void;

debug("a string");
debug(23);
debug({ color: "blue" });

declare function swap(x: [number, string]): [string, number];

declare const pair: [any, any];
swap(pair);