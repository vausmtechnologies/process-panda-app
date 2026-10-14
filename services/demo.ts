import AsyncStorage from '@react-native-async-storage/async-storage';
export const DEMO_KEY='pp_build4_local_completions';
export type DemoVideo={id:string;title:string;category:string;summary:string;points:string[];url?:string;thumbnail?:string;duration:string};
export const demoVideos:DemoVideo[]=[
{id:'abrasive-wheels',title:'Abrasive Wheels',category:'Toolbox Talks',duration:'Vimeo',url:'https://vimeo.com/911195338',thumbnail:'https://vumbnail.com/911195338.jpg',summary:'Abrasive wheel safety, correct selection and safe operation.',points:['Ensure competence is essential for performing wheel swaps safely.','Recognise the importance of proper gear, including eye and ear protection.','Learn techniques like applying light pressure and avoiding side wheeling.','Understand the role of guards and tool rests in workshop safety.','Follow strict procedures when debuting replacement wheels.','Ensure wheels are stopped when not in use for safety.','Emphasise visual inspections and teamwork to uphold a hazard-free space.']},
{id:'accident-prevention',title:'Accident Prevention',category:'Toolbox Talks',duration:'Awaiting URL',summary:'Recognising hazards, safe working practices and reporting concerns.',points:['Recognise that accidents often stem from human error; prevention is essential.','Follow safety instructions, site rules and report hazards.']},
{id:'accident-procedure',title:'Accident Procedure',category:'Toolbox Talks',duration:'Awaiting URL',summary:'Responding to incidents and reporting accidents.',points:['Report accidents and near misses to the designated person.','Know where to find first aiders and first-aid equipment.']},
{id:'ppe',title:'Personal Protective Equipment',category:'Toolbox Talks',duration:'Awaiting URL',summary:'Using and inspecting appropriate PPE.',points:['Select, maintain and use appropriate protective equipment.']},
{id:'iso-9001',title:'ISO 9001 — Introduction',category:'ISO Training',duration:'Awaiting URL',summary:'Quality management introduction.',points:['Understand the purpose of a quality management system.']},
];
export type DemoCompletion={id:string;completedAt:string;confirmed:true};
export async function demoRecords():Promise<DemoCompletion[]>{try{return JSON.parse((await AsyncStorage.getItem(DEMO_KEY))||'[]')}catch{return []}}
export async function markDemoComplete(id:string){const r=await demoRecords();if(!r.some(x=>x.id===id))await AsyncStorage.setItem(DEMO_KEY,JSON.stringify([...r,{id,completedAt:new Date().toISOString(),confirmed:true}]));}
export async function resetDemo(){await AsyncStorage.removeItem(DEMO_KEY)}
