import type { SVGProps } from "react";
export function Icon({name,className="w-5 h-5"}:{name:string,className?:string}){
 const p:Record<string,string>={upload:"M12 16V4m0 0L7 9m5-5 5 5M5 15v4h14v-4",play:"m9 7 8 5-8 5V7Z",shield:"M12 3 5 6v5c0 4.4 3 7.7 7 10 4-2.3 7-5.6 7-10V6l-7-3Z",search:"m21 21-4.3-4.3m2.3-5.2A7.5 7.5 0 1 1 4 11.5a7.5 7.5 0 0 1 15 0Z",arrow:"m9 18 6-6-6-6",school:"M3 10 12 4l9 6-9 6-9-6Zm3 3v6m12-6v6M4 20h16",check:"m5 12 4 4L19 6",file:"M7 3h7l4 4v14H7V3Zm7 0v5h5",trash:"M5 7h14m-9 4v6m4-6v6M8 7l1-3h6l1 3-1 14H9L8 7Z"};
 return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={p[name]||p.check}/></svg>
}

