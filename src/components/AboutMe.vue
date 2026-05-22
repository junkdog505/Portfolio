<script setup lang="ts">
import { ExternalLink } from '@lucide/vue';

interface Props {
  profileImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  profileImage: 'profile.jpg',
});

const softSkills = [
  { title: 'Comunicación', text: 'Trabajo en constante comunicación con el cliente y el equipo para comprender sus necesidades como también tengo facilidad para comunicarme con personas no técnicas.' },
  { title: 'Resolución de problemas', text: 'Me desempeño en resolver problemas complejos y proporcionar soluciones prácticas, escalables y fáciles de entender.' },
  { title: 'Trabajo en equipo', text: 'Tengo experiencia en trabajar en equipo, colaborando con diferentes roles y habilidades para lograr resultados exitosos.' },
  { title: 'Adaptabilidad', text: 'Me adapta a diferentes situaciones y entornos, permitiendo trabajar en diferentes proyectos y con diferentes equipos.' }
];
</script>

<template>
  <section id="about" class="py-16 space-y-14 lg:pr-14">
    <h2 class="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-[0.15em] uppercase font-sans">Sobre mí</h2>

    <div class="flex flex-col lg:flex-row gap-10 items-start">
      <div class="shrink-0 space-y-3">
        <img :src="props.profileImage" alt="Foto de perfil de Cristian Amezquita" class="w-40 h-40 sm:w-48 sm:h-48 rounded-lg object-cover" />
        <div>
          <p class="font-semibold text-stone-800 dark:text-stone-200 text-sm font-sans">@dev.amsot</p>
          <p class="text-xs text-stone-500 dark:text-stone-500 mt-0.5">Desarrollador Full Stack</p>
        </div>
      </div>

      <div class="flex-1 space-y-5 min-w-0">
        <div class="space-y-1.5">
          <p class="text-xs font-mono text-stone-400 dark:text-stone-500">root@amsot:~$ whoami</p>
          <h3 class="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
            Cristian <span class="text-red-600 dark:text-red-500">Am</span>ezquita <span class="text-red-600 dark:text-red-500">Sot</span>o
          </h3>
        </div>
        <p class="text-stone-600 dark:text-stone-400 text-base leading-relaxed">Soy un ingeniero de sistemas y desarrollador enfocado en transformar ideas en código ordenado, eficiente y capaz de resolver problemas reales. Mi forma de trabajar está muy influenciada por el mundo Linux y el software libre, lo que me lleva a buscar siempre el control, la seguridad y la optimización de los recursos en cada proyecto. En el desarrollo visual, me gusta construir interfaces modernas, fluidas y rápidas que se adapten a una lógica limpia y fácil de mantener. Además, combino el desarrollo de aplicaciones con una visión enfocada en la seguridad y la auditoría, asegurando que los datos sean confiables y que los sistemas sean estables a largo plazo.
        </p>
        <div class="flex gap-5 pt-1">
          <a href="https://github.com/junkdog505" target="_blank" rel="noopener noreferrer" title="GitHub" class="flex items-center gap-1.5 text-xs font-medium text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-500 transition-colors font-mono">
            <ExternalLink :size="14" stroke-width="1.5" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/edison-cristian-amezquita-soto/" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="flex items-center gap-1.5 text-xs font-medium text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-500 transition-colors font-mono">
            <ExternalLink :size="14" stroke-width="1.5" /> LinkedIn
          </a>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h4 class="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.15em] font-sans">Idiomas</h4>
      <div class="inline-flex flex-wrap items-center gap-6 p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-stone-800 dark:text-stone-200">Español</span>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">Nativo</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-stone-800 dark:text-stone-200">Inglés</span>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">Intermedio</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="skill in softSkills" :key="skill.title" class="space-y-2">
        <h4 class="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-[0.1em] font-sans">{{ skill.title }}</h4>
        <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{{ skill.text }}</p>
      </div>
    </div>
  </section>
</template>
