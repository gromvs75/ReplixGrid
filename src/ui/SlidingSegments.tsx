import {Children,cloneElement,isValidElement,useEffect,useLayoutEffect,useRef,useState,type ButtonHTMLAttributes,type ReactNode} from 'react';

/** One measured highlight, shared by both content switches and navigation. */
export function SlidingSegments({children,className,label,equal=false,navigation=false}:{children:ReactNode;className:string;label:string;equal?:boolean;navigation?:boolean}){
 const root=useRef<HTMLDivElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [pending,setPending]=useState<number|null>(null),[ready,setReady]=useState(false);
 const buttons=Children.toArray(children).filter(isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>);
 const selected=buttons.findIndex(button=>button.props['aria-pressed']===true||button.props['aria-pressed']==='true');
 const active=pending??selected;
 useLayoutEffect(()=>{
  const group=root.current;if(!group)return;
  const update=()=>{
   const button=group.querySelectorAll<HTMLButtonElement>(':scope > button')[active];if(!button)return;
   const box=button.getBoundingClientRect(),parent=group.getBoundingClientRect();
   group.style.setProperty('--segment-x',`${box.left-parent.left-group.clientLeft}px`);
   group.style.setProperty('--segment-y',`${box.top-parent.top-group.clientTop}px`);
   group.style.setProperty('--segment-width',`${box.width}px`);
   group.style.setProperty('--segment-height',`${box.height}px`);
  };
  update();const observer=new ResizeObserver(update);observer.observe(group);
  group.querySelectorAll(':scope > button').forEach(button=>observer.observe(button));
  const frame=requestAnimationFrame(()=>setReady(true));
  return()=>{observer.disconnect();cancelAnimationFrame(frame);};
 },[active,children]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 return <div ref={root} role={navigation?'navigation':'group'} aria-label={label} className={`${className} sliding-segments${equal?' segments-equal':''}${ready?' segments-ready':''}`}>
  <span className="segment-highlight" aria-hidden="true"/>
  {buttons.map((button,index)=>cloneElement(button,{onClick:event=>{
   if(!navigation){button.props.onClick?.(event);return;}
   if(index===selected||pending!==null)return;
   setPending(index);
   const activate=()=>{
    timer.current=null;
    Promise.resolve(button.props.onClick?.(event)).finally(()=>setPending(null));
   };
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)activate();
   else timer.current=setTimeout(activate,220);
  }}))}
 </div>;
}
