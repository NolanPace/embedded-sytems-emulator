import React,{useState} from 'react';import{createRoot}from'react-dom/client';import './style.css';
type Cpu={ram:number[],acc:number,pc:number,zero:boolean,halted:boolean,cycles:number};
const program=[0x10,5,0x11,3,0x20,0x80,0xff];
function reset():Cpu{const ram=Array(256).fill(0);program.forEach((b,i)=>ram[i]=b);return{ram,acc:0,pc:0,zero:false,halted:false,cycles:0}}
function step(old:Cpu):Cpu{
 if(old.halted)return old;
 const c={...old,ram:[...old.ram]};const opcode=c.ram[c.pc];c.pc=(c.pc+1)&255;
 let arg:number;
 switch(opcode){
  case 0x10:arg=c.ram[c.pc];c.pc=(c.pc+1)&255;c.acc=arg;break;
  case 0x11:arg=c.ram[c.pc];c.pc=(c.pc+1)&255;c.acc=(c.acc+arg)&255;break;
  case 0x20:arg=c.ram[c.pc];c.pc=(c.pc+1)&255;c.ram[arg]=c.acc;break;
  case 0x21:arg=c.ram[c.pc];c.pc=(c.pc+1)&255;c.acc=c.ram[arg];break;
  case 0x30:arg=c.ram[c.pc];c.pc=arg;break;
  case 0x31:arg=c.ram[c.pc];c.pc=(c.pc+1)&255;if(c.zero)c.pc=arg;break;
  case 0xff:c.halted=true;break;
  default:c.halted=true;break;
 }
 c.zero=c.acc===0;c.cycles++;return c;
}
const hex=(n:number)=>n.toString(16).toUpperCase().padStart(2,'0');
function App(){
 const[cpu,setCpu]=useState<Cpu>(reset);
 const[custom,setCustom]=useState('10 05 11 03 20 80 FF');const[err,setErr]=useState('');
 function load(){
  const bytes=custom.trim().split(/[\s,]+/).map(s=>parseInt(s,16));
  if(!bytes.length||bytes.length>256||bytes.some(b=>Number.isNaN(b)||b<0||b>255)){setErr('Use 1–256 two-digit hexadecimal bytes.');return}
  const fresh=reset();fresh.ram.fill(0);bytes.forEach((b,i)=>fresh.ram[i]=b);setCpu(fresh);setErr('');
 }
 function run(){setCpu(prev=>{let next=prev;for(let i=0;i<128&&!next.halted;i++)next=step(next);return next})}
 return <main><header><div className="eyebrow">C / REACT / COMPUTER ARCHITECTURE</div><h1>8-Bit CPU <span>Lab</span></h1><p>Explore a virtual accumulator CPU, one instruction at a time.</p></header><div className="toolbar"><button onClick={()=>setCpu(step)}>Step instruction</button><button onClick={run}>Run 128 cycles</button><button className="secondary" onClick={()=>{setCpu(reset());setErr('')}}>Reset</button><strong>{cpu.halted?'HALTED':'RUNNING'} · {cpu.cycles} cycles</strong></div>
 <div className="stats">{[['ACC',hex(cpu.acc)],['PC',hex(cpu.pc)],['ZERO',cpu.zero?'1':'0'],['RAM[80]',hex(cpu.ram[128])]].map(([key,val])=><article key={key}><small>{key}</small><strong>{val}</strong></article>)}</div>
 <section><h2>Instruction program (hex)</h2><div className="program"><input aria-label="Hex program" value={custom} onChange={e=>setCustom(e.target.value)}/><button onClick={load}>Load program</button></div>{err&&<p role="alert" className="error">{err}</p>}<p>10=LOADI · 11=ADDI · 20=STORE · 21=LOAD · 30=JUMP · 31=JZ · FF=HALT</p></section>
 <section><h2>Memory · 256 bytes</h2><div className="memory">{cpu.ram.map((v,i)=><div key={i} className={'byte '+(i===cpu.pc?'current':'')} title={'0x'+hex(i)}><small>{hex(i)}</small><b>{hex(v)}</b></div>)}</div></section></main>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);