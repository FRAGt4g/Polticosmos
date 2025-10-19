"use server";

import fs from "fs";
import Color from "color"
import type { StarMatrix } from "~/lib/types";


const filePath = "adjusted_points.txt"; // your input file

const fileData = fs.readFileSync(filePath, "utf-8");
const lines = fileData.trim().split("\n").slice(0, -1);

const uidFile = "uids.txt"; // your input file

const uidsAll = fs.readFileSync(uidFile, "utf-8");
const uids = uidsAll.trim().split("\n");

const attributesFile = "colors.txt";

const attributesAll = fs.readFileSync(attributesFile, "utf-8");
const attributes = attributesAll.split("\n").map(l=>l.split(" "));

const starMatrix: StarMatrix = {
    objects: lines.map((line, i) => {
        const [x, y, z] = line.trim().split(/\s+/).map(Number);
        return {
        position: [x, y, z] as [number, number, number],
        scale: Math.min(0.3 + parseFloat(attributes[i][2])*0.1,4),
        rep_perc: parseFloat(attributes[i][1]),
        name: decodeURI(attributes[i][3]).replace("%2C", ","),
        billId: uids[i]
        };
    }),
};

export async function GetStarMatrix(): Promise<StarMatrix> { return starMatrix; }
