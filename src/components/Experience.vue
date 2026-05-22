<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface ExpItem {
  periodo: string;
  cargo: string;
  empresa: string;
  enlaceEmpresa: string;
  descripcion: string;
  tecnologias: string[];
}

const items = ref<ExpItem[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('/datos.json');
    if (res.ok) {
      const data = await res.json();
      items.value = data.experiencia ?? [];
    }
  } catch (e) {
    console.error('Error cargando experiencia:', e);
  }
});
</script>

<template>
  <section id="experience" class="py-12 space-y-8 lg:pr-14">
    <h2 class="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-[0.15em] uppercase font-sans">Experiencia</h2>

    <div class="space-y-10">
      <div v-for="(trabajo, index) in items" :key="index" class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <span class="text-red-600 dark:text-red-500 font-mono text-sm font-bold tracking-tight">[{{ trabajo.periodo }}]</span>
          <h3 class="text-xl font-bold text-stone-900 dark:text-stone-200 leading-tight">{{ trabajo.cargo }}</h3>
        </div>

        <a v-if="trabajo.enlaceEmpresa" :href="trabajo.enlaceEmpresa" target="_blank" rel="noopener noreferrer"
          class="font-bold text-sm text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 transition-colors no-underline inline-block">
          {{ trabajo.empresa }} &nearr;
        </a>
        <span v-else class="font-bold text-sm text-stone-600 dark:text-stone-300">{{ trabajo.empresa }}</span>

        <div class="relative bg-stone-50 dark:bg-stone-900/50 border-l-2 border-red-700 dark:border-red-800 p-4 rounded-r-lg">
          <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">{{ trabajo.descripcion }}</p>
        </div>

        <div class="flex flex-wrap gap-2 pt-1">
          <span class="text-xs font-mono text-stone-500 dark:text-stone-400">tecnologías:</span>
          <span v-for="tech in trabajo.tecnologias" :key="tech"
            class="px-2 py-0.5 bg-stone-50 dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
            --{{ tech.toLowerCase().replace(/\s+/g, '_') }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
