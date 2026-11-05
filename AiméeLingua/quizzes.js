/* Every lesson has >=20 distinct source questions: direct recognition plus contextual application. */
const xss=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffled=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
const chooseDistractors=(answer,pool,amount=3)=>shuffled([...new Set(pool.filter(x=>x!==answer))]).slice(0,amount);
const mk=(id,prompt,answer,choices,explanation,type='choice',objective='recognition')=>({id,prompt,answer,choices:[...new Set([answer,...choices])],explanation,type,objective});
const GRAMMAR_EXTRA={
 g1:[
 ['Choose the correct French expression for “a door.”','une porte',['la porte','un porte','le porte'],'Porte is feminine. Use une for “a”; la would mean “the”.'],
 ['Choose the correct French expression for “the door.”','la porte',['une porte','un porte','le porte'],'Porte is feminine. La means “the” and une means “a”.'],
 ['Choose the correct French expression for “an apple.”','une pomme',['la pomme','un pomme','le pomme'],'Pomme is feminine. Une means “an”; la means “the”.'],
 ['Choose the correct French expression for “the apple.”','la pomme',['une pomme','un pomme','le pomme'],'La pomme means “the apple”; une pomme means “an apple”.'],
 ['Choose the correct French expression for “a pen.”','un stylo',['une stylo','le stylo','la stylo'],'Stylo is masculine. Un means “a”; le means “the”.'],
 ['Choose the correct French expression for “the pen.”','le stylo',['un stylo','une stylo','la stylo'],'Le stylo means “the pen”; un stylo means “a pen”.'],
 ['Choose the correct French expression for “a house.”','une maison',['la maison','un maison','le maison'],'Maison is feminine. Use une for “a”.'],
 ['Choose the correct French expression for “the house.”','la maison',['une maison','le maison','un maison'],'La means “the” with a feminine singular noun.'],
 ['Choose the correct French expression for “a book.”','un livre',['le livre','une livre','la livre'],'Livre is masculine. Un means “a”; le means “the”.'],
 ['Choose the correct French expression for “the book.”','le livre',['un livre','une livre','la livre'],'Le means “the” with a masculine singular noun.'],
 ['Choose the correct French expression for “the books.”','les livres',['le livres','la livres','un livres'],'Les is the definite article for plural nouns.'],
 ['Choose the correct French expression for “the school.”','l’école',['la école','le école','les école'],'Before école, the singular definite article is written l’ because the noun begins with a vowel.']
 ],
 g2:[
 ['Choose the form of être with je.','suis',['es','est','sommes'],'Je suis means I am.'],['Choose the form of être with tu.','es',['suis','est','êtes'],'Tu es means you are, informally.'],['Choose the form of être with il.','est',['sont','suis','es'],'Il est means he is.'],['Choose the form of être with nous.','sommes',['sont','suis','êtes'],'Nous sommes means we are.'],['Choose the form of être with vous.','êtes',['sommes','es','est'],'Vous êtes means you are.'],['Choose the form of être with elles.','sont',['sommes','êtes','est'],'Elles sont means they are.'],['Select the informal singular “you.”','tu',['vous','nous','ils'],'Tu is informal singular.'],['Select the formal or plural “you.”','vous',['tu','je','elle'],'Vous is formal singular or plural.'],['Complete “Je ___ étudiant.”','suis',['est','es','sont'],'Je takes suis.'],['Complete “Nous ___ ici.”','sommes',['sont','êtes','est'],'Nous takes sommes.'],['Complete “Elle ___ française.”','est',['es','suis','sommes'],'Elle takes est.'],['Complete “Ils ___ ici.”','sont',['est','sommes','suis'],'Ils takes sont.']
 ],
 g3:[
 ['Complete “J’___ vingt ans.”','ai',['a','as','avons'],'J’ai means I have; French uses avoir for age.'],['Complete “Tu ___ dix ans.”','as',['ai','a','avez'],'Tu takes as.'],['Complete “Elle ___ quinze ans.”','a',['as','ai','ont'],'Elle takes a.'],['Complete “Nous ___ deux livres.”','avons',['avez','ont','a'],'Nous takes avons.'],['Complete “Vous ___ un livre.”','avez',['avons','as','ont'],'Vous takes avez.'],['Complete “Ils ___ un café.”','ont',['avons','avez','a'],'Ils takes ont.'],['Choose “I am twenty years old.”','J’ai vingt ans.',['Je suis vingt ans.','J’est vingt ans.','Tu as vingt ans.'],'Use avoir, not être, for age.'],['Choose “She is fifteen years old.”','Elle a quinze ans.',['Elle est quinze ans.','Elle as quinze ans.','Elle ai quinze ans.'],'Elle a is the correct form of avoir.'],['What verb is used to express age in French?','avoir',['être','parler','aller'],'Age is expressed with avoir.'],['Which contraction means “I have”?','j’ai',['je ai','j’as','je a'],'Je becomes j’ before a vowel.'],['Complete “Il ___ dix ans.”','a',['as','ai','ont'],'Il takes a.'],['Complete “Elles ___ deux livres.”','ont',['avons','avez','a'],'Elles takes ont.']
 ],
 g4:[
 ['Select the correct basic word order.','Je parle français.',['Parle je français.','Français je parle.','Je français parle.'],'French commonly uses subject–verb–complement.'],['Choose the negative of “Je parle français.”','Je ne parle pas français.',['Je pas parle français.','Je ne pas parle français.','Ne je parle français.'],'Place ne before the verb and pas after it.'],['Choose the negative of “Il est étudiant.”','Il n’est pas étudiant.',['Il ne est pas étudiant.','Il est ne pas étudiant.','Il pas est étudiant.'],'Ne contracts to n’ before est.'],['Which word follows the verb in basic ne…pas negation?','pas',['ne','je','il'],'Pas goes after the conjugated verb.'],['Which word usually comes before the verb in basic negation?','ne',['pas','tu','nous'],'Ne goes before the conjugated verb.'],['Which phrase shows “I am not”?','je ne suis pas',['je suis ne pas','je pas suis','je suis pas ne'],'Ne…pas surrounds suis.'],['Complete “Nous ___ sommes pas.”','ne',['pas','n’','non'],'Use ne before sommes because it starts with a consonant.'],['Complete “Il ___ est pas étudiant.”','n’',['ne','pas','tu'],'Use n’ immediately before est.'],['Choose the correct sentence.','Tu parles français.',['Tu français parles.','Parles tu français.','Français tu parles.'],'The basic order is subject followed by verb.'],['Choose the correct negative sentence.','Il ne parle pas.',['Il parle ne pas.','Il pas parle ne.','Ne il parle pas.'],'Ne goes before parle and pas after it.'],['Choose the correct negative sentence.','Nous ne sommes pas ici.',['Nous pas sommes ici.','Nous sommes ne pas ici.','Nous n’ sommes pas ici.'],'Nous ne sommes pas has correct negative word order.'],['Choose the correct expression for “He is not.”','Il n’est pas.',['Il ne est pas.','Il est ne pas.','Il pas est.'],'Ne becomes n’ before est.']
 ]
};
const CONTEXTS={
 v1:[['You greet a shop assistant during the day.','Bonjour'],['You thank someone for helping you.','Merci'],['You say goodbye when leaving.','Au revoir'],['A friend says “Merci.” What could you reply?','De rien'],['You wish someone a good day.','Bonne journée'],['You greet a close friend informally.','Salut'],['You want to say “please” politely.','S’il vous plaît'],['You will see someone again soon.','À bientôt']],
 v2:[['You tell someone your name.','Je m’appelle'],['You ask a friend their name.','Comment tu t’appelles ?'],['You meet someone and say “Nice to meet you” as a female speaker.','Enchantée'],['You ask someone “And you?” informally.','Et toi ?'],['You tell someone where you live.','J’habite à'],['You say “I come from…”','Je viens de'],['You refer to a woman as “she is.”','Elle est'],['You refer to a man as “he is.”','Il est']],
 v3:[['You want to say the number 2.','deux'],['You want to say the number 5.','cinq'],['You want to say the number 8.','huit'],['You want to say the number 11.','onze'],['You want to say the number 13.','treize'],['You want to say the number 17.','dix-sept'],['You want to say the number 19.','dix-neuf'],['You want to say the number 20.','vingt']],
 v4:[['Which word means today?','aujourd’hui'],['Which word means tomorrow?','demain'],['Choose the French word for Monday.','lundi'],['Choose the French word for Friday.','vendredi'],['Choose the French word for Sunday.','dimanche'],['Choose the French word for January.','janvier'],['Choose the French word for August.','août'],['Choose the French word for December.','décembre']],
 v5:[['Choose the French word for the color 🔴.','rouge'],['Choose the French word for the color 🔵.','bleu'],['Choose the French word for the color 🟢.','vert'],['Choose the French word for the color 🟡.','jaune'],['Choose the French word for the color ⚫.','noir'],['Choose the French word for the color ⚪.','blanc'],['Choose the French word for the color 🩷.','rose'],['Choose the French word for the color 🟠.','orange']],
 v6:[['You are talking about your sister.','la sœur'],['You are talking about your brother.','le frère'],['You want to say “my” before a feminine noun.','ma'],['You want to say “my” before a masculine noun.','mon'],['You refer to your mother.','la mère'],['You refer to your father.','le père'],['You refer to your grandmother.','la grand-mère'],['You refer to your whole family.','la famille']],
 v7:[['You politely order something.','je voudrais'],['You ask for the bill.','l’addition'],['You order water.','l’eau'],['You order coffee.','le café'],['You order tea.','le thé'],['You ask for bread.','le pain'],['You order soup.','la soupe'],['You want an apple.','la pomme']],
 v8:[['You need something to write with ink.','le stylo'],['You need something to read.','le livre'],['You refer to a seat.','la chaise'],['You refer to the object you open to enter a room.','la porte'],['You look outside through this.','la fenêtre'],['You carry belongings in this.','le sac'],['You make a phone call using this.','le téléphone'],['You turn on this for light.','la lampe']],
 v9:[['You need to catch a train.','la gare'],['You want to borrow a book.','la bibliothèque'],['You need medicine.','la pharmacie'],['You want to watch a film.','le cinéma'],['Someone says to turn left.','à gauche'],['Someone says to turn right.','à droite'],['Someone says to keep going straight.','tout droit'],['You want to buy bread.','la boulangerie']],
 v10:[['You say “I eat.”','je mange'],['You say “I drink.”','je bois'],['You say “I study.”','j’étudie'],['You say “I read.”','je lis'],['You say “in the morning.”','le matin'],['You say “in the evening.”','le soir'],['You say “at noon.”','à midi'],['You say “I sleep.”','je dors']],
 v11:[['You ask “How much does it cost?”','combien ça coûte ?'],['You say “I’ll take it.”','je prends'],['You want to pay using a card.','la carte'],['You want to pay in cash.','en espèces'],['You say “inexpensive.”','bon marché'],['You ask about a size.','la taille'],['You want to buy something.','acheter'],['You refer to the price.','le prix']],
 v12:[['You ask “How are you?”','comment ça va ?'],['You respond “I’m doing well.”','ça va bien'],['You politely ask “And you?”','et vous ?'],['You say “I don’t understand.”','je ne comprends pas'],['You ask someone formally to repeat.','pouvez-vous répéter ?'],['You say “No problem.”','pas de problème'],['You say “Of course.”','bien sûr'],['You are looking for a place or item.','je cherche']]
};
/* Tests the grammar rather than allowing elimination by unrelated vocabulary. */
function grammarDistractors(l,answer){
 if(l.id==='g1'){
  const match=answer.match(/^(?:(un|une|le|la|les)\s+|((?:l’|l')))(.+)$/iu);
  if(match){
   const article=match[1]||match[2],noun=match[3];
   let alternatives;
   if(article==='les')alternatives=['le '+noun,'la '+noun,'un '+noun];
   else if(article==='l’'||article==="l'")alternatives=['le '+noun,'la '+noun,'une '+noun];
   else alternatives=['un '+noun,'une '+noun,'le '+noun,'la '+noun].filter(v=>v!==answer);
   return alternatives.slice(0,3);
  }
 }
 if(l.id==='g2'){
  const parts=answer.split(' ');
  if(parts.length===2 && ['suis','es','est','sommes','êtes','sont'].includes(parts[1]))
   return shuffled(['suis','es','est','sommes','êtes','sont'].filter(v=>v!==parts[1])).slice(0,3).map(v=>parts[0]+' '+v);
  if(parts.length===1)return shuffled(['je','tu','il','elle','nous','vous','ils','elles'].filter(v=>v!==answer)).slice(0,3);
 }
 if(l.id==='g3'){
  const m=answer.match(/^(j’|tu |il |elle |nous |vous |ils |elles )(ai|as|a|avons|avez|ont)(.*)$/iu);
  if(m)return shuffled(['ai','as','a','avons','avez','ont'].filter(v=>v!==m[2])).slice(0,3).map(v=>m[1]+v+m[3]);
 }
 return null;
}
function bankFor(l){const pool=l.words.map(w=>w.fr);let qs=[];
 l.words.forEach((w,i)=>qs.push(mk(l.id+'-w'+i,'Choose the French expression for “'+w.en+'”.',w.fr,grammarDistractors(l,w.fr)||chooseDistractors(w.fr,pool),`“${w.fr}” means “${w.en}”.`,'choice',l.track==='grammar'?'grammar':'vocabulary')));
 if(l.track==='vocabulary'){
  (CONTEXTS[l.id]||[]).forEach(([p,a],i)=>qs.push(mk(l.id+'-c'+i,p,a,chooseDistractors(a,pool),`In this context, “${a}” is appropriate.`, 'choice','context')));
 }else{
  (GRAMMAR_EXTRA[l.id]||[]).forEach(([p,a,others,e],i)=>qs.push(mk(l.id+'-g'+i,p,a,others,e,'choice','grammar')));
 }
 return qs;
}
const QUESTION_BANKS=Object.fromEntries(LESSONS.map(l=>[l.id,bankFor(l)]));
function makeQuiz(id){const all=QUESTION_BANKS[id];if(!all||all.length<10)throw Error('Missing question bank '+id);const context=all.filter(q=>q.objective!=='vocabulary');const core=all.filter(q=>q.objective==='vocabulary');let selected=shuffled(context).slice(0,Math.min(6,context.length));selected.push(...shuffled(core).slice(0,10-selected.length));if(selected.length<10)selected.push(...shuffled(all.filter(q=>!selected.includes(q))).slice(0,10-selected.length));selected=shuffled(selected);return selected.map(q=>({...q,options:shuffled(q.choices)}))}
UESTION_BANKS=Object.fromEntries(LESSONS.map(l=>[l.id,bankFor(l)]));
function makeQuiz(id){const all=QUESTION_BANKS[id];if(!all||all.length<10)throw Error('Missing question bank '+id);const context=all.filter(q=>q.objective!=='vocabulary');const core=all.filter(q=>q.objective==='vocabulary');let selected=shuffled(context).slice(0,Math.min(6,context.length));selected.push(...shuffled(core).slice(0,10-selected.length));if(selected.length<10)selected.push(...shuffled(all.filter(q=>!selected.includes(q))).slice(0,10-selected.length));selected=shuffled(selected);return selected.map(q=>({...q,options:shuffled(q.choices)}))}
