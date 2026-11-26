import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import {
  Bot,
  Gamepad2,
  Maximize2,
  Minus,
  Settings2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import './experience.css'
import { useTranslation } from 'react-i18next'

const ExperienceGames = lazy(() => import('./ExperienceGames.jsx'))
const PROGRESS_KEY = 'syntaxo-experience-progress-v1'
const SETTINGS_KEY = 'syntaxo-experience-settings-v1'
const WELCOME_MESSAGES = [
  'Hey Developer! Welcome to SYNTAXO.',
  'Ready to build something amazing?',
  "Let's explore the developer universe!",
]

function emptyProgress() {
  return { xp: 0, gamesPlayed: 0, scores: [], achievements: [] }
}

function readProgress() {
  try {
    const saved = window.localStorage.getItem(PROGRESS_KEY)
    if (!saved) return emptyProgress()
    const parsed = JSON.parse(saved)
    return {
      xp: Number.isFinite(parsed.xp) ? Math.max(0, parsed.xp) : 0,
      gamesPlayed: Number.isFinite(parsed.gamesPlayed) ? Math.max(0, parsed.gamesPlayed) : 0,
      scores: Array.isArray(parsed.scores) ? parsed.scores.slice(0, 20) : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    }
  } catch (error) {
    console.warn('Could not read SYNTAXO game progress from localStorage.', error)
    return emptyProgress()
  }
}

function readSettings() {
  try {
    const saved = window.localStorage.getItem(SETTINGS_KEY)
    if (!saved) return { enabled: true, sound: false }
    const parsed = JSON.parse(saved)
    return {
      enabled: parsed.enabled !== false,
      sound: parsed.sound === true,
    }
  } catch (error) {
    console.warn('Could not read SYNTAXO experience settings from localStorage.', error)
    return { enabled: true, sound: false }
  }
}

function playUiSound(enabled) {
  if (!enabled || typeof window === 'undefined') return
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
  if (!AudioContextConstructor) return

  try {
    const context = new AudioContextConstructor()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 660
    gain.gain.setValueAtTime(0.035, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.09)
    oscillator.onended = () => context.close()
  } catch (error) {
    console.warn('Could not play the optional SYNTAXO interface sound.', error)
  }
}

function getRobotStartPosition() {
  const width = window.innerWidth
  const height = window.innerHeight
  return { x: Math.max(16, width - 78), y: Math.max(88, height - 155) }
}

function getNextRobotPosition() {
  const width = window.innerWidth
  const height = window.innerHeight
  const maxX = Math.max(16, width - 74)
  const maxY = Math.max(88, height - 140)
  const lanes = [18, Math.max(18, width - 74)]
  return {
    x: lanes[Math.floor(Math.random() * lanes.length)],
    y: 82 + Math.random() * Math.max(0, maxY - 82),
  }
}

function Robot({ onClick, position, buttonRef, visible, roaming }) {
  if (!visible) return null

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`sx-robot-button${roaming ? ' is-roaming' : ''}`}
      style={position ? { left: position.x, top: position.y } : undefined}
      onClick={onClick}
      aria-label="Open the SYNTAXO guide"
      title="Chat with the SYNTAXO guide"
    >
      <span className="sx-robot-glow" aria-hidden="true" />
      <span className="sx-robot" aria-hidden="true">
        <span className="sx-robot-antenna" />
        <span className="sx-robot-head">
          <span className="sx-robot-eye sx-robot-eye-left" />
          <span className="sx-robot-eye sx-robot-eye-right" />
          <span className="sx-robot-mouth" />
        </span>
        <span className="sx-robot-neck" />
        <span className="sx-robot-body">
          <span className="sx-robot-core" />
        </span>
      </span>
      <span className="sr-only">Open SYNTAXO guide</span>
    </button>
  )
}

function ExperiencePanelHeader({ icon: Icon, title, onClose, onMinimize, showMinimize = false, isMinimized = false }) {
  return (
    <header className="sx-panel-header">
      <div className="flex min-w-0 items-center gap-3">
        <span className="sx-panel-icon"><Icon size={17} aria-hidden="true" /></span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{title}</p>
          <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">SYNTAXO EXPERIENCE</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {showMinimize && (
          <button type="button" className="sx-icon-button" onClick={onMinimize} aria-label={isMinimized ? 'Restore chat' : 'Minimize chat'}>
            {isMinimized ? <Maximize2 size={15} aria-hidden="true" /> : <Minus size={16} aria-hidden="true" />}
          </button>
        )}
        <button type="button" className="sx-icon-button" onClick={onClose} aria-label="Close panel">
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

function SettingsPanel({ settings, onSettingChange, onClose }) {
  const { t } = useTranslation()
  return (
    <section className="sx-experience-panel sx-settings-panel" aria-label="Experience settings">
      <ExperiencePanelHeader icon={Settings2} title={t('games.settings')} onClose={onClose} />
      <div className="sx-settings-options">
        <label className="sx-setting-row">
          <span>
            <span className="block text-sm text-white">Interactive effects</span>
            <span className="mt-1 block text-xs text-zinc-500">Robot and mini games</span>
          </span>
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(event) => onSettingChange('enabled', event.target.checked)}
            aria-label="Enable interactive effects"
          />
        </label>
        <label className="sx-setting-row">
          <span>
            <span className="block text-sm text-white">Interface sounds</span>
            <span className="mt-1 block text-xs text-zinc-500">Off by default</span>
          </span>
          <span className="sx-sound-toggle-icon" aria-hidden="true">
            {settings.sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </span>
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={(event) => onSettingChange('sound', event.target.checked)}
            aria-label="Enable interface sounds"
          />
        </label>
        <div className="sx-settings-note">
          Your game scores and XP are saved on this device only.
        </div>
      </div>
    </section>
  )
}

function ChatPanel({ onClose, onMinimize, onOpenGames, minimized, welcomeIndex }) {
  const { t } = useTranslation()
  return (
    <section className={`sx-experience-panel sx-chat-panel${minimized ? ' sx-chat-minimized' : ''}`} aria-label="SYNTAXO guide">
      <ExperiencePanelHeader
        icon={Sparkles}
        title="SYNTAXO guide"
        onClose={onClose}
        onMinimize={onMinimize}
        isMinimized={minimized}
        showMinimize
      />
      {!minimized && (
        <div className="sx-chat-content">
          <div className="sx-chat-message">
            <span className="sx-chat-avatar"><Bot size={16} aria-hidden="true" /></span>
            <p>{WELCOME_MESSAGES[welcomeIndex % WELCOME_MESSAGES.length]}</p>
          </div>
          <p className="sx-chat-subtext">Pick a path and explore at your own pace.</p>
          <div className="sx-chat-actions">
            <button type="button" onClick={onOpenGames}>
              Play a mini game <Gamepad2 size={14} aria-hidden="true" />
            </button>
            <Link to="/about" onClick={onClose}>Meet the community <span aria-hidden="true">→</span></Link>
          </div>
          <p className="sx-chat-disclaimer">A friendly, on-device community guide.</p>
        </div>
      )}
    </section>
  )
}

export default function ExperienceHub() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(readProgress)
  const [settings, setSettings] = useState(readSettings)
  const [activePanel, setActivePanel] = useState(null)
  const [minimizedChat, setMinimizedChat] = useState(false)
  const [welcomeIndex, setWelcomeIndex] = useState(-1)
  const [robotPosition, setRobotPosition] = useState(null)
  const [robotRoaming, setRobotRoaming] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [rewardMessage, setRewardMessage] = useState('')
  const [gameRun, setGameRun] = useState(0)
  const robotRef = useRef(null)
  const roamTimeoutRef = useRef(null)
  const settingsEnabled = settings.enabled

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch (error) {
      console.warn('Could not save SYNTAXO game progress to localStorage.', error)
    }
  }, [progress])

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch (error) {
      console.warn('Could not save SYNTAXO experience settings to localStorage.', error)
    }
  }, [settings])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const updatePosition = () => setRobotPosition(getRobotStartPosition())
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  useEffect(() => {
    if (!settingsEnabled || prefersReducedMotion || !pageVisible) return undefined
    const roam = () => {
      setRobotPosition(getNextRobotPosition())
      setRobotRoaming(true)
      window.clearTimeout(roamTimeoutRef.current)
      roamTimeoutRef.current = window.setTimeout(() => setRobotRoaming(false), 5700)
    }
    const roaming = window.setInterval(roam, 9000)
    return () => {
      window.clearInterval(roaming)
      window.clearTimeout(roamTimeoutRef.current)
      setRobotRoaming(false)
    }
  }, [settingsEnabled, prefersReducedMotion, pageVisible])

  useEffect(() => {
    if (!settingsEnabled || prefersReducedMotion || !pageVisible) return undefined
    let animationFrame = 0
    const followPointer = (event) => {
      if (event.pointerType !== 'mouse' || !robotRef.current) return
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = robotRef.current?.getBoundingClientRect()
        if (!bounds) return
        const x = Math.max(-2, Math.min(2, (event.clientX - (bounds.left + bounds.width / 2)) / 65))
        const y = Math.max(-2, Math.min(2, (event.clientY - (bounds.top + bounds.height / 2)) / 65))
        robotRef.current?.style.setProperty('--sx-look-x', `${x}px`)
        robotRef.current?.style.setProperty('--sx-look-y', `${y}px`)
      })
    }
    window.addEventListener('pointermove', followPointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', followPointer)
      cancelAnimationFrame(animationFrame)
    }
  }, [settingsEnabled, prefersReducedMotion, pageVisible])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && activePanel) setActivePanel(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activePanel])

  const closePanel = useCallback(() => setActivePanel(null), [])
  const onGameComplete = useCallback(({ id, score, detail }) => {
    const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)))
    const earnedXp = 20 + Math.round(safeScore * 0.3)
    setProgress((current) => {
      const nextAchievements = new Set(current.achievements)
      if (current.gamesPlayed === 0) nextAchievements.add('firstGame')
      if (id === 'quiz' && safeScore === 100) nextAchievements.add('quizAce')
      if (id === 'memory' && safeScore >= 80) nextAchievements.add('memoryMaster')
      if (id === 'code' && safeScore >= 85) nextAchievements.add('codeSprinter')
      return {
        xp: current.xp + earnedXp,
        gamesPlayed: current.gamesPlayed + 1,
        scores: [{ game: id, score: safeScore, playedAt: new Date().toISOString(), detail }, ...current.scores].slice(0, 20),
        achievements: [...nextAchievements],
      }
    })
    setRewardMessage(`+${earnedXp} XP earned`)
    window.setTimeout(() => setRewardMessage(''), 2600)
  }, [])

  const openChat = useCallback(() => {
    playUiSound(settings.sound)
    setWelcomeIndex((current) => current + 1)
    setMinimizedChat(false)
    setActivePanel('chat')
  }, [settings.sound])

  const updateSetting = useCallback((key, value) => {
    setSettings((current) => ({ ...current, [key]: value }))
    if (key === 'sound' && value) playUiSound(true)
  }, [])

  const resetProgress = useCallback(() => {
    if (!window.confirm('Reset your SYNTAXO XP, scores and achievements on this device?')) return
    setProgress(emptyProgress())
    setRewardMessage('')
  }, [])

  function openGames() {
    playUiSound(settings.sound)
    setActivePanel('games')
    setGameRun((current) => current + 1)
  }

  return (
    <>
      <Robot
        buttonRef={robotRef}
        position={robotPosition}
        roaming={robotRoaming}
        visible={settingsEnabled && pageVisible}
        onClick={openChat}
      />

      <div className="sx-experience-dock" aria-label="Interactive SYNTAXO tools">
        {settingsEnabled && (
          <>
            <button type="button" className="sx-dock-button" onClick={openChat} aria-label="Open SYNTAXO guide" title="SYNTAXO guide">
              <Bot size={19} aria-hidden="true" />
            </button>
            <button type="button" className="sx-dock-button" onClick={openGames} aria-label="Open mini games" title="Mini games">
              <Gamepad2 size={19} aria-hidden="true" />
            </button>
          </>
        )}
        <button
          type="button"
          className={`sx-dock-button sx-settings-trigger${activePanel === 'settings' ? ' is-active' : ''}`}
          onClick={() => setActivePanel((current) => current === 'settings' ? null : 'settings')}
          aria-label="Experience settings"
          title="Experience settings"
        >
          <Settings2 size={18} aria-hidden="true" />
        </button>
      </div>

      {settingsEnabled && activePanel === 'chat' && (
        <ChatPanel
          onClose={closePanel}
          onMinimize={() => setMinimizedChat((current) => !current)}
          onOpenGames={openGames}
          minimized={minimizedChat}
          welcomeIndex={welcomeIndex}
        />
      )}

      {settingsEnabled && activePanel === 'games' && (
        <section className="sx-experience-panel sx-games-panel" aria-label="Mini game hub">
          <ExperiencePanelHeader icon={Gamepad2} title={t('games.title')} onClose={closePanel} />
          {rewardMessage && <p className="sx-reward-toast" role="status"><Sparkles size={14} aria-hidden="true" /> {rewardMessage}</p>}
          <Suspense fallback={<div className="sx-games-loading" role="status">Loading games…</div>}>
            <ExperienceGames
              key={gameRun}
              progress={progress}
              onComplete={onGameComplete}
              onReset={resetProgress}
              onSound={() => playUiSound(settings.sound)}
            />
          </Suspense>
        </section>
      )}

      {activePanel === 'settings' && (
        <SettingsPanel settings={settings} onSettingChange={updateSetting} onClose={closePanel} />
      )}
    </>
  )
}
