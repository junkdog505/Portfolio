<script setup lang="ts">
import { Download, ArrowRight } from '@lucide/vue';
import TerminalHero from './TerminalHero.vue';
</script>

<template>
  <section class="relative w-full min-h-[700px] flex items-center py-16 lg:py-0 lg:h-screen">
    <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
      <div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 mt-8 lg:mt-0">
        <div class="space-y-2">
          <p class="text-red-600 dark:text-red-500 text-sm uppercase tracking-[0.2em] font-bold font-sans">Desarrollador Full Stack</p>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            Desarrollador <br /><span class="text-red-600 dark:text-red-500">Full Stack.</span>
          </h1>
        </div>
        <p class="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-lg font-light leading-relaxed">
          Diseño arquitecturas robustas y experiencias fluidas. Apasionado por el ecosistema de Vue.js y el desarrollo de interfaces modernas.
        </p>
        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <a href="/CV-Edison-Cristian-Amezquita-Soto.pdf" download class="w-full sm:w-auto inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-red-800 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-center">
            <Download :size="16" stroke-width="1.5" />
            Descargar CV
          </a>
          <a href="#contact" class="w-full sm:w-auto inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-sm text-center">
            Contáctame
            <ArrowRight :size="16" stroke-width="1.5" />
          </a>
        </div>
      </div>
      <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div class="w-full max-w-[500px] lg:max-w-[600px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_0_60px_rgba(153,27,27,0.10)] transition-all duration-700">
          <TerminalHero
            username="junkdog"
            hostname="war-machine"
            name="Cristian Amezquita"
            country="Perú"
            stack="Vue, TypeScript, Express, Node.js"
          />
        </div>
      </div>
    </div>
  </section>
</template>
