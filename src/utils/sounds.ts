import { SoundType } from '../types';

// Web Audio API를 사용한 간단한 사운드 생성
class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  play(soundType: SoundType) {
    switch (soundType) {
      case 'correct':
        // 맑은 종소리 (Ding!)
        this.playTone(800, 0.1);
        setTimeout(() => this.playTone(1000, 0.1), 50);
        break;
      
      case 'wrong':
        // 부드러운 경고음
        this.playTone(200, 0.2, 'sawtooth');
        break;
      
      case 'combo':
        // 점점 높아지는 톤
        this.playTone(600, 0.1);
        setTimeout(() => this.playTone(800, 0.1), 50);
        setTimeout(() => this.playTone(1000, 0.1), 100);
        break;
      
      case 'levelUp':
        // 팡파레
        this.playTone(523, 0.15); // C
        setTimeout(() => this.playTone(659, 0.15), 150); // E
        setTimeout(() => this.playTone(784, 0.15), 300); // G
        setTimeout(() => this.playTone(1047, 0.3), 450); // C (옥타브 위)
        break;
      
      case 'gameOver':
        // 하강 톤
        this.playTone(400, 0.2);
        setTimeout(() => this.playTone(300, 0.2), 200);
        setTimeout(() => this.playTone(200, 0.4), 400);
        break;
    }
  }
}

export const soundManager = new SoundManager();

