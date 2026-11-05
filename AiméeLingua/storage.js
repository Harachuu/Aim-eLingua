const STORAGE={progress:'aimeelingua_progress_v1',settings:'aimeelingua_settings_v1',placement:'aimeelingua_placement_v1'};
function readStore(key,fallback){try{const value=JSON.parse(localStorage.getItem(key));return value&&typeof value==='object'?value:fallback}catch{return fallback}}
const INITIAL_PROGRESS=()=>({lessons:{},lastLesson:null,onboarded:false});
let progress=readStore(STORAGE.progress,INITIAL_PROGRESS());
let settings=readStore(STORAGE.settings,{theme:'cafe',accent:'#a63b62',background:'#fbf7f1'});
let placementHistory=readStore(STORAGE.placement,{attempts:[]});
function saveProgress(){try{localStorage.setItem(STORAGE.progress,JSON.stringify(progress))}catch(e){console.warn('Progress could not be saved',e)}}
function saveSettings(){try{localStorage.setItem(STORAGE.settings,JSON.stringify(settings))}catch(e){console.warn('Settings could not be saved',e)}}
function savePlacement(){try{localStorage.setItem(STORAGE.placement,JSON.stringify(placementHistory))}catch(e){console.warn('Placement could not be saved',e)}}
function recordFor(id){return progress.lessons[id]||{completed:false,method:null,best:null,last:null,attempts:0}}
function isComplete(id){return !!recordFor(id).completed}
function isUnlocked(id){const lesson=getLesson(id);if(!lesson)return false;if(lesson.number===1)return true;return isComplete((lesson.track==='grammar'?'g':'v')+(lesson.number-1))}
function lessonStats(track){const lessons=track?getTrack(track):LESSONS;const done=lessons.filter(l=>isComplete(l.id)).length;return {done,total:lessons.length,percent:Math.round(100*done/lessons.length)}}
function recordQuiz(id,score){const r={...recordFor(id)};r.attempts++;r.last=score;r.best=Math.max(r.best??0,score);if(score>=70){r.completed=true;if(!r.method)r.method='test'}progress.lessons[id]=r;saveProgress()}
function creditPlacement(ids){for(const id of ids){const r={...recordFor(id)};if(!r.completed){r.completed=true;r.method='placement'}progress.lessons[id]=r}saveProgress()}
function nextLesson(track){return getTrack(track).find(l=>isUnlocked(l.id)&&!isComplete(l.id))||null}
function applyTheme(){document.documentElement.dataset.theme=settings.theme;if(settings.theme==='custom'){document.documentElement.style.setProperty('--accent',settings.accent);document.documentElement.style.setProperty('--bg',settings.background);document.documentElement.style.setProperty('--accent2','#f3e1e9')}else{['--accent','--bg','--accent2'].forEach(v=>document.documentElement.style.removeProperty(v))}}
applyTheme();
