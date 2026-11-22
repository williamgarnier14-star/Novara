# Musique de fond originale : ambiance moderne et « luxe » (nappes, basse, rythme feutré)
import sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
import wave

SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]
BPM = 96; beat = 60 / BPM; bar = beat * 4
N = int(SR * (dur + 1))
t = np.arange(N) / SR
rng = np.random.default_rng(7)

def note(m): return 440 * 2 ** ((m - 69) / 12)
def env(n, a, r):
    e = np.ones(n); A = min(int(a * SR), n // 2); R = min(int(r * SR), n // 2)
    e[:A] = np.linspace(0, 1, A) ** 2
    if R: e[-R:] *= np.linspace(1, 0, R) ** 2
    return e
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)

# Progression : Fmaj9 – Am9 – Dm9 – Bbmaj7(#11)  (chaude, élégante)
chords = [[53, 57, 60, 64, 67], [57, 60, 64, 67, 71], [50, 53, 57, 60, 64], [46, 50, 53, 57, 64]]
basses = [41, 45, 38, 46]

pad = np.zeros(N); bass = np.zeros(N); keys = np.zeros(N)
nbar = int(np.ceil(dur / bar)) + 1
for b in range(nbar):
    c = chords[b % 4]; s = int(b * bar * SR); L = int(bar * SR * 1.15)
    if s >= N: break
    L = min(L, N - s); tt = np.arange(L) / SR
    e = env(L, 0.9, 0.9)
    for m in c:
        f = note(m)
        # nappe : sinus désaccordés + léger saw filtré
        v = sum(np.sin(2 * np.pi * f * (1 + d) * tt + rng.uniform(0, 6)) for d in (-0.004, 0, 0.0045))
        saw = 2 * ((f * 1.002 * tt) % 1) - 1
        pad[s:s + L] += (v * 0.22 + lp(saw, 1400) * 0.12) * e
    fb = note(basses[b % 4])
    eb = env(L, 0.05, 0.6) * np.exp(-tt * 0.35)
    bass[s:s + L] += (np.sin(2 * np.pi * fb * tt) + 0.25 * np.sin(4 * np.pi * fb * tt)) * eb
    # notes de piano électrique (arpège doux)
    for k, m in enumerate([c[2] + 12, c[3] + 12, c[4] + 12, c[3] + 12]):
        ks = s + int(k * beat * SR); KL = min(int(beat * 2.5 * SR), N - ks)
        if KL <= 0: continue
        kt = np.arange(KL) / SR; f = note(m)
        tone = np.sin(2 * np.pi * f * kt + 0.6 * np.sin(2 * np.pi * f * 2 * kt) * np.exp(-kt * 6))
        keys[ks:ks + KL] += tone * np.exp(-kt * 2.2) * 0.35

# rythme feutré : kick doux, hi-hat léger, à partir de la 2e mesure
drums = np.zeros(N)
nb = int(dur / beat) + 2
for i in range(nb):
    s = int(i * beat * SR)
    if s >= N or i < 4: continue
    if i % 2 == 0:  # kick sur 1 et 3
        L = min(int(0.35 * SR), N - s); kt = np.arange(L) / SR
        f = 50 + 70 * np.exp(-kt * 30)
        drums[s:s + L] += np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-kt * 9) * 0.9
    for h in (0, 0.5):  # hi-hat sur les croches
        hs = s + int(h * beat * SR); L = min(int(0.06 * SR), N - hs)
        if L <= 0: continue
        nz = hp(rng.standard_normal(L), 8000) * np.exp(-np.arange(L) / SR * 60)
        drums[hs:hs + L] += nz * (0.10 if h else 0.07)
    if i % 4 == 2:  # claquement doux sur le 2e temps fort
        L = min(int(0.25 * SR), N - s); nz = lp(hp(rng.standard_normal(L), 900), 5000)
        drums[s:s + L] += nz * np.exp(-np.arange(L) / SR * 18) * 0.18

pad = lp(pad, 3200) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.08 * t))
mix = pad * 0.55 + lp(bass, 400) * 0.55 + keys * 0.30 + drums * 0.50

# réverbération (réponse impulsionnelle synthétique)
ir_len = int(2.4 * SR); it = np.arange(ir_len) / SR
ir = rng.standard_normal(ir_len) * np.exp(-it * 2.6); ir = lp(ir, 6000); ir /= np.abs(ir).sum() / 8
wet = fftconvolve(mix, ir)[:N]
mix = mix * 0.75 + wet * 0.35

# stéréo légère, fondus, normalisation
L_ = mix + 0.15 * np.roll(wet, 350); R_ = mix + 0.15 * np.roll(wet, 620)
st = np.stack([L_, R_], 1)[: int(dur * SR)]
n = len(st); fi = int(1.2 * SR); fo = int(2.0 * SR)
st[:fi] *= np.linspace(0, 1, fi)[:, None]; st[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
st = np.tanh(st / np.abs(st).max() * 1.4) * 0.8
w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close()
print('ok', out, round(n / SR, 2))
