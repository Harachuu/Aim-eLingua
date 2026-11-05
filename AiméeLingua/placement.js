/* Staged placement: five independent questions per lesson, 4/5 needed. The first unmastered lesson stops credit in that track. */
function placementBatch(lesson){const pool=QUESTION_BANKS[lesson.id];const contexts=pool.filter(q=>q.objective!=='vocabulary');const others=pool.filter(q=>q.objective==='vocabulary');const selected=shuffled(contexts).slice(0,4);selected.push(...shuffled(others.length?others:pool.filter(q=>!selected.includes(q))).slice(0,5-selected.length));return selected.map(q=>({...q,options:shuffled(q.choices)}))}
function placementStart(){return {track:'vocabulary',lessonIndex:0,questionIndex:0,questions:placementBatch(getTrack('vocabulary')[0]),answers:[],credits:[],details:[],done:false}}
function placementAdvance(p,answer){const q=p.questions[p.questionIndex];p.answers.push({id:q.id,correct:answer===q.answer});p.questionIndex++;if(p.questionIndex<p.questions.length)return p;
 const lesson=getTrack(p.track)[p.lessonIndex];const correct=p.answers.filter(a=>a.correct).length;const mastered=correct>=4;p.details.push({id:lesson.id,correct,total:5,mastered});if(mastered)p.credits.push(lesson.id);
 if(mastered&&p.lessonIndex<getTrack(p.track).length-1){p.lessonIndex++;p.questionIndex=0;p.questions=placementBatch(getTrack(p.track)[p.lessonIndex]);p.answers=[];return p}
 if(p.track==='vocabulary'){p.track='grammar';p.lessonIndex=0;p.questionIndex=0;p.questions=placementBatch(getTrack('grammar')[0]);p.answers=[];return p}
 p.done=true;return p;
}
function finishPlacement(p){creditPlacement(p.credits);placementHistory.attempts.push({date:new Date().toISOString(),credited:[...p.credits],details:[...p.details]});savePlacement();}
