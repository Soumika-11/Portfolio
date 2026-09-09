/**
 * Web Audio API sound synthesis utilities.
 * Generates cute procedural cat sounds with zero external audio assets.
 * Safe for all modern browsers (Chrome, Safari, Firefox, iOS, Android).
 */

let sharedAudioCtx: AudioContext | null = null
let cachedFemaleVoice: SpeechSynthesisVoice | null = null
let voiceListenerRegistered = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return null

    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioContextClass()
    }
    if (sharedAudioCtx.state === 'suspended') {
      void sharedAudioCtx.resume().catch(() => undefined)
    }
    return sharedAudioCtx
  } catch {
    return null
  }
}

/**
 * Warms Safari's audio and speech engines as early as its user-gesture policy allows.
 * Calling this on pointer-down avoids waiting until the later click event on touch devices.
 */
export function prepareInteractiveAudio() {
  const ctx = getAudioContext()
  if (ctx?.state === 'suspended') {
    void ctx.resume().catch(() => undefined)
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      cachedFemaleVoice = findFemaleVoice(voices)
    } else if (!voiceListenerRegistered) {
      voiceListenerRegistered = true
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        cachedFemaleVoice = findFemaleVoice(window.speechSynthesis.getVoices())
        voiceListenerRegistered = false
      }, { once: true })
    }
  }
}

/**
 * Plays an adorable kitten "meow" sound using procedural Web Audio synthesis.
 * Uses a triangle wave modulated by a vocal tract bandpass formant filter
 * and an expressive frequency contour (m-e-o-w glide).
 */
export function playMeowSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    // 1. Primary vocal oscillator (triangle wave offers a warm, flute-like vocal core)
    const osc = ctx.createOscillator()
    osc.type = 'triangle'

    // 2. Vocal tract resonance filter (bandpass filter to mimic cat throat / mouth resonance)
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.setValueAtTime(3.2, now)

    // 3. Amplitude envelope gain node
    const gainNode = ctx.createGain()

    // Pitch trajectory for a cute, soft kitten meow:
    // Starts around 520Hz ("m-"), glides swiftly up to 960Hz ("-ee-"), peaks at ~1060Hz ("-o-"), drops to ~480Hz ("-w")
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.12)
    osc.frequency.exponentialRampToValueAtTime(1060, now + 0.22)
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.52)

    // Formant frequency movement ("m -> ee -> ow")
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(1750, now + 0.14)
    filter.frequency.exponentialRampToValueAtTime(850, now + 0.5)

    // Amplitude envelope: soft attack, sustained body, gentle fadeout
    gainNode.gain.setValueAtTime(0.0001, now)
    gainNode.gain.linearRampToValueAtTime(0.28, now + 0.07)
    gainNode.gain.setValueAtTime(0.26, now + 0.26)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)

    // Connect vocal path
    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    // 4. Subtle second harmonic for warm feline chest resonance
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    const gain2 = ctx.createGain()

    osc2.frequency.setValueAtTime(520 * 2, now)
    osc2.frequency.exponentialRampToValueAtTime(960 * 2, now + 0.12)
    osc2.frequency.exponentialRampToValueAtTime(1060 * 2, now + 0.22)
    osc2.frequency.exponentialRampToValueAtTime(480 * 2, now + 0.52)

    gain2.gain.setValueAtTime(0.0001, now)
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.07)
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.52)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    // Start playback
    osc.start(now)
    osc2.start(now)
    osc.stop(now + 0.58)
    osc2.stop(now + 0.58)
  } catch {
    // Autoplay restrictions or audio interruption - ignore silently
  }
}

/**
 * Plays a gentle, soothing cat purr sound.
 */
export function playPurrSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(48, now)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(130, now)

    // LFO for rhythmic purr oscillation (~22Hz)
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(22, now)

    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(0.12, now)

    const mainGain = ctx.createGain()
    mainGain.gain.setValueAtTime(0.0001, now)
    mainGain.gain.linearRampToValueAtTime(0.2, now + 0.1)
    mainGain.gain.setValueAtTime(0.18, now + 0.6)
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9)

    lfo.connect(lfoGain)
    lfoGain.connect(mainGain.gain)

    osc.connect(filter)
    filter.connect(mainGain)
    mainGain.connect(ctx.destination)

    osc.start(now)
    lfo.start(now)
    osc.stop(now + 0.95)
    lfo.stop(now + 0.95)
  } catch {
    // Autoplay restrictions or audio interruption - ignore silently
  }
}

/**
 * 3. Cat Chirp / Greeting Trill ("Mrrr-up!")
 * Fast rising tone with 26Hz vibrato simulating a rolling feline greeting trill.
 */
export function playChirpSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(620, now)
    osc.frequency.exponentialRampToValueAtTime(1250, now + 0.22)

    // Vibrato / trill LFO (~26Hz) for feline rolling trill
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(26, now)
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(75, now)
    lfo.connect(osc.frequency)

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1200, now)
    filter.Q.setValueAtTime(2.5, now)

    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.0001, now)
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.04)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    lfo.start(now)
    osc.stop(now + 0.3)
    lfo.stop(now + 0.3)
  } catch { }
}

/**
 * 4. Short Kitten Squeak ("Mew!")
 * High-pitched, playful tiny baby kitten mew.
 */
export function playMewSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(820, now)
    osc.frequency.exponentialRampToValueAtTime(1380, now + 0.08)
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.22)

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1600, now)
    filter.Q.setValueAtTime(2.8, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.24, now + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.26)
  } catch { }
}

/**
 * 5. Questioning Cat "Mrrow?"
 * Inquisitive inflection ending on a rising pitch.
 */
export function playMrrowSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(460, now)
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.16)
    osc.frequency.exponentialRampToValueAtTime(1180, now + 0.38)

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(900, now)
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.3)
    filter.Q.setValueAtTime(3.0, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.26, now + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.45)
  } catch { }
}

/**
 * 6. Playful Anime "Nyaa~"
 * Melodic double contour with bright formant resonance.
 */
export function playNyaSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(920, now)
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.1)
    osc.frequency.exponentialRampToValueAtTime(1080, now + 0.24)
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.42)

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1400, now)
    filter.frequency.exponentialRampToValueAtTime(2100, now + 0.2)
    filter.frequency.exponentialRampToValueAtTime(1100, now + 0.4)
    filter.Q.setValueAtTime(3.5, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05)
    gain.gain.setValueAtTime(0.23, now + 0.22)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.48)
  } catch { }
}

/**
 * 7. Sleepy Yawn / Stretch ("Yaaawn~")
 * Gentle high breathy slide down into cozy relaxation.
 */
export function playYawnSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1080, now)
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.18)
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.58)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1600, now)
    filter.frequency.exponentialRampToValueAtTime(650, now + 0.55)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.2, now + 0.08)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.65)
  } catch { }
}

export type CatSoundType = 'meow' | 'chirp' | 'mew' | 'mrrow' | 'purr' | 'nya' | 'yawn'

export interface CatSoundResult {
  type: CatSoundType
  speech: string
}

/**
 * Selects and plays a random cat sound, ensuring consecutive clicks never repeat the same noise.
 */
export function playRandomCatSound(lastType?: string): CatSoundResult {
  const options: Array<{ type: CatSoundType; fn: () => void; speech: string }> = [
    { type: 'meow', fn: playMeowSound, speech: 'Meow~ 🐾' },
    { type: 'chirp', fn: playChirpSound, speech: 'Mrrr-up! 🎶' },
    { type: 'mew', fn: playMewSound, speech: 'Mew! 🤍' },
    { type: 'mrrow', fn: playMrrowSound, speech: 'Mrrow? 🐱' },
    { type: 'purr', fn: playPurrSound, speech: 'Purr~ 💖' },
    { type: 'nya', fn: playNyaSound, speech: 'Nyaa~ ✨' },
    { type: 'yawn', fn: playYawnSound, speech: 'Yaaawn~ 💤' },
  ]

  const candidates = lastType ? options.filter((o) => o.type !== lastType) : options
  const pick = candidates[Math.floor(Math.random() * candidates.length)]
  pick.fn()
  return { type: pick.type, speech: pick.speech }
}

/**
 * Plays a cheerful, musical chime arpeggio when Soumika is tapped.
 */
export function playGirlGreetingSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    // Uplifting pentatonic bell frequencies: G5, C6, E6, G6
    const freqs = [784, 1046.5, 1318.5, 1568]

    freqs.forEach((freq, idx) => {
      const noteTime = now + idx * 0.075

      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, noteTime)

      const oscHarmonic = ctx.createOscillator()
      oscHarmonic.type = 'triangle'
      oscHarmonic.frequency.setValueAtTime(freq * 2, noteTime)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, noteTime)
      gain.gain.linearRampToValueAtTime(0.18 / (idx * 0.3 + 1), noteTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45)

      const harmonicGain = ctx.createGain()
      harmonicGain.gain.setValueAtTime(0.0001, noteTime)
      harmonicGain.gain.linearRampToValueAtTime(0.06 / (idx * 0.3 + 1), noteTime + 0.02)
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.3)

      osc.connect(gain)
      oscHarmonic.connect(harmonicGain)
      gain.connect(ctx.destination)
      harmonicGain.connect(ctx.destination)

      osc.start(noteTime)
      oscHarmonic.start(noteTime)
      osc.stop(noteTime + 0.48)
      oscHarmonic.stop(noteTime + 0.32)
    })
  } catch { }
}

export const WELCOMING_LINES = [
  'Hey there! Welcome to my cozy dev corner! ☕✨',
  "Hi! I'm Soumika — thanks for stopping by! 👩‍💻💜",
  'Welcome! Feel free to explore my projects & skills! 🌸🚀',
  'Grab a cup of coffee and make yourself at home! ☕💖',
  'Turning ideas into code every day — great to meet you! 💻✨',
  "Hey friend! Hope you're having an awesome day! 🌟",
  "Welcome to my room! Don't forget to pet the cat! 🐾🤍",
  'Shipping clean code and building cool stuff — welcome in! 💫',
]

/**
 * Returns a random welcoming line, ensuring no consecutive duplicates.
 */
export function getRandomWelcomingLine(lastLine?: string): string {
  const candidates = lastLine ? WELCOMING_LINES.filter((l) => l !== lastLine) : WELCOMING_LINES
  return candidates[Math.floor(Math.random() * candidates.length)]
}

/**
 * Strict lists to guarantee ONLY female voices are ever used.
 */
const FEMALE_VOICE_NAMES = [
  'samantha',
  'karen',
  'tessa',
  'moira',
  'tara',
  'victoria',
  'kathy',
  'sandy',
  'shelley',
  'flo',
  'fiona',
  'veena',
  'sangeeta',
  'serena',
  'ava',
  'allison',
  'susan',
  'zoe',
  'kate',
  'stephanie',
  'zira',
  'jenny',
  'aria',
  'michelle',
  'hazel',
  'heera',
  'neerja',
  'female',
]

const MALE_VOICE_PATTERNS = [
  'male',
  'google us english', // Google US English in Chrome is male
  'albert',
  'daniel',
  'fred',
  'ralph',
  'rishi',
  'reed',
  'rocko',
  'eddy',
  'grandpa',
  'jester',
  'junior',
  'alex',
  'david',
  'george',
  'mark',
  'oliver',
  'lee',
  'aaron',
  'arthur',
  'gordon',
  'thomas',
  'james',
  'guy',
  'aman',
  'bad news',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'organ',
  'superstar',
  'trinoids',
  'whisper',
  'zarvox',
  'wobble',
]

/**
 * Finds a verified female voice from the available synthesis voices.
 * Returns null if no female voice is available (NEVER falls back to male).
 */
export function getFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices || voices.length === 0) return null

  return findFemaleVoice(voices)
}

function findFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // 1. Filter out all voices with male identifiers
  const nonMale = voices.filter((v) => {
    const name = v.name.toLowerCase()
    return !MALE_VOICE_PATTERNS.some((m) => name.includes(m))
  })

  // 2. Filter for explicitly confirmed female voices
  const confirmedFemale = nonMale.filter((v) => {
    const name = v.name.toLowerCase()
    return FEMALE_VOICE_NAMES.some((f) => name.includes(f))
  })

  // Priority order for the warmest, most natural female voices
  const priorityOrder = [
    'samantha',
    'karen',
    'tessa',
    'moira',
    'tara',
    'sandy',
    'shelley',
    'flo',
    'victoria',
    'kathy',
    'female',
    'zira',
    'jenny',
    'aria',
  ]

  const englishFemale = confirmedFemale.filter((v) => v.lang.toLowerCase().startsWith('en'))
  for (const key of priorityOrder) {
    const match = englishFemale.find((v) => v.name.toLowerCase().includes(key))
    if (match) return match
  }

  if (englishFemale.length > 0) return englishFemale[0]
  if (confirmedFemale.length > 0) return confirmedFemale[0]

  return null
}

/**
 * Speaks a welcoming greeting line aloud using Web Speech API.
 * STRICT: Only uses confirmed female voices. Never speaks with a male voice.
 */
export function speakGreeting(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    // Strip emojis for clean vocalization
    const cleanText = text
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (!cleanText) return

    const speakWithFemaleVoice = () => {
      const femaleVoice = cachedFemaleVoice ?? getFemaleVoice()
      // Only speak if a confirmed female voice is present
      if (!femaleVoice) return

      cachedFemaleVoice = femaleVoice

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.voice = femaleVoice
      utterance.pitch = 1.18
      utterance.rate = 1.02
      utterance.volume = 0.88
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
      window.speechSynthesis.speak(utterance)
    }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        speakWithFemaleVoice()
      }, { once: true })
    } else {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel()
      }
      speakWithFemaleVoice()
    }
  } catch { }
}


