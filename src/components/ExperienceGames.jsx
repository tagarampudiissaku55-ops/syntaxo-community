import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Brain,
  Check,
  ChevronLeft,
  CircleHelp,
  Code2,
  Gamepad2,
  RotateCcw,
  Trophy,
  Zap,
} from 'lucide-react'

const GAME_OPTIONS = [
  { id: 'quiz', title: 'Tech Quiz', description: 'Five quick questions. Beat the clock and test your dev knowledge.', icon: CircleHelp },
  { id: 'memory', title: 'Memory Match', description: 'Pair six familiar technologies using as few moves as you can.', icon: Brain },
  { id: 'code', title: 'Code Sprint', description: 'Type a short snippet accurately and see your speed stats.', icon: Code2 },
]
const ACHIEVEMENT_LABELS = {
  firstGame: 'First Launch',
  quizAce: 'Quiz Ace',
  memoryMaster: 'Memory Master',
  codeSprinter: 'Code Sprinter',
}

const QUESTIONS = [
  { question: 'Which language runs natively in web browsers?', options: ['JavaScript', 'Python', 'Rust', 'Go'], answer: 'JavaScript' },
  { question: 'What does CSS primarily describe?', options: ['Page presentation', 'Database schemas', 'Network routing', 'Version history'], answer: 'Page presentation' },
  { question: 'Which Git command creates a new local repository?', options: ['git init', 'git push', 'git merge', 'git fetch'], answer: 'git init' },
  { question: 'What does API stand for?', options: ['Application Programming Interface', 'Automated Program Instance', 'Applied Protocol Integration', 'Application Process Index'], answer: 'Application Programming Interface' },
  { question: 'Which data format is commonly used for web APIs?', options: ['JSON', 'MP3', 'PSD', 'WAV'], answer: 'JSON' },
  { question: 'What is the main purpose of React?', options: ['Build user interfaces', 'Manage operating systems', 'Query relational databases', 'Compile machine code'], answer: 'Build user interfaces' },
  { question: 'Which symbol starts a single-line comment in JavaScript?', options: ['//', '<!--', '#', '**'], answer: '//' },
  { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Transfer Machine Link', 'Hyperlink Text Management Logic', 'Home Tool Markup Language'], answer: 'HyperText Markup Language' },
  { question: 'Which structure follows last-in, first-out order?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 'Stack' },
  { question: 'What does the Python expression len([4, 8, 12]) return?', options: ['3', '24', '12', '4'], answer: '3' },
]

const TECHNOLOGIES = [
  { name: 'HTML', symbol: '5' },
  { name: 'CSS', symbol: '✳' },
  { name: 'JavaScript', symbol: 'JS' },
  { name: 'Python', symbol: 'Py' },
  { name: 'React', symbol: '⚛' },
  { name: 'AI', symbol: 'AI' },
]

const CODE_SNIPPETS = [
  'const total = 2 + 3;\nconsole.log(total);',
  'function greet(name) {\n  return `Hi, ${name}!`;\n}',
  'const skills = ["HTML", "CSS", "JS"];\nskills.forEach((skill) => console.log(skill));',
  'def welcome(name):\n    return f"Hello, {name}!"',
]

function shuffle(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]]
  }
  return shuffled
}

function ProgressSummary({ progress, onReset }) {
  const level = Math.floor(progress.xp / 100) + 1
  const currentLevelXp = progress.xp % 100
  return (
    <div className="sx-progress-summary">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">Developer level</p>
          <p className="mt-1 text-lg font-medium text-white">Level {level} <span className="text-sm font-normal text-zinc-500">· {progress.xp} XP</span></p>
        </div>
        <span className="sx-level-mark"><Trophy size={17} aria-hidden="true" /></span>
      </div>
      <div className="sx-xp-track" role="progressbar" aria-label="XP progress to next level" aria-valuenow={currentLevelXp} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${currentLevelXp}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{currentLevelXp}/100 XP to next level</span>
        <span>{progress.gamesPlayed} games played</span>
      </div>
      {progress.achievements.length > 0 && (
        <div className="sx-achievement-list" aria-label="Earned achievements">
          {progress.achievements.map((achievement) => (
            <span key={achievement} className="sx-achievement-badge">{ACHIEVEMENT_LABELS[achievement] || achievement}</span>
          ))}
        </div>
      )}
      <button type="button" className="sx-reset-progress" onClick={onReset}>
        <RotateCcw size={12} aria-hidden="true" /> Reset progress
      </button>
    </div>
  )
}

function GameResult({ title, score, summary, onReplay, onBack }) {
  return (
    <div className="sx-game-result" role="status">
      <span className="sx-result-icon"><Trophy size={22} aria-hidden="true" /></span>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-violet-300">{title} complete</p>
      <p className="mt-2 text-3xl font-medium text-white">{score}<span className="text-base text-zinc-500">/100</span></p>
      <p className="mt-2 text-sm text-zinc-400">{summary}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button type="button" className="sx-primary-button" onClick={onReplay}><RotateCcw size={14} aria-hidden="true" /> Play again</button>
        <button type="button" className="sx-secondary-button" onClick={onBack}><ChevronLeft size={14} aria-hidden="true" /> All games</button>
      </div>
    </div>
  )
}

function TechQuiz({ onComplete, onSound, onReplay, onBack }) {
  const questions = useMemo(() => shuffle(QUESTIONS).slice(0, 5), [])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(45)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const transitionRef = useRef(null)
  const reportedRef = useRef(false)

  useEffect(() => {
    if (finished || secondsLeft <= 0) return undefined
    const timeout = window.setTimeout(() => setSecondsLeft((current) => current - 1), 1000)
    return () => window.clearTimeout(timeout)
  }, [finished, secondsLeft])

  useEffect(() => {
    if (secondsLeft === 0) setFinished(true)
  }, [secondsLeft])

  useEffect(() => () => window.clearTimeout(transitionRef.current), [])

  useEffect(() => {
    if (!finished || reportedRef.current) return
    reportedRef.current = true
    const score = Math.round((correct / questions.length) * 100)
    onComplete({ id: 'quiz', score, detail: { correct, total: questions.length } })
  }, [finished, correct, onComplete, questions.length])

  function answerQuestion(option) {
    if (locked || finished) return
    const question = questions[questionIndex]
    const isCorrect = option === question.answer
    setSelectedAnswer(option)
    setLocked(true)
    if (isCorrect) setCorrect((current) => current + 1)
    onSound()
    transitionRef.current = window.setTimeout(() => {
      if (questionIndex === questions.length - 1) {
        setFinished(true)
      } else {
        setQuestionIndex((current) => current + 1)
        setSelectedAnswer(null)
        setLocked(false)
      }
    }, 420)
  }

  if (finished) {
    const score = Math.round((correct / questions.length) * 100)
    return (
      <GameResult
        title="Tech Quiz"
        score={score}
        summary={`${correct} of ${questions.length} correct · ${secondsLeft}s remaining`}
        onReplay={onReplay}
        onBack={onBack}
      />
    )
  }

  const question = questions[questionIndex]
  return (
    <div className="sx-game-content">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>QUESTION {questionIndex + 1} / {questions.length}</span>
        <span className={secondsLeft <= 10 ? 'sx-time-critical' : ''}><Zap size={13} aria-hidden="true" /> {secondsLeft}s</span>
      </div>
      <div className="sx-question-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
      <h3 className="mt-5 text-lg font-medium leading-snug text-white">{question.question}</h3>
      <div className="mt-4 grid gap-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option
          const isCorrect = option === question.answer
          const stateClass = isSelected ? (isCorrect ? ' is-correct' : ' is-wrong') : (locked && isCorrect ? ' is-correct' : '')
          return (
            <button
              type="button"
              key={option}
              className={`sx-answer-option${stateClass}`}
              onClick={() => answerQuestion(option)}
              disabled={locked}
            >
              <span>{option}</span>
              {isSelected && isCorrect && <Check size={15} aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}

function MemoryMatch({ onComplete, onSound, onReplay, onBack }) {
  const cards = useMemo(() => shuffle(TECHNOLOGIES.flatMap((technology, pair) => [
    { ...technology, key: `${pair}-a` },
    { ...technology, key: `${pair}-b` },
  ])), [])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)
  const [locked, setLocked] = useState(false)
  const startTimeRef = useRef(Date.now())
  const flipTimeoutRef = useRef(null)
  const reportedRef = useRef(false)
  const flippedRef = useRef([])
  const matchedRef = useRef([])
  const lockedRef = useRef(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (finished) return undefined
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [finished])

  useEffect(() => () => window.clearTimeout(flipTimeoutRef.current), [])

  useEffect(() => {
    if (!finished || reportedRef.current) return
    reportedRef.current = true
    const score = Math.max(30, 100 - Math.max(0, moves - TECHNOLOGIES.length) * 4 - Math.floor(elapsed / 60) * 10)
    onComplete({ id: 'memory', score, detail: { moves, seconds: elapsed } })
  }, [finished, moves, elapsed, onComplete])

  function flipCard(card) {
    if (lockedRef.current || finishedRef.current || flippedRef.current.includes(card.key) || matchedRef.current.includes(card.key)) return
    onSound()
    if (flippedRef.current.length === 0) {
      flippedRef.current = [card.key]
      setFlipped([card.key])
      return
    }

    const firstCardKey = flippedRef.current[0]
    const firstCard = cards.find((item) => item.key === firstCardKey)
    const isMatch = firstCard?.name === card.name
    const nextFlipped = [firstCardKey, card.key]
    flippedRef.current = nextFlipped
    setMoves((current) => current + 1)
    setFlipped(nextFlipped)
    lockedRef.current = true
    setLocked(true)
    flipTimeoutRef.current = window.setTimeout(() => {
      if (isMatch) {
        const nextMatched = [...matchedRef.current, ...nextFlipped]
        matchedRef.current = nextMatched
        setMatched(nextMatched)
        flippedRef.current = []
        setFlipped([])
        if (nextMatched.length === cards.length) {
          finishedRef.current = true
          setFinished(true)
        }
      } else {
        flippedRef.current = []
        setFlipped([])
      }
      lockedRef.current = false
      setLocked(false)
    }, 560)
  }

  if (finished) {
    const score = Math.max(30, 100 - Math.max(0, moves - TECHNOLOGIES.length) * 4 - Math.floor(elapsed / 60) * 10)
    return (
      <GameResult
        title="Memory Match"
        score={score}
        summary={`${moves} moves · ${formatTime(elapsed)}`}
        onReplay={onReplay}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="sx-game-content">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>MOVES <strong className="ml-1 font-medium text-white">{moves}</strong></span>
        <span>TIME <strong className="ml-1 font-medium text-white">{formatTime(elapsed)}</strong></span>
      </div>
      <div className="sx-memory-grid mt-4">
        {cards.map((card) => {
          const isFaceUp = flipped.includes(card.key) || matched.includes(card.key)
          return (
            <button
              type="button"
              key={card.key}
              className={`sx-memory-card${isFaceUp ? ' is-flipped' : ''}${matched.includes(card.key) ? ' is-matched' : ''}`}
              onClick={() => flipCard(card)}
              aria-label={isFaceUp ? `${card.name}${matched.includes(card.key) ? ', matched' : ''}` : 'Flip hidden technology card'}
              aria-pressed={isFaceUp}
              disabled={locked || matched.includes(card.key)}
            >
              <span className="sx-memory-card-inner">
                <span className="sx-memory-card-back" aria-hidden="true">S</span>
                <span className="sx-memory-card-front" aria-hidden={!isFaceUp}>
                  <strong>{card.symbol}</strong>
                  <small>{card.name}</small>
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <p className="mt-3 text-center text-[11px] text-zinc-500">{matched.length / 2} of {TECHNOLOGIES.length} pairs found</p>
    </div>
  )
}

function countCorrectCharacters(input, target) {
  let correct = 0
  for (let index = 0; index < Math.min(input.length, target.length); index += 1) {
    if (input[index] === target[index]) correct += 1
  }
  return correct
}

function CodeSprint({ onComplete, onSound, onReplay, onBack }) {
  const [snippet] = useState(() => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)])
  const [typed, setTyped] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)
  const reportedRef = useRef(false)
  const accuracy = Math.round((countCorrectCharacters(typed, snippet) / Math.max(snippet.length, typed.length)) * 100)
  const wpm = Math.round((typed.length / 5) / Math.max(elapsed / 60, 1 / 60))

  useEffect(() => {
    if (!startedAt || finished) return undefined
    const timer = window.setInterval(() => setElapsed(Math.max(1, Math.floor((Date.now() - startedAt) / 1000))), 1000)
    return () => window.clearInterval(timer)
  }, [startedAt, finished])

  useEffect(() => {
    if (!finished || reportedRef.current) return
    reportedRef.current = true
    onComplete({ id: 'code', score: accuracy, detail: { accuracy, wpm, seconds: elapsed } })
  }, [finished, accuracy, wpm, elapsed, onComplete])

  function submitCode(event) {
    event.preventDefault()
    if (!typed.trim() || finished) return
    if (!startedAt) setElapsed(1)
    setFinished(true)
    onSound()
  }

  if (finished) {
    return (
      <GameResult
        title="Code Sprint"
        score={accuracy}
        summary={`${wpm} WPM · ${accuracy}% accuracy · ${formatTime(elapsed)}`}
        onReplay={onReplay}
        onBack={onBack}
      />
    )
  }

  return (
    <form className="sx-game-content" onSubmit={submitCode}>
      <p className="text-xs text-zinc-500">TYPE THIS SNIPPET AS ACCURATELY AS YOU CAN</p>
      <pre className="sx-code-prompt"><code>{snippet}</code></pre>
      <label className="sr-only" htmlFor="sx-code-entry">Type the code snippet</label>
      <textarea
        id="sx-code-entry"
        className="sx-code-entry"
        value={typed}
        onChange={(event) => {
          if (!startedAt) setStartedAt(Date.now())
          setTyped(event.target.value)
        }}
        placeholder="Start typing here..."
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
        rows={3}
      />
      <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
        <span>{typed.length} characters</span>
        <span>{startedAt ? `${formatTime(elapsed)} elapsed` : 'Timer starts on first keystroke'}</span>
      </div>
      <button type="submit" className="sx-primary-button mt-4 w-full justify-center" disabled={!typed.trim()}>
        <Zap size={14} aria-hidden="true" /> Finish sprint
      </button>
    </form>
  )
}

export default function ExperienceGames({ progress, onComplete, onReset, onSound }) {
  const [selectedGame, setSelectedGame] = useState(null)
  const [round, setRound] = useState(0)

  function replay() {
    setRound((current) => current + 1)
    onSound()
  }

  const gameProps = { onComplete, onSound, onReplay: replay, onBack: () => setSelectedGame(null) }

  return (
    <div className="sx-games-content">
      {!selectedGame ? (
        <>
          <ProgressSummary progress={progress} onReset={onReset} />
          <div className="sx-game-list">
            {GAME_OPTIONS.map(({ id, title, description, icon: Icon }) => (
              <button
                type="button"
                key={id}
                className="sx-game-launch-card"
                onClick={() => { setSelectedGame(id); onSound() }}
              >
                <span className="sx-game-launch-icon"><Icon size={18} aria-hidden="true" /></span>
                <span className="min-w-0 flex-1 text-left">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <span className="sx-game-chevron" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <p className="sx-local-progress-note"><Gamepad2 size={12} aria-hidden="true" /> Progress is saved in this browser.</p>
        </>
      ) : (
        <>
          <button type="button" className="sx-back-to-games" onClick={() => setSelectedGame(null)}>
            <ChevronLeft size={14} aria-hidden="true" /> All games
          </button>
          {selectedGame === 'quiz' && <TechQuiz key={`quiz-${round}`} {...gameProps} />}
          {selectedGame === 'memory' && <MemoryMatch key={`memory-${round}`} {...gameProps} />}
          {selectedGame === 'code' && <CodeSprint key={`code-${round}`} {...gameProps} />}
        </>
      )}
    </div>
  )
}
