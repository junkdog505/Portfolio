<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface EduItem {
  periodo: string;
  titulo: string;
  institucion: string;
  ubicacion: string;
  descripcion: string;
  habilidades: string[];
  enCurso: boolean;
}

const items = ref<EduItem[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('/datos.json');
    if (res.ok) {
      const data = await res.json();
      items.value = data.formacion ?? [];
    }
  } catch (e) {
    console.error('Error cargando formación:', e);
  }
});
</script>

<template>
  <section id="education" class="py-12 space-y-6 lg:pr-14">
    <h2 class="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-[0.15em] uppercase font-sans">Formación</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(edu, index) in items" :key="index"
        class="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-400 dark:hover:border-red-800 hover:shadow-sm p-6 space-y-5">
        <div class="flex justify-between items-start gap-3">
          <div class="space-y-1">
            <p class="text-red-600 dark:text-red-500 font-mono text-xs font-bold tracking-[0.1em] uppercase">{{ edu.periodo }}</p>
            <h3 class="text-lg font-bold text-stone-900 dark:text-stone-200 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors leading-tight">{{ edu.titulo }}</h3>
          </div>
          <span class="flex-shrink-0 px-2 py-0.5 rounded text-[9px] uppercase tracking-tight font-bold font-sans border"
            :class="edu.enCurso
              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400'
              : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400'">
            {{ edu.enCurso ? 'En Curso' : 'Graduado' }}
          </span>
        </div>

        <div class="space-y-2">
          <span class="font-bold text-sm text-stone-800 dark:text-stone-200">{{ edu.institucion }}</span>
          <span class="block text-xs text-stone-500 dark:text-stone-400 font-medium">{{ edu.ubicacion }}</span>
        </div>

        <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">{{ edu.descripcion }}</p>

        <div class="flex flex-wrap gap-1.5 pt-1">
          <span v-for="skill in edu.habilidades" :key="skill"
            class="px-2.5 py-0.5 bg-stone-50 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-[10px] text-red-600 dark:text-red-500 font-mono group-hover:border-red-300 dark:group-hover:border-red-800 transition-colors">
            #{{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
