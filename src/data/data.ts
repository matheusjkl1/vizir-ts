interface Idds {
  dddOption: string,
  origin: string,
  destiny: string,
  valuePerMinute: number,
}

interface Iplans {
  descriptPlan: string,
  minutesPerPlane: number,
}

const dddsList: Idds[]  = [
 { dddOption: "011-016", origin: '011', destiny: '016', valuePerMinute: 1.90 },
 { dddOption: "016-011", origin: '016', destiny: '011', valuePerMinute: 2.90 },
 { dddOption: "011-017", origin: '011', destiny: '017', valuePerMinute: 1.70 },
 { dddOption: "017-011", origin: '017', destiny: '011', valuePerMinute: 2.70 },
 { dddOption: "011-018", origin: '011', destiny: '018', valuePerMinute: 0.90 },
 { dddOption: "018-011", origin: '018', destiny: '011', valuePerMinute: 1.90 },
]

const plans: Iplans[] = [
  {descriptPlan: "FaleMais 30", minutesPerPlane: 30},
  {descriptPlan: "FaleMais 60", minutesPerPlane: 60},
  {descriptPlan: "FaleMais 120", minutesPerPlane: 120},
];

export {
  dddsList,
  plans,
};