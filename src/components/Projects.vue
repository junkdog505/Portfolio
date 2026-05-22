<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GitFork, Lock } from '@lucide/vue';

interface Proyecto {
  titulo: string;
  descripcion: string;
  imagenDestacada: string;
  linkProyecto: string;
  estado: number;
  tecnologias?: string[];
  galeria: string[];
}

interface ProyectosData {
  fullStack: Proyecto[];
  disenoWeb: Proyecto[];
  pluginsWordpress: Proyecto[];
}

const proyectosData = ref<ProyectosData | null>(null);
const cargando = ref(true);
const modalAbierto = ref(false);
const proyectoSeleccionado = ref<Proyecto | null>(null);
const imagenZoom = ref<string | null>(null);

const catKeys: (keyof ProyectosData)[] = ['fullStack', 'disenoWeb', 'pluginsWordpress'];
const catLabels: Record<keyof ProyectosData, string> = {
  fullStack: 'Full Stack',
  disenoWeb: 'Diseño Web',
  pluginsWordpress: 'Plugins WordPress'
};

const getEstadoInfo = (estado: number) => {
  switch (estado) {
    case 0: return { label: 'En Desarrollo', clase: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400' };
    case 1: return { label: 'MVP', clase: 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 dark:border-amber-500 text-amber-600 dark:text-amber-400' };
    case 2: return { label: 'Completado', clase: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' };
    default: return { label: '', clase: 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400' };
  }
};

const imagenCard = (proyecto: Proyecto) => proyecto.imagenDestacada || proyecto.galeria?.[0] || '';

onMounted(async () => {
  try {
    const response = await fetch('/datos.json');
    if (response.ok) {
      const data = await response.json();
      proyectosData.value = data.proyectos ?? null;
    }
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  } finally {
    cargando.value = false;
  }
});

const abrirDetalle = (proyecto: Proyecto) => {
  proyectoSeleccionado.value = proyecto;
  modalAbierto.value = true;
  document.body.style.overflow = 'hidden';
};

const cerrarModal = () => {
  modalAbierto.value = false;
  proyectoSeleccionado.value = null;
  document.body.style.overflow = 'auto';
};

const abrirZoom = (src: string) => {
  imagenZoom.value = src;
};

const cerrarZoom = () => {
  imagenZoom.value = null;
};
</script>

<template>
  <section id="proyectos" class="py-16 space-y-16 lg:pr-14">
    <h2 class="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-[0.15em] uppercase font-sans">Proyectos</h2>

    <div v-if="cargando" class="flex justify-center py-20">
      <div class="w-10 h-10 border-2 border-red-200 dark:border-red-900 border-t-red-700 dark:border-t-red-500 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="proyectosData" class="space-y-20">
      <div v-for="key in catKeys" :key="key" v-show="proyectosData[key]?.length" class="space-y-8">
        <div class="flex items-center gap-4">
          <h3 class="text-red-600 dark:text-red-500 text-sm uppercase tracking-tight font-bold font-sans">
            // {{ catLabels[key] }}
          </h3>
          <div class="h-px flex-1 bg-stone-200 dark:bg-stone-800"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(proyecto, index) in proyectosData[key]" :key="index" @click="abrirDetalle(proyecto)"
            class="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-400 dark:hover:border-red-800 hover:shadow-sm cursor-pointer flex flex-col">
            <div class="relative h-48 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img v-if="imagenCard(proyecto)" :src="imagenCard(proyecto)" :alt="proyecto.titulo"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div v-if="!imagenCard(proyecto)" class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-100 dark:bg-stone-800">
                <span class="text-[10px] uppercase tracking-[0.15em] font-bold font-sans"
                  :class="proyecto.estado === 0 ? 'text-red-600 dark:text-red-400' : proyecto.estado === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'">
                  {{ getEstadoInfo(proyecto.estado).label }}
                </span>
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div class="space-y-2.5">
                <div class="flex justify-between items-start gap-2">
                  <h4 class="text-lg font-bold text-stone-900 dark:text-stone-200 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors font-sans">
                    {{ proyecto.titulo }}
                  </h4>
                  <span :class="['text-[8px] px-2 py-0.5 rounded border font-mono uppercase', getEstadoInfo(proyecto.estado).clase]">
                    {{ getEstadoInfo(proyecto.estado).label }}
                  </span>
                </div>
                <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-2 font-light">{{ proyecto.descripcion }}</p>
              </div>

              <div v-if="proyecto.tecnologias" class="flex flex-wrap gap-2 pt-4">
                <span v-for="tech in proyecto.tecnologias" :key="tech" class="text-[10px] font-mono text-stone-400 dark:text-stone-500 uppercase">#{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modalAbierto && proyectoSeleccionado" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md" @click.self="cerrarModal">
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div class="flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800">
              <div class="flex items-center gap-3">
                <span class="text-red-600 dark:text-red-500 font-mono text-xs font-bold uppercase tracking-[0.15em]">Detalles</span>
                <span :class="['text-[9px] px-2 py-0.5 rounded border font-mono uppercase', getEstadoInfo(proyectoSeleccionado.estado).clase]">
                  {{ getEstadoInfo(proyectoSeleccionado.estado).label }}
                </span>
              </div>
              <button @click="cerrarModal" class="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-all cursor-pointer text-xl font-bold">&times;</button>
            </div>

            <div class="overflow-y-auto p-6 lg:p-10 space-y-10">
              <div class="grid lg:grid-cols-2 gap-10">
                <div class="space-y-5">
                  <h3 class="text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-tight">{{ proyectoSeleccionado.titulo }}</h3>
                  <p class="text-stone-600 dark:text-stone-400 text-base leading-relaxed font-light">{{ proyectoSeleccionado.descripcion }}</p>
                  <div class="pt-3">
                    <a v-if="proyectoSeleccionado.linkProyecto" :href="proyectoSeleccionado.linkProyecto" target="_blank" rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-7 py-3 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition-all active:scale-95 shadow-md text-sm no-underline">
                      <GitFork :size="17" stroke-width="1.5" />
                      Ver en GitHub
                    </a>
                    <span v-else class="inline-flex items-center gap-2 px-7 py-3 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 font-semibold rounded-lg text-sm">
                      <Lock :size="15" stroke-width="1.5" />
                      Proyecto privado
                    </span>
                  </div>
                </div>

                <div v-if="proyectoSeleccionado.tecnologias" class="space-y-3">
                  <h5 class="text-red-600 dark:text-red-500 text-xs uppercase tracking-[0.1em] font-bold font-sans">Stack Técnico</h5>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in proyectoSeleccionado.tecnologias" :key="tech"
                      class="px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-600 dark:text-stone-300 font-mono">{{ tech }}</span>
                  </div>
                </div>
              </div>

              <div v-if="proyectoSeleccionado.galeria.length > 0" class="space-y-4">
                <h5 class="text-red-600 dark:text-red-500 text-xs uppercase tracking-[0.1em] font-bold font-sans">Galería</h5>
                <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth">
                  <div v-for="(img, i) in proyectoSeleccionado.galeria" :key="i" @click.stop="abrirZoom(img)"
                    class="flex-none w-[90%] sm:w-[80%] lg:w-[70%] snap-center rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 aspect-video bg-stone-100 dark:bg-stone-800 shadow-sm cursor-zoom-in group/img hover:border-red-400 dark:hover:border-red-800 transition-colors">
                    <img :src="img" :alt="'Captura ' + (i + 1) + ' del proyecto ' + proyectoSeleccionado.titulo" class="w-full h-full object-cover select-none transition-transform duration-300 group-hover/img:scale-105" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="imagenZoom" class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 bg-black/90 backdrop-blur-sm cursor-zoom-out" @click="cerrarZoom">
          <button @click="cerrarZoom" class="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-2xl font-bold">&times;</button>
          <img :src="imagenZoom" alt="Vista ampliada" class="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl" />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
