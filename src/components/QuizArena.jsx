import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { useTranslation } from 'react-i18next'
import {
  Award,
  Check,
  ChevronLeft,
  Copy,
  Download,
  Flame,
  RotateCcw,
  Share2,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import {
  getDailyCategory,
  getQuestionPool,
  QUIZ_CATEGORIES,
  QUIZ_DIFFICULTIES,
  QUIZ_QUESTIONS,
} from '../data/quizQuestions'

const LEADERBOARD_KEY = 'syntaxo-quiz-leaderboard-v1'
const PLAYER_KEY = 'syntaxo-quiz-player-v1'
const DEVICE_KEY = 'syntaxo-quiz-device-v1'
const SESSION_KEY = 'syntaxo-quiz-session-v1'

function getDeviceProfile() {
  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent
  let type = 'Desktop'
  if (/tablet|ipad/i.test(ua)) type = 'Tablet'
  else if (/mobile|android|iphone|ipod/i.test(ua)) type = 'Mobile'
  return {
    type,
    browser: /edg/i.test(ua) ? 'Edge' : /chrome|crios/i.test(ua) ? 'Chrome' : /safari/i.test(ua) ? 'Safari' : /firefox|fxios/i.test(ua) ? 'Firefox' : 'Browser',
    platform: typeof navigator !== 'undefined' ? (navigator.platform || 'Unknown') : 'Unknown',
    screen: typeof window !== 'undefined' ? `${window.screen?.width || 0}x${window.screen?.height || 0}` : 'Unknown',
  }
}

function saveJson(key, value) {
  try { window.localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

function readLeaderboard() {
  try {
    return JSON.parse(window.localStorage.getItem(LEADERBOARD_KEY) || '[]')
  } catch {
    return []
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}

function performanceFor(accuracy) {
  if (accuracy >= 90) return 'Quiz Master'
  if (accuracy >= 70) return 'Tech Expert'
  if (accuracy >= 50) return 'Rising Developer'
  return 'Keep Learning!'
}

function localizedQuestion(question, language) {
  const translation = question.translations?.[language]
  if (!translation) return question
  return {
    ...question,
    question: translation.question,
    explanation: translation.explanation,
    options: question.options.map((option) => ({
      ...option,
      text: translation.options[option.id] || option.text,
    })),
  }
}

function localCategory(category, t) {
  const key = {
    'JavaScript':'javascript','React.js':'react','Python':'python','HTML & CSS':'htmlCss',
    'Data Structures & Algorithms':'dsa','Generative AI':'genai','General Technology':'general',
  }[category]
  return key ? t(`quiz.categories.${key}`) : category === 'Random Quiz' ? t('quiz.random') : category
}

export default function QuizArena({ onComplete, onSound, onBack, soundEnabled }) {
  const { t, i18n } = useTranslation()
  const [screen, setScreen] = useState('landing')
  const [playerName, setPlayerName] = useState(() => {
    try { return window.localStorage.getItem(PLAYER_KEY) || '' } catch { return '' }
  })
  const [category, setCategory] = useState(QUIZ_CATEGORIES[0])
  const [difficulty, setDifficulty] = useState('Easy')
  const [nameError, setNameError] = useState('')
  const [muted, setMuted] = useState(!soundEnabled)
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [displayOptions, setDisplayOptions] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [locked, setLocked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [secondsLeft, setSecondsLeft] = useState(20)
  const [startedAt, setStartedAt] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [leaderboard, setLeaderboard] = useState(readLeaderboard)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [shareStatus, setShareStatus] = useState('')
  const [deviceProfile] = useState(getDeviceProfile)
  const scorecardRef = useRef(null)
  const timerExpiredRef = useRef(false)
  const answersRef = useRef([])

  const currentQuestionSource = questions[questionIndex]
  const currentQuestion = currentQuestionSource
    ? localizedQuestion(currentQuestionSource, i18n.language)
    : null
  const correctCount = answers.filter((answer) => answer.correct).length
  const incorrectCount = answers.filter((answer) => answer.selectedId && !answer.correct).length
  const unansweredCount = answers.filter((answer) => !answer.selectedId).length
  const accuracy = questions.length ? Math.round((correctCount / questions.length) * 100) : 0
  const score = questions.length ? Math.round(correctCount) : 0
  const performanceKey = accuracy >= 90 ? 'master' : accuracy >= 70 ? 'expert' : accuracy >= 50 ? 'rising' : 'learning'
  const performance = t(`quiz.performance.${performanceKey}`)

  useEffect(() => {
    if (!startedAt || screen !== 'playing') return undefined
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [startedAt, screen])

  useEffect(() => {
    if (screen !== 'playing' || locked) return undefined
    if (secondsLeft <= 0) {
      if (!timerExpiredRef.current) {
        timerExpiredRef.current = true
        submitAnswer(null)
      }
      return undefined
    }
    const timeout = window.setTimeout(() => setSecondsLeft((current) => current - 1), 1000)
    return () => window.clearTimeout(timeout)
  }, [secondsLeft, screen, locked])

  useEffect(() => {
    if (screen !== 'playing') return
    const question = questions[questionIndex]
    if (question) setDisplayOptions(shuffle(localizedQuestion(question, i18n.language).options))
  }, [questionIndex, questions, screen, i18n.language])

  function beginQuiz(selectedCategory = category, selectedDifficulty = difficulty) {
    const name = playerName.trim()
    if (!name) {
      setNameError(t('quiz.nameError'))
      return
    }
    setNameError('')
    try { window.localStorage.setItem(PLAYER_KEY, name) } catch {}
    saveJson(DEVICE_KEY, { ...deviceProfile, lastUsed: new Date().toISOString() })
    saveJson(SESSION_KEY, {
      playerName: name,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      startedAt: new Date().toISOString(),
      device: deviceProfile,
    })

    let pool = getQuestionPool(selectedCategory, selectedDifficulty)
    if (selectedCategory === 'Random Quiz') pool = shuffle(QUIZ_QUESTIONS).slice(0, 10)
    if (pool.length < 10) pool = shuffle([...pool, ...QUIZ_QUESTIONS]).filter((item, index, array) => array.findIndex((entry) => entry.id === item.id) === index).slice(0, 10)
    const picked = shuffle(pool).slice(0, 10)
    setCategory(selectedCategory)
    setDifficulty(selectedDifficulty)
    setQuestions(picked)
    setQuestionIndex(0)
    setAnswers([])
    answersRef.current = []
    setSelectedId(null)
    setLocked(false)
    const timedLimit = selectedDifficulty === 'Easy' ? 20 : selectedDifficulty === 'Medium' ? 18 : 15
    setSecondsLeft(timedLimit)
    setStartedAt(Date.now())
    setElapsed(0)
    setScreen('playing')
  }

  function submitAnswer(optionId) {
    if (locked || !currentQuestion) return
    setSelectedId(optionId)
    setLocked(true)
    const correct = optionId === currentQuestion.correctAnswerId
    const nextAnswers = [
      ...answersRef.current,
      { question: currentQuestion, selectedId: optionId, correct },
    ]
    answersRef.current = nextAnswers
    setAnswers(nextAnswers)
    if (!muted) onSound()
  }

  function nextQuestion() {
    if (!locked) return
    if (questionIndex >= questions.length - 1) {
      finishQuiz()
      return
    }
    setQuestionIndex((current) => current + 1)
    setSelectedId(null)
    setLocked(false)
    timerExpiredRef.current = false
    setSecondsLeft(difficulty === 'Easy' ? 20 : difficulty === 'Medium' ? 18 : 15)
  }

  function finishQuiz() {
    const finalAnswers = answersRef.current
    const correct = finalAnswers.filter((answer) => answer.correct).length
    const finalAccuracy = Math.round((correct / questions.length) * 100)
    const finalElapsed = elapsed || Math.max(1, Math.floor((Date.now() - startedAt) / 1000))
    const result = {
      name: playerName.trim(),
      category,
      difficulty,
      score: correct,
      total: questions.length,
      accuracy: finalAccuracy,
      elapsed: finalElapsed,
      date: new Date().toISOString(),
      device: deviceProfile,
    }
    const nextLeaderboard = [...readLeaderboard(), result]
      .sort((a, b) => b.accuracy - a.accuracy || b.score - a.score || a.elapsed - b.elapsed)
      .slice(0, 50)
    try { window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(nextLeaderboard)) } catch {}
    saveJson(SESSION_KEY, {
      ...result,
      playerName: result.name,
      completedAt: new Date().toISOString(),
    })
    setLeaderboard(nextLeaderboard)
    setElapsed(finalElapsed)
    setScreen('results')
    if (finalAccuracy >= 70 && !muted) onSound()
    onComplete({
      id: 'quiz',
      score: finalAccuracy,
      detail: { correct, total: questions.length, category, difficulty },
    })
  }

  function resetArena(nextScreen = 'landing') {
    setScreen(nextScreen)
    setQuestions([])
    setAnswers([])
    answersRef.current = []
    setSelectedId(null)
    setLocked(false)
  }

  function startDaily() {
    setCategory(getDailyCategory())
    setDifficulty('Medium')
    setTimeout(() => beginQuiz(getDailyCategory(), 'Medium'), 0)
  }

  function startRandom() {
    setCategory('Random Quiz')
    setDifficulty('Medium')
    setTimeout(() => beginQuiz('Random Quiz', 'Medium'), 0)
  }

  const shareText = i18n.language === 'hi'
    ? `मैंने SYNTAXO Quiz Arena में ${score}/${questions.length} अंक बनाए!\n\nकैटेगरी: ${localCategory(category, t)}\nसटीकता: ${accuracy}%\n\nक्या आप मेरा स्कोर पछाड़ सकते हैं?\n\nयहाँ चुनौती दें:\nhttps://syntaxocommunity.netlify.app/\n\n#SYNTAXO #QuizArena #TechCommunity`
    : i18n.language === 'te'
      ? `నేను SYNTAXO Quiz Arenaలో ${score}/${questions.length} స్కోర్ చేశాను!\n\nCategory: ${localCategory(category, t)}\nAccuracy: ${accuracy}%\n\nనా scoreను మీరే మించగలరా?\n\nఇక్కడ challenge చేయండి:\nhttps://syntaxocommunity.netlify.app/\n\n#SYNTAXO #QuizArena #TechCommunity`
      : `I just scored ${score}/${questions.length} in the SYNTAXO Quiz Arena!\n\nCategory: ${category}\nAccuracy: ${accuracy}%\n\nThink you can beat my score?\n\nChallenge yourself at:\nhttps://syntaxocommunity.netlify.app/\n\n#SYNTAXO #QuizArena #TechCommunity`

  async function copyResult() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = shareText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const copied = document.execCommand('copy')
        document.body.removeChild(textarea)
        if (!copied) throw new Error('Copy failed')
      }
      setShareStatus('Result copied!')
      window.setTimeout(() => setShareStatus(''), 1800)
    } catch {
      setShareStatus('Copy unavailable')
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SYNTAXO Quiz Arena', text: shareText })
      } catch {}
    } else {
      await copyResult()
    }
  }

  async function downloadScorecard() {
    if (!scorecardRef.current) return
    try {
      const canvas = await html2canvas(scorecardRef.current, {
        scale: 3,
        backgroundColor: '#090b14',
        useCORS: true,
      })
      const safeName = playerName.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'player'
      const filename = `syntaxo-quiz-${safeName}-score.png`
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (blob && navigator.share && navigator.canShare) {
        const file = new File([blob], filename, { type: 'image/png' })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: 'SYNTAXO Quiz Arena', text: shareText, files: [file] })
          setShareStatus('Scorecard shared')
          return
        }
      }
      if (!blob) throw new Error('Image creation failed')
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `syntaxo-quiz-${safeName}-score.png`
      link.href = url
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      setShareStatus('Could not create scorecard')
    }
  }

  if (screen === 'leaderboard') {
    const filtered = categoryFilter === 'All'
      ? leaderboard
      : leaderboard.filter((entry) => entry.category === categoryFilter)
    return (
      <div className="qa-screen qa-leaderboard">
        <div className="qa-screen-heading">
          <button type="button" className="qa-back" onClick={() => setScreen('landing')}><ChevronLeft size={14} /> Arena</button>
          <Trophy size={18} />
        </div>
        <h3>{t('quiz.localLeaderboard')}</h3>
        <p className="qa-local-note">{t('quiz.localOnly')}</p>
        <select className="qa-select qa-filter" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option>All</option>
          {QUIZ_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
        </select>
        {filtered.length === 0 ? (
          <div className="qa-empty">{t('quiz.noPlayers')}</div>
        ) : (
          <div className="qa-rankings">
            {filtered.map((entry, index) => (
              <div className={`qa-rank-row qa-rank-${index + 1}`} key={`${entry.name}-${entry.date}-${index}`}>
                <span className="qa-rank">#{index + 1}</span>
                <span className="qa-rank-name"><strong>{entry.name}</strong><small>{entry.category} · {entry.device?.type || 'This device'}</small></span>
                <span className="qa-rank-score">{entry.accuracy}%<small>{entry.score}/{entry.total}</small></span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (screen === 'review') {
    return (
      <div className="qa-screen qa-review">
        <div className="qa-screen-heading">
          <button type="button" className="qa-back" onClick={() => setScreen('results')}><ChevronLeft size={14} /> Results</button>
          <button type="button" className="qa-icon-button" onClick={() => resetArena()} aria-label="Close review"><X size={15} /></button>
        </div>
        <h3>{t('quiz.review')}</h3>
        <div className="qa-review-list">
          {answers.map((answer, index) => {
            const localized = localizedQuestion(answer.question, i18n.language)
            const selected = localized.options.find((option) => option.id === answer.selectedId)
            const correct = localized.options.find((option) => option.id === answer.question.correctAnswerId)
            return (
              <article className={`qa-review-card ${answer.correct ? 'is-correct' : 'is-wrong'}`} key={answer.question.id}>
                <div className="qa-review-status">{answer.correct ? <Check size={13} /> : <X size={13} />} Question {index + 1}</div>
                <h4>{localized.question}</h4>
                <p><span>{t('quiz.yourAnswer')}:</span> {selected?.text || t('quiz.noAnswer')}</p>
                <p><span>{t('quiz.correctAnswer')}:</span> {correct?.text}</p>
                <small>{localized.explanation}</small>
              </article>
            )
          })}
        </div>
      </div>
    )
  }

  if (screen === 'results') {
    return (
      <div className="qa-screen qa-results">
        {accuracy >= 70 && (
          <div className="qa-confetti" aria-hidden="true">
            {Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
          </div>
        )}
        <div ref={scorecardRef} className="qa-result-card">
          <div className="qa-card-brand"><span>SYNTAXO</span><small>QUIZ ARENA</small></div>
          <p className="qa-achievement"><Award size={15} /> {performance}</p>
          <h3>{playerName.trim()}</h3>
          <div className="qa-card-meta">
            <span>{localCategory(category, t)}</span>
            <span>{t(`quiz.${difficulty.toLowerCase()}`)}</span>
          </div>
          <div className="qa-card-score">
            <strong>{score}<small>/{questions.length}</small></strong>
            <span>{accuracy}% accuracy</span>
          </div>
          <p className="qa-card-date">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          <p className="qa-card-device">{t('quiz.playedOn')} {deviceProfile.type} · {deviceProfile.browser}</p>
          <p className="qa-card-url">syntaxocommunity.netlify.app</p>
        </div>

        <div className="qa-result-stats">
          <span><strong>{correctCount}</strong><small>Correct</small></span>
          <span><strong>{incorrectCount}</strong><small>Incorrect</small></span>
          <span><strong>{unansweredCount}</strong><small>Unanswered</small></span>
          <span><strong>{formatTime(elapsed)}</strong><small>Time</small></span>
        </div>

        <div className="qa-result-actions">
          <button type="button" className="qa-primary" onClick={() => resetArena()}><RotateCcw size={14} /> {t('quiz.playAgain')}</button>
          <button type="button" className="qa-secondary" onClick={() => setScreen('landing')}>{t('quiz.another')}</button>
          <button type="button" className="qa-secondary" onClick={nativeShare}><Share2 size={14} /> {t('quiz.share')}</button>
          <button type="button" className="qa-secondary" onClick={downloadScorecard}><Download size={14} /> {t('quiz.download')}</button>
          <button type="button" className="qa-secondary" onClick={copyResult}><Copy size={14} /> {t('quiz.copy')}</button>
          <button type="button" className="qa-secondary" onClick={() => setScreen('review')}>{t('quiz.review')}</button>
          <button type="button" className="qa-secondary" onClick={() => setScreen('leaderboard')}><Trophy size={14} /> {t('quiz.leaderboard')}</button>
        </div>
        {shareStatus && <p className="qa-share-status" role="status">{shareStatus}</p>}
      </div>
    )
  }

  if (screen === 'playing' && currentQuestion) {
    const optionLabel = ['A', 'B', 'C', 'D']
    return (
      <div className="qa-screen qa-playing">
        <div className="qa-play-header">
          <button type="button" className="qa-back" onClick={() => resetArena()}><ChevronLeft size={14} /> {t('quiz.exit')}</button>
          <span>{t('quiz.question')} {questionIndex + 1} / {questions.length}</span>
          <button type="button" className="qa-icon-button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}>
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
        <div className="qa-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
        <div className="qa-question-meta">
          <span>{localCategory(category, t)}</span>
          <span className={secondsLeft <= 5 ? 'is-critical' : ''}>{secondsLeft}s</span>
        </div>
        <h3 className="qa-question">{currentQuestion.question}</h3>
        <div className="qa-options">
          {displayOptions.map((option, index) => {
            const isSelected = selectedId === option.id
            const isCorrect = option.id === currentQuestion.correctAnswerId
            const stateClass = locked
              ? isCorrect ? ' is-correct' : isSelected ? ' is-wrong' : ''
              : isSelected ? ' is-selected' : ''
            return (
              <button
                type="button"
                key={option.id}
                className={`qa-option${stateClass}`}
                onClick={() => submitAnswer(option.id)}
                disabled={locked}
              >
                <span className="qa-option-label">{optionLabel[index]}</span>
                <span>{option.text}</span>
                {locked && isCorrect && <Check size={15} />}
              </button>
            )
          })}
        </div>
        {locked && (
          <div className={`qa-feedback ${selectedId === currentQuestion.correctAnswerId ? 'is-correct' : 'is-wrong'}`}>
            <strong>{selectedId === currentQuestion.correctAnswerId ? t('quiz.correct') : selectedId ? t('quiz.incorrect') : t('quiz.expired')}</strong>
            <p>{currentQuestion.explanation}</p>
            <button type="button" className="qa-primary" onClick={nextQuestion}>
              {questionIndex === questions.length - 1 ? t('quiz.results') : t('quiz.next')}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="qa-screen qa-landing">
      <div className="qa-particles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
      </div>
      <div className="qa-hero">
        <p><Flame size={13} /> {t('quiz.daily').toUpperCase()}</p>
        <h2>SYNTAXO <span>{t('quiz.title').replace('SYNTAXO ', '')}</span></h2>
        <small>{t('quiz.subtitle')}</small>
      </div>

      <div className="qa-mode-grid">
        <button type="button" onClick={startDaily}><Sparkles size={14} /><span><strong>{t('quiz.daily')}</strong><small>{localCategory(getDailyCategory(), t)}</small></span></button>
        <button type="button" onClick={startRandom}><Trophy size={14} /><span><strong>{t('quiz.random')}</strong><small>{t('quiz.mixed')}</small></span></button>
      </div>

      <label className="qa-name">
        <span>{t('quiz.playerName')}</span>
        <input
          value={playerName}
          onChange={(event) => { setPlayerName(event.target.value); setNameError('') }}
          placeholder={t('quiz.namePlaceholder')}
          maxLength={40}
          aria-invalid={Boolean(nameError)}
        />
      </label>
      {nameError && <p className="qa-error" role="alert">{nameError}</p>}

      <div className="qa-select-grid">
        <label>
          <span>{t('quiz.category')}</span>
          <select className="qa-select" value={category} onChange={(event) => setCategory(event.target.value)}>
            {QUIZ_CATEGORIES.map((item) => <option key={item} value={item}>{localCategory(item, t)}</option>)}
          </select>
        </label>
        <label>
          <span>{t('quiz.difficulty')}</span>
          <select className="qa-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            {QUIZ_DIFFICULTIES.map((item) => <option key={item} value={item}>{t(`quiz.${item.toLowerCase()}`)}</option>)}
          </select>
        </label>
      </div>

      <button type="button" className="qa-start" onClick={() => beginQuiz()}>
        {t('quiz.start')} <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
      </button>
      <div className="qa-info">
        <span><strong>10</strong> {t('quiz.questions')}</span>
        <span><strong>4</strong> {t('quiz.choices')}</span>
        <span><strong>{difficulty === 'Easy' ? '20' : difficulty === 'Medium' ? '18' : '15'}s</strong> {t('quiz.perQuestion')}</span>
      </div>
      <div className="qa-rules">
        <strong>{t('quiz.rulesTitle')}</strong>
        <p>{t('quiz.rules')}</p>
      </div>
      <p className="qa-device-note">{t('quiz.deviceOnly', { device: deviceProfile.type.toLowerCase(), browser: deviceProfile.browser })}</p>
      <button type="button" className="qa-leaderboard-link" onClick={() => setScreen('leaderboard')}><Trophy size={13} /> {t('quiz.leaderboard')}</button>
    </div>
  )
}
