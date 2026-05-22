<script setup lang="ts">
export interface TerminalHeroProps {
  username?: string;
  hostname?: string;
  avatarUrl?: string;
  os?: string;
  name?: string;
  country?: string;
  age?: string | number;
  university?: string;
  stack?: string;
}

withDefaults(defineProps<TerminalHeroProps>(), {
  username: 'junkdog',
  hostname: 'war-machine',
  avatarUrl: '/tux_neofetch.png',
  os: 'Linux x86_64',
  name: "Cristian Amezquita",
  country: 'Perú',
  age: 25,
  university: 'Universidad Católica de Santa María',
  stack: 'Vue.js, TypeScript'
});
</script>

<template>
  <div>
    <svg viewBox="180 120 640 448" preserveAspectRatio="xMidYMid meet">
      <g>
        <rect x="220" y="120" width="560" height="360" rx="6" fill="var(--laptop-body)" stroke="var(--laptop-chasis-stroke)" stroke-width="2" />
        <rect x="420" y="475" width="160" height="10" rx="2" fill="var(--laptop-grad-start)" />

        <path d="M 220 480 L 780 480 L 820 560 L 180 560 Z" fill="var(--laptop-grad-start)" />
        <path d="M 180 560 L 820 560 L 820 568 L 180 568 Z" fill="var(--laptop-base-bottom)" />

        <path d="M 240 490 L 760 490 L 780 540 L 220 540 Z" fill="var(--laptop-keyboard)" stroke="var(--laptop-keyboard-stroke)" stroke-width="1" />

        <circle cx="500" cy="525" r="4.5" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1" />

        <rect x="450" y="545" width="100" height="10" rx="1.5" fill="var(--laptop-touchpad)" stroke="var(--laptop-touchpad-line)" stroke-width="1" />
        <line x1="450" y1="545" x2="550" y2="545" stroke="#b91c1c" stroke-width="1.5" />
        <line x1="480" y1="545" x2="480" y2="555" stroke="var(--laptop-touchpad-line)" stroke-width="1" />
        <line x1="520" y1="545" x2="520" y2="555" stroke="var(--laptop-touchpad-line)" stroke-width="1" />

        <rect x="235" y="135" width="530" height="330" rx="3" fill="var(--laptop-screen-bg)" />

        <rect x="235" y="135" width="530" height="24" rx="3" fill="var(--laptop-topbar)" />
        <circle cx="250" cy="147" r="3.5" fill="#b91c1c" />
        <circle cx="263" cy="147" r="3.5" fill="#a16207" />
        <circle cx="276" cy="147" r="3.5" fill="#3b82f6" />
        <text x="500" y="151" fill="#a8a29e" font-size="10" font-family="'Fira Code', 'Source Code Pro', monospace" text-anchor="middle">
          {{ username }}@{{ hostname }}: ~
        </text>

        <foreignObject x="245" y="164" width="510" height="296">
          <div xmlns="http://www.w3.org/1999/xhtml" style="color: #fca5a5; font-family: 'Fira Code', 'Source Code Pro', monospace; font-size: 12px; line-height: 1.5;">
            <div style="margin-bottom: 14px;">
              <span class="terminal-line cmd-line">
                <span style="color: #ef4444;">{{ username }}</span>
                <span style="color: #a8a29e; margin: 0 4px;">@</span>
                <span style="color: #ef4444;">{{ hostname }}</span>
                <span style="color: #a8a29e; margin: 0 2px;">:</span>
                <span style="color: #d6d3d1;">~</span>
                <span style="color: #a8a29e; margin-left: 4px;">$ fastfetch</span>
              </span>
            </div>

            <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
              <div class="fade-avatar">
                <img :src="avatarUrl" alt="Avatar de perfil" style="width: 100px; height: 100px; border-radius: 6px; border: 2px solid #991b1b; object-fit: cover; box-shadow: 0 0 8px rgba(153, 27, 27, 0.25);" />
              </div>

              <div style="display: flex; flex-direction: column; color: #d6d3d1; width: 100%;">
                <div class="terminal-line line-1" style="padding-bottom: 3px; margin-bottom: 5px; border-bottom: 1px solid #44403c;">
                  <span style="color: #ef4444; font-weight: bold;">{{ username }}</span>
                  <span style="color: #d6d3d1; margin: 0 4px;">@</span>
                  <span style="color: #ef4444; font-weight: bold;">{{ hostname }}</span>
                </div>
                <div class="terminal-line line-2"><span style="color: #fca5a5; font-weight: bold;">OS</span>:      {{ os }}</div>
                <div class="terminal-line line-3"><span style="color: #fca5a5; font-weight: bold;">Nombre</span>:  {{ name }}</div>
                <div class="terminal-line line-4"><span style="color: #fca5a5; font-weight: bold;">País</span>:    {{ country }}</div>
                <div class="terminal-line line-5"><span style="color: #fca5a5; font-weight: bold;">Edad</span>:    {{ age }}</div>
                <div class="terminal-line line-6"><span style="color: #fca5a5; font-weight: bold;">Universidad</span>:    {{ university }}</div>
                <div class="terminal-line line-7"><span style="color: #fca5a5; font-weight: bold;">Stack</span>:   {{ stack }}</div>
              </div>
            </div>

            <div class="prompt-line" style="margin-top: 14px;">
              <span style="color: #ef4444;">{{ username }}</span>
              <span style="color: #a8a29e; margin: 0 4px;">@</span>
              <span style="color: #ef4444;">{{ hostname }}</span>
              <span style="color: #a8a29e; margin: 0 2px;">:</span>
              <span style="color: #d6d3d1;">~</span>
              <span style="color: #a8a29e; margin-left: 4px;">$</span> <span class="blink">_</span>
            </div>
          </div>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.terminal-line { opacity: 0; }
.cmd-line { animation: reveal 0.1s step-end forwards; }
.fade-avatar { animation: reveal 0.1s step-end forwards 0.4s; opacity: 0; }
.line-1 { animation: reveal 0.1s step-end forwards 0.7s; }
.line-2 { animation: reveal 0.1s step-end forwards 0.9s; }
.line-3 { animation: reveal 0.1s step-end forwards 1.1s; }
.line-4 { animation: reveal 0.1s step-end forwards 1.3s; }
.line-5 { animation: reveal 0.1s step-end forwards 1.5s; }
.line-6 { animation: reveal 0.1s step-end forwards 1.7s; }
.line-7 { animation: reveal 0.1s step-end forwards 1.9s; }
.prompt-line { animation: reveal 0.1s step-end forwards 2.3s; opacity: 0; }
@keyframes reveal { to { opacity: 1; } }
.blink { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</style>
