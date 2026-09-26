const fs=require("fs");
const a=JSON.parse(fs.readFileSync(__dirname+"/served-draft.json","utf8"));
const b=JSON.parse(fs.readFileSync(__dirname+"/../../../snapshots/packet-54-bundle__business__assessing-competitiveness.json","utf8")).tables;
const canon=(o,drop)=>{if(Array.isArray(o))return o.map(x=>canon(x,drop));if(o&&typeof o==="object"){const r={};for(const k of Object.keys(o).sort())if(!drop.includes(k))r[k]=canon(o[k],drop);return r}return o};
for (const k of ["content","notes","diagrams","practice","mistakes"]) {const x=JSON.stringify(canon(a[k],["quizIndices"])),y=JSON.stringify(canon(b[k],["quizIndices"]));console.log(k, x===y, x.length, y.length);}
