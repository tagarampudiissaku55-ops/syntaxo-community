export const QUIZ_CATEGORIES = [
  'JavaScript',
  'React.js',
  'Python',
  'HTML & CSS',
  'Data Structures & Algorithms',
  'Generative AI',
  'General Technology',
]

export const QUIZ_DIFFICULTIES = ['Easy', 'Medium', 'Hard']

function getBankTranslations(category, index) {
  const banks = {
    'JavaScript': [
      { hi:['block scope वाला variable कौन घोषित करता है?',['var','let','def','dim'],'let block-scoped variable घोषित करता है।'], te:['ఏ keyword block-scoped variableను declare చేస్తుంది?',['var','let','def','dim'],'let block-scoped variableను declare చేస్తుంది.'] },
      { hi:['JavaScript में no value क्या है?',['empty','zero','null','void'],'null JavaScript में एक स्पष्ट no-value value है।'], te:['JavaScriptలో no value ఏది?',['empty','zero','null','void'],'null JavaScriptలో ఒక explicit no-value representation.'] },
      { hi:['कौन सा operator value और type दोनों जांचता है?',['==','===','=','!=='],'=== strict equality operator value और type दोनों तुलना करता है।'], te:['ఏ operator value మరియు type రెండింటిని పరీక్షిస్తుంది?',['==','===','=','!=='],'=== strict equality operator value మరియు type రెండింటిని పోలుస్తుంది.'] },
      { hi:['कौन सा method परिवर्तन करके नया array बनाता है?',['filter','map','find','forEach'],'map बदली हुई values वाला नया array बनाता है।'], te:['ఏ method itemsను transform చేసి కొత్త array సృష్టిస్తుంది?',['filter','map','find','forEach'],'map transform చేసిన valuesతో కొత్త array సృష్టిస్తుంది.'] },
      { hi:['JSON.parse क्या करता है?',['JSON बनाता है','JSON text को JavaScript value में बदलता है','JSON हटाता है','HTML जांचता है'],'JSON.parse valid JSON text को JavaScript value में बदलता है।'], te:['JSON.parse ఏమి చేస్తుంది?',['JSON సృష్టిస్తుంది','JSON textను JavaScript valueగా మారుస్తుంది','JSON తొలగిస్తుంది','HTML పరీక్షిస్తుంది'],'JSON.parse valid JSON textను JavaScript valueగా మారుస్తుంది.'] },
      { hi:['JavaScript में closure क्या है?',['बंद loop','अपने lexical scope तक access वाला function','private class','event listener'],'Closure अपने lexical environment के variables तक access बनाए रखता है।'], te:['JavaScriptలో closure అంటే ఏమిటి?',['closed loop','lexical scopeకు access ఉన్న function','private class','event listener'],'Closure తన lexical environmentలోని variablesను access చేస్తుంది.'] },
      { hi:['वर्तमान call stack के बाद काम कैसे schedule करें?',['setTimeout','queueMicrotask','requestFrame','queueMicrotask और setTimeout दोनों'],'दोनों APIs asynchronous work schedule कर सकते हैं।'], te:['ప్రస్తుత call stack తర్వాత workను ఎలా schedule చేస్తారు?',['setTimeout','queueMicrotask','requestFrame','queueMicrotask మరియు setTimeout రెండూ'],'రెండు APIs asynchronous work schedule చేయగలవు.'] },
      { hi:['कौन सा array method मूल array नहीं बदलता?',['push','splice','sort','slice'],'slice मूल array को बदले बिना नया slice लौटाता है।'], te:['ఏ array method మూల arrayను మార్చదు?',['push','splice','sort','slice'],'slice మూల arrayను మార్చకుండా కొత్త slice ఇస్తుంది.'] },
      { hi:['Promise का उद्देश्य क्या है?',['भविष्यपूर्ण completion का प्रतिनिधित्व','CSS compile करना','DOM nodes संग्रह करना','डेटा encrypt करना'],'Promise asynchronous work के completion या failure को दर्शाता है।'], te:['Promise లక్ష్యం ఏమిటి?',['భవిష్యత్ completionను సూచించడం','CSS compile చేయడం','DOM nodes నిల్వ చేయడం','data encrypt చేయడం'],'Promise asynchronous work completion లేదా failureను సూచిస్తుంది.'] },
      { hi:['लोड हुए document को कौन सा browser object दर्शाता है?',['window','screen','document','location'],'document object HTML document को दर्शाता है।'], te:['లోడ్ అయిన documentను ఏ browser object సూచిస్తుంది?',['window','screen','document','location'],'document object HTML documentను సూచిస్తుంది.'] },
    ],
  }
  const set = banks[category]
  if (!set?.[index]) return undefined
  const entry = set[index]
  return {
    en: undefined,
    hi: { question: entry.hi[0], options: Object.fromEntries(['a','b','c','d'].map((id, i) => [id, entry.hi[1][i]])), explanation: entry.hi[2] },
    te: { question: entry.te[0], options: Object.fromEntries(['a','b','c','d'].map((id, i) => [id, entry.te[1][i]])), explanation: entry.te[2] },
  }
}

const difficultyRotations = {
  Easy: ['Easy', 'Easy', 'Easy', 'Medium', 'Easy', 'Easy', 'Medium', 'Easy', 'Easy', 'Easy'],
  Medium: ['Medium', 'Easy', 'Medium', 'Medium', 'Hard', 'Medium', 'Easy', 'Medium', 'Hard', 'Medium'],
  Hard: ['Hard', 'Hard', 'Medium', 'Hard', 'Hard', 'Medium', 'Hard', 'Hard', 'Medium', 'Hard'],
}

function bank(category, entries) {
  return entries.map((entry, index) => {
    const options = ['a', 'b', 'c', 'd'].map((id, optionIndex) => ({
      id,
      text: entry.options[optionIndex],
    }))
    return {
      id: `${category}-${index + 1}`,
      category,
      difficulty: entry.difficulty,
      question: entry.question,
      options,
      correctAnswerId: entry.correct,
      explanation: entry.explanation,
      translations: getBankTranslations(category, index),
    }
  })
}

export const QUIZ_QUESTIONS = [
  ...bank('JavaScript', [
    { difficulty:'Easy', question:'Which keyword declares a block-scoped variable?', options:['var','let','def','dim'], correct:'b', explanation:'let declares a block-scoped variable.' },
    { difficulty:'Easy', question:'Which value means no value in JavaScript?', options:['empty','zero','null','void'], correct:'c', explanation:'null is one of JavaScript’s explicit no-value representations.' },
    { difficulty:'Easy', question:'Which operator checks value and type?', options:['==','===','= ', '!== '], correct:'b', explanation:'The strict equality operator === compares both value and type.' },
    { difficulty:'Medium', question:'Which method creates a new array by transforming items?', options:['filter','map','find','forEach'], correct:'b', explanation:'map creates a new array containing transformed values.' },
    { difficulty:'Medium', question:'What does JSON.parse do?', options:['Creates JSON','Converts JSON text to a value','Deletes JSON','Validates HTML'], correct:'b', explanation:'JSON.parse converts valid JSON text into a JavaScript value.' },
    { difficulty:'Medium', question:'What is closure in JavaScript?', options:['A closed loop','A function with access to its lexical scope','A private class','An event listener'], correct:'b', explanation:'A closure retains access to variables from its lexical environment.' },
    { difficulty:'Hard', question:'Which API schedules work after the current call stack?', options:['setTimeout','queueMicrotask','requestFrame','both queueMicrotask and setTimeout'], correct:'d', explanation:'Both APIs can schedule asynchronous work, with different timing and ordering.' },
    { difficulty:'Hard', question:'Which method does not mutate the original array?', options:['push','splice','sort','slice'], correct:'d', explanation:'slice returns a shallow copy slice without mutating the source array.' },
    { difficulty:'Hard', question:'What is the purpose of a Promise?', options:['Represent future completion','Compile CSS','Store DOM nodes','Encrypt data'], correct:'a', explanation:'A Promise represents the eventual completion or failure of asynchronous work.' },
    { difficulty:'Medium', question:'Which browser object represents the document?', options:['window','screen','document','location'], correct:'c', explanation:'The document object represents the loaded HTML document.' },
  ]),
  ...bank('React.js', [
    { difficulty:'Easy', question:'Which language is primarily used with React?', options:['Java','Python','JavaScript','Ruby'], correct:'c', explanation:'React applications are primarily built with JavaScript or JSX.' },
    { difficulty:'Easy', question:'What hook manages local component state?', options:['useEffect','useMemo','useState','useRef'], correct:'c', explanation:'useState adds state to function components.' },
    { difficulty:'Easy', question:'What does JSX compile into?', options:['HTML files','React elements','CSS rules','SQL'], correct:'b', explanation:'JSX syntax compiles into React element creation calls.' },
    { difficulty:'Medium', question:'Which hook runs side effects after rendering?', options:['useState','useEffect','useId','useReducer'], correct:'b', explanation:'useEffect synchronizes component effects with external systems.' },
    { difficulty:'Medium', question:'Which prop gives each list item a stable identity?', options:['id','key','name','index'], correct:'b', explanation:'key helps React identify list items across renders.' },
    { difficulty:'Medium', question:'What does lifting state up mean?', options:['Moving state to a common parent','Deleting state','Using an external API','Raising component height'], correct:'a', explanation:'Shared state is placed in a common ancestor component.' },
    { difficulty:'Hard', question:'Which hook can prevent an expensive recalculation?', options:['useMemo','useState','useEffect','useContext'], correct:'a', explanation:'useMemo caches a calculated value until dependencies change.' },
    { difficulty:'Hard', question:'What is reconciliation in React?', options:['State reset','Diffing rendered trees','CSS matching','Event bubbling'], correct:'b', explanation:'Reconciliation compares tree representations to calculate DOM updates.' },
    { difficulty:'Hard', question:'What is the purpose of React.memo?', options:['Style components','Memoize components','Manage routing','Create refs'], correct:'b', explanation:'React.memo can skip re-rendering a component with unchanged props.' },
    { difficulty:'Medium', question:'How should derived values be handled?', options:['Store all copies','Compute during render','Use only props','Disable updates'], correct:'b', explanation:'Values derived from props or state can usually be computed during render.' },
  ]),
  ...bank('Python', [
    { difficulty:'Easy', question:'Which type stores ordered, mutable values?', options:['tuple','set','list','string'], correct:'c', explanation:'A list is an ordered and mutable Python sequence.' },
    { difficulty:'Easy', question:'Which symbol starts a Python comment?', options:['//','#','<!--','%'], correct:'b', explanation:'Python comments begin with #.' },
    { difficulty:'Easy', question:'Which function displays output?', options:['write','print','echo','log'], correct:'b', explanation:'print writes text to standard output.' },
    { difficulty:'Medium', question:'What does len("AI") return?', options:['1','2','3','0'], correct:'b', explanation:'len returns the number of characters, and AI has two.' },
    { difficulty:'Medium', question:'Which structure uses key-value pairs?', options:['list','tuple','dictionary','set'], correct:'c', explanation:'A dictionary stores values associated with unique keys.' },
    { difficulty:'Medium', question:'Which keyword handles exceptions?', options:['catch','except','error','resolve'], correct:'b', explanation:'The except clause handles exceptions raised in a try block.' },
    { difficulty:'Hard', question:'What does @staticmethod indicate?', options:['A static variable','A function not dependent on instance state','A loop','A private class'], correct:'b', explanation:'A static method belongs to the class namespace and needs no instance.' },
    { difficulty:'Hard', question:'What is a Python generator?', options:['A list sorter','An iterator using yield','A compiler','A class decorator'], correct:'b', explanation:'Generators lazily produce values with yield.' },
    { difficulty:'Hard', question:'Which protocol supports Python context managers?', options:['__enter__ and __exit__','__start__ and __stop__','with and as','open and close'], correct:'a', explanation:'The __enter__ and __exit__ methods implement context-manager behavior.' },
    { difficulty:'Medium', question:'Which module commonly handles regular expressions?', options:['regex','regexp','re','search'], correct:'c', explanation:'Python’s re module provides regular expression operations.' },
  ]),
  ...bank('HTML & CSS', [
    { difficulty:'Easy', question:'Which HTML element represents main navigation?', options:['<nav>','<aside>','<menuitem>','<section>'], correct:'a', explanation:'The nav element identifies navigation links.' },
    { difficulty:'Easy', question:'Which CSS property changes text color?', options:['font-style','color','text-align','background'], correct:'b', explanation:'The color property sets foreground text color.' },
    { difficulty:'Easy', question:'Which HTML attribute provides alternative text for images?', options:['title','alt','label','src'], correct:'b', explanation:'The alt attribute describes image content for assistive technology.' },
    { difficulty:'Medium', question:'Which layout mode arranges items in one dimension?', options:['Grid','Flexbox','Float','Table'], correct:'b', explanation:'Flexbox is designed for one-dimensional rows or columns.' },
    { difficulty:'Medium', question:'Which selector targets a unique element id?', options:['.card','#card','card','[card]'], correct:'b', explanation:'A hash prefix selects an element by id.' },
    { difficulty:'Medium', question:'Which CSS unit is relative to root font size?', options:['px','em','rem','vh'], correct:'c', explanation:'rem is relative to the root element’s font size.' },
    { difficulty:'Hard', question:'Which value hides an element while preserving layout?', options:['display:none','visibility:hidden','opacity:0','overflow:hidden'], correct:'b', explanation:'visibility:hidden hides an element but retains its layout space.' },
    { difficulty:'Hard', question:'What does position:sticky combine conceptually?', options:['Fixed and static','Relative and fixed','Absolute and grid','None'], correct:'b', explanation:'Sticky positioning acts relative until crossing a scroll threshold.' },
    { difficulty:'Hard', question:'Which feature creates a stacking context?', options:['position:relative','transform','z-index','All can contribute'], correct:'d', explanation:'Several properties, including transforms and z-index contexts, affect stacking.' },
    { difficulty:'Medium', question:'Which HTML element is self-contained content?', options:['<article>','<span>','<b>','<i>'], correct:'a', explanation:'article represents a complete, independently distributable item.' },
  ]),
  ...bank('Data Structures & Algorithms', [
    { difficulty:'Easy', question:'Which structure follows FIFO order?', options:['Stack','Queue','Heap','Graph'], correct:'b', explanation:'A queue removes items in first-in, first-out order.' },
    { difficulty:'Easy', question:'Which structure follows LIFO order?', options:['Queue','Stack','Array','List'], correct:'b', explanation:'A stack removes the most recently added item first.' },
    { difficulty:'Easy', question:'What is a graph made of?', options:['Nodes and edges','Rows and columns','Keys and values','Stacks only'], correct:'a', explanation:'Graphs contain vertices (nodes) connected by edges.' },
    { difficulty:'Medium', question:'What is the average lookup complexity of a hash table?', options:['O(1)','O(log n)','O(n)','O(n²)'], correct:'a', explanation:'Average-case hash table lookup is constant time.' },
    { difficulty:'Medium', question:'Binary search requires what property?', options:['Sorted input','Negative values','A queue','Even size'], correct:'a', explanation:'Binary search needs a sorted collection.' },
    { difficulty:'Medium', question:'Which traversal visits root before subtrees?', options:['Inorder','Postorder','Preorder','Level-only'], correct:'c', explanation:'Preorder traversal visits the root before descendants.' },
    { difficulty:'Hard', question:'What is the worst-case complexity of quicksort?', options:['O(n)','O(n log n)','O(n²)','O(log n)'], correct:'c', explanation:'Quicksort degrades to quadratic time with poor pivots.' },
    { difficulty:'Hard', question:'Which algorithm finds shortest paths with nonnegative weights?', options:['DFS','Dijkstra','Binary search','KMP'], correct:'b', explanation:'Dijkstra’s algorithm finds shortest paths in weighted graphs with nonnegative edges.' },
    { difficulty:'Hard', question:'What data structure enables priority queue operations?', options:['Heap','Linked list','Hash set','Trie'], correct:'a', explanation:'A heap efficiently supports priority-based minimum or maximum retrieval.' },
    { difficulty:'Medium', question:'Which complexity grows linearly with input size?', options:['O(1)','O(n)','O(n log n)','O(n²)'], correct:'b', explanation:'Linear time scales directly with the number of input items.' },
  ]),
  ...bank('Generative AI', [
    { difficulty:'Easy', question:'What does an LLM generate?', options:['Text patterns','Hardware','Database indexes','Network cables'], correct:'a', explanation:'A large language model predicts and generates language patterns.' },
    { difficulty:'Easy', question:'What is prompt engineering?', options:['Building prompts','Training GPUs','Writing CSS','Database tuning'], correct:'a', explanation:'Prompt engineering designs inputs to guide model behavior.' },
    { difficulty:'Easy', question:'What is grounding in AI systems?', options:['Connecting model output to trusted sources','Stopping electricity','Fine-tuning weights','Prompt caching'], correct:'a', explanation:'Grounding connects generated answers to verifiable context or sources.' },
    { difficulty:'Medium', question:'What does RAG stand for?', options:['Rapid Answer Generation','Retrieval-Augmented Generation','Random AI Grid','Response Accuracy Graph'], correct:'b', explanation:'RAG retrieves relevant context before generating a response.' },
    { difficulty:'Medium', question:'What does an embedding represent?', options:['Vector meaning','A CSS layer','Compiled code','Server logs'], correct:'a', explanation:'Embeddings map content into numerical vectors that capture semantic relationships.' },
    { difficulty:'Medium', question:'What is hallucination?', options:['Random model output','Plausible but incorrect output','GPU overheating','Prompt compression'], correct:'b', explanation:'Hallucination occurs when a model produces confident but unsupported content.' },
    { difficulty:'Hard', question:'Which technique adapts a model on specific examples?', options:['Fine-tuning','DNS','Hashing','Refactoring'], correct:'a', explanation:'Fine-tuning updates model parameters using domain-specific examples.' },
    { difficulty:'Hard', question:'What does temperature control in sampling?', options:['Randomness','Memory size','Network speed','Token length'], correct:'a', explanation:'Higher temperature generally increases variation in generated output.' },
    { difficulty:'Hard', question:'What is an AI agent?', options:['A model that acts through tools toward goals','A GPU process','A vector database','An image format'], correct:'a', explanation:'An agent combines model reasoning with tools and actions to pursue goals.' },
    { difficulty:'Medium', question:'Why evaluate AI outputs?', options:['To verify usefulness and reliability','To increase resolution','To compile code','To reduce CSS'], correct:'a', explanation:'Evaluation helps measure quality, safety, accuracy, and task effectiveness.' },
  ]),
  ...bank('General Technology', [
    { difficulty:'Easy', question:'What does CPU stand for?', options:['Central Processing Unit','Computer Power Utility','Core Program User','Control Port Unit'], correct:'a', explanation:'CPU means Central Processing Unit.' },
    { difficulty:'Easy', question:'What does HTTP enable?', options:['Web communication','Graphic editing','Local storage','Image rendering'], correct:'a', explanation:'HTTP is the protocol used for transmitting web resources.' },
    { difficulty:'Easy', question:'What does Git track?', options:['File changes','CPU temperature','Network speed','Screen pixels'], correct:'a', explanation:'Git records and manages changes in source files over time.' },
    { difficulty:'Medium', question:'What is DNS responsible for?', options:['Domain-to-IP resolution','Database backups','CSS rendering','Code compilation'], correct:'a', explanation:'DNS translates domain names into network addresses.' },
    { difficulty:'Medium', question:'What does an API allow systems to do?', options:['Communicate','Replace hardware','Draw pixels','Compile assembly'], correct:'a', explanation:'An API defines an interface through which systems communicate.' },
    { difficulty:'Medium', question:'Which protocol encrypts web traffic?', options:['HTTP','TLS','FTP','SMTP'], correct:'b', explanation:'TLS encrypts data transmitted over HTTPS connections.' },
    { difficulty:'Hard', question:'What does a reverse proxy primarily do?', options:['Serve as a gateway to backends','Compile JavaScript','Create database schemas','Render fonts'], correct:'a', explanation:'A reverse proxy receives requests and routes them to backend services.' },
    { difficulty:'Hard', question:'What is database indexing intended to improve?', options:['Query lookup speed','File compression','Network encryption','UI animation'], correct:'a', explanation:'Indexes reduce the work needed to find and retrieve data.' },
    { difficulty:'Hard', question:'What does CI/CD automate?', options:['Build, test, and deployment','Only database design','Only UI styling','Hardware recycling'], correct:'a', explanation:'CI/CD pipelines automate integration, verification, and delivery workflows.' },
    { difficulty:'Medium', question:'What is a webhook?', options:['An HTTP callback','A CSS selector','A database table','A memory unit'], correct:'a', explanation:'A webhook sends event notifications through HTTP callbacks.' },
  ]),
]

export function getQuestionPool(category, difficulty) {
  if (category === 'Random Quiz') {
    const pool = [...QUIZ_QUESTIONS]
    return pool
  }
  const exact = QUIZ_QUESTIONS.filter((question) => question.category === category && question.difficulty === difficulty)
  if (exact.length >= 10) return exact
  const categoryPool = QUIZ_QUESTIONS.filter((question) => question.category === category)
  if (difficulty === 'Easy') return categoryPool
  if (difficulty === 'Medium') return [...exact, ...categoryPool].filter((item, index, array) => array.findIndex((entry) => entry.id === item.id) === index)
  return categoryPool
}

export function getDailyCategory() {
  const day = Math.floor(Date.now() / 86400000)
  return QUIZ_CATEGORIES[day % QUIZ_CATEGORIES.length]
}
